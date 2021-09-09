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
        await dbHelper.refreshContainerData(parent.id);
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
    size: { type: GraphQLString },
    status: { type: GraphQLString },
    state: { type: GraphQLString },
    stats: {
      type: new GraphQLList(StatsType),
      resolve: async (parent) => {
        const vals = [parent.id];
        const query = `SELECT * from stats WHERE container=$1`;
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

      },
      resolve: async (parent, args) => {
        const password = await bcrypt.hash(args.password, 10);
        const user = [args.username, args.email, password]
        const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *'
        const res = await pool.query(query, user);
        return res.rows[0];
      }
    },
    validateUser: {
      type: UserType,
      description: 'Make sure username + pw match',
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args, { req, res }) => {

        const username = [args.username]
        const query = `SELECT password from users WHERE username = $1`;
        const result = await pool.query(query, username)
        const comparingPassword = await bcrypt.compare(args.password, result.rows[0].password);
        if (comparingPassword === true) {
          const finalResult = await pool.query(`SELECT * from users where username = $1`, username);
          const accessToken = jwt.sign({ userId: finalResult.rows[0].id }, 'Dockerpalsarecuties', { expiresIn: '15min' });
          const refreshToken = jwt.sign({ userId: finalResult.rows[0].id }, 'Dockerpalsarecuties', { expiresIn: '7d' });
          const refresh = res.cookie('refresh-token', refreshToken, { expire: 60 * 60 * 27 * 7 })
          const access = res.cookie('access-token', accessToken, { expire: 60 * 15 })
          return finalResult.rows[0];

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
        return res.rows[0];
      }
    },
    stopContainer: {
      type: ContainerType,
      description: 'Stop a container',
      args: {
        id: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        dbHelper.stopContainer(args.id);
        return args.id;
      }
    },
    restartContainer: {
      type: ContainerType,
      description: 'Restart a container',
      args: {
        id: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        await dbHelper.restartContainer(args.id);
        return args.id;
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



