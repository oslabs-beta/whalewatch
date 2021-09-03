// import{
//   GraphQLID, // more flexible to use for IDs than strings
//   GraphQLSchema, // needed to export our schema
// }from 'graphql';
const pool = require('./connect.js');
const bcrypt = require('bcrypt');
const graphql = require('graphql');
const dbHelper = require('../helpers/dbHelper');

const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID, // more flexible to use for IDs than strings
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat,
  GraphQLScalarType,
  Kind
  // needed to export our schema  
} = graphql;
const jwt = require('jsonwebtoken')

//graphqlobjecttype is function from graphql
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Users data in our app',
  fields: () => ({
    id: {
      type: GraphQLInt,//resolve is what is invoked so graphql knows how to get data 
    },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    //token: {type: GraphQLString},
    containerName: {
      type: new GraphQLList(ContainerType),
      resolve: async (parent) => {
        const vals = [parent.id];
        const query = `SELECT * from containers WHERE owner=$1`;
        //return containerData.filter(container => container.user_id  === parent.id);
        const res = await pool.query(query, vals);
        return res.rows;
      }
    },
  })
})

//query for containers 
const ContainerType = new GraphQLObjectType({
  name: 'Containers',
  description: 'Our containers',
  fields: () => ({
    id: { type: GraphQLInt },
    dockerid: { type: GraphQLString },
    name: { type: GraphQLString },
    size: { type: GraphQLInt },
    status: { type: GraphQLString },
    stats: {
      type: new GraphQLList(StatsType),
      resolve: async (parent) => {
        const vals = [parent.id];
        const query = `SELECT * from stats WHERE container=$1`;
        //return containerData.filter(container => container.user_id  === parent.id);
        const res = await pool.query(query, vals);
        return res.rows;
      }
    }
  })
})

const StatsType = new GraphQLObjectType({
  name: 'Stats',
  description: 'Stats data',
  fields: () => ({
    id: { type: GraphQLID },
    container: { type: GraphQLID },
    timestamp: { type: GraphQLFloat }, // dates and times have to be defined as custom scalars like Date or timestamp - might need to npm install --save graphql-scalars
    cpuusage: { type: GraphQLFloat },
    memusage: { type: GraphQLFloat },
    netio: { type: GraphQLString },
    blockio: { type: GraphQLString },
    pids: { type: GraphQLInt },
    reqpermin: { type: GraphQLInt },
  })
})

// root query: how we initially jump into graph
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root Query',
  fields: () => ({
    user: {
      type: new GraphQLList(UserType),
      //if this were a database, return database here
      resolve: async () => {
        const res = await pool.query(`SELECT * from "users"`);
        return res.rows;
      },
    },
    oneUser: {
      type: UserType,
      description: 'A single user',
      args: {
        id: { type: GraphQLInt }
      },
      //resolve: (parent, args) => usersData.find(oneUser => oneUser.id === args.id)

      resolve: async (parent, args) => {
        const vals = [args.id]
        const query = `SELECT * from "users" WHERE id = $1`
        const res = await pool.query(query, vals);
        return res.rows[0];
      },
    },
    container: {
      type: new GraphQLList(ContainerType),
      description: 'List of all our containers',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: async (parent, args) => {
        await dbHelper.refreshContainerData(args.id);
        const res = await pool.query(`SELECT * from "containers" WHERE owner = $1`, [args.id]);
        return res.rows;

      }
    },
    oneContainer: {
      type: ContainerType,
      description: 'a single container',
      args: {
        container_id: { type: GraphQLInt }
      },
      resolve: async (parent, args) => {
        const vals = [args.id]
        const query = `SELECT * from "containers" WHERE id = $1`
        const res = await pool.query(query, vals);
        return res.rows[0];
      }
    },
    stat: {
      type: new GraphQLList(StatsType),
      description: 'Stats on a container',
      resolve: async () => {
        const res = await pool.query(`SELECT * from "stats"`);
        return res.rows;
      }
    }
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Manipulation of user data',
  fields: () => ({
    addUser: {
      type: UserType,
      description: 'Add a user',
      args: {
        id: { type: GraphQLInt },//resolve is what is invoked so graphql knows how to get data 
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        // containerName: {
        //   type: new GraphQLList(ContainerType),
        //   resolve: async (parent) => {
        //     const vals = [parent.id];
        //     const query = `SELECT * from containers WHERE owner=$1`;
        //     //return containerData.filter(container => container.user_id  === parent.id);
        //     const res = await pool.query(query,vals);
        //     return res.rows;
        //   
        // },
      },
      resolve: async (parent, args) => {
        console.log('this is parent', parent)
        const password = await bcrypt.hash(args.password, 10);
        const user = [args.username, args.email, password]
        const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)'
        const res = await pool.query(query, user);
        console.log('this is response to adding a user', res);
        console.log('this is createuser args', args)
        return res.rows[0];
        //return res.rows;
      }
    },
    validateUser: {
      type: UserType,
      description: 'Make sure username + pw match',
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args, {req,res}) => {

        const username = [args.username]
        const query = `SELECT password from users WHERE username = $1`;
        const result = await pool.query(query, username)
        // console.log('this is user password', result.rows[0].password)
        const comparingPassword = await bcrypt.compare(args.password, result.rows[0].password);
        if (comparingPassword === true) {
          const finalResult = await pool.query(`SELECT * from users where username = $1`, username);

          const accessToken = jwt.sign({userId: finalResult.rows[0].id}, 'Dockerpalsarecuties', {expiresIn: '15min'});
          const refreshToken = jwt.sign({userId: finalResult.rows[0].id}, 'Dockerpalsarecuties', {expiresIn: '7d'});

          const refresh = res.cookie('refresh-token', refreshToken, {expire: 60*60*27*7})
          const access = res.cookie('access-token', accessToken, {expire: 60*15})

          console.log('this is access token', accessToken)

          return finalResult.rows[0];
          return accessToken;
          
        }
      }
    },
    addStat: {
      type: StatsType,
      description: 'Adding dummy stats to database',
      args: {
        id: { type: GraphQLID },
        container: { type: GraphQLInt },
        timestamp: { type: GraphQLFloat }, // dates and times have to be defined as custom scalars like Date or timestamp - might need to npm install --save graphql-scalars
        cpuusage: { type: GraphQLFloat },
        memusage: { type: GraphQLFloat },
        netio: { type: GraphQLString },
        blockio: { type: GraphQLString },
        pids: { type: GraphQLInt },
        reqpermin: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        // args.container, args.timestamp, args.cpuusage, args.memusage, args.netio, args.blockio, args.pids, args.reqpermin
        const statEntry = [args.container, args.timestamp, args.cpuusage, args.memusage, args.netio, args.blockio, args.pids, args.reqpermin]
        const query = 'INSERT INTO stats (container, timestamp, cpuusage, memusage, netio, blockio, pids, reqpermin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
        const res = await pool.query(query, statEntry);
        console.log('this is response to adding a stat', res[0]);
        return res.rows[0];
      }
    }
  })


});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

// export schema
module.exports = schema;
















/*
  Phil Notes - schema file: define types, define relationships between types, and define root query: define how user can jump into graph and grab dat
// dummy data to test schema
// let usersData = [
//   {id: 1, username: 'phil', email: 'phil@email.com', password: 'pass1'},
//   {id: 2, username: 'joe', email: 'joe@email.com', password: 'pass2'},
//   {id: 3, username: 'steve', email: 'steve@email.com', password: 'pass3'}
// ]

// // dummy data for stats
// const statsData = [
//   // { stats_id: 1, container_id: 1, timestamp: 20210823, cpu_usage: 100, memory_usuage: 100, net_io: 100, block_io: 20, p_id: 15, req_per_min: 50},
//   // { stats_id: 2, container_id: 2, timestamp: 20210823, cpu_usage: 50, mem_usage: 50, net_io: 50, block_io: 10, p_id: 10, req_per_min: 50},
//   // { stats_id: 3, container_id: 3, timestamp: 20210823, cpu_usage: 25, mem_usage: 25, net_io: 25, block_io: 5, p_id: 5, req_per_min: 50},
//   { id: 1, container_id: 1, cpu_usage: 100, mem_usage: 100, net_io: 100, block_io: 20, p_id: 15, req_per_min: 50},
//   { id: 2, container_id: 2, cpu_usage: 50, mem_usage: 50, net_io: 50, block_io: 10, p_id: 10, req_per_min: 50},
//   { id: 3, container_id: 3, cpu_usage: 25, mem_usage: 25, net_io: 25, block_io: 5, p_id: 5, req_per_min: 50},
// ]

// const containerData = [
//   {id: 1, dockerID: 1, name: 'hello', size: 455, status: 'Good', user_id: 1},
//   {id: 2, dockerID: 2, name: 'hey', size: 55, status: 'Ight', user_id: 2},
//   {id: 3, dockerID: 3, name: 'ello', size: 45, status: 'Bad', user_id: 3}
// ]
*/

