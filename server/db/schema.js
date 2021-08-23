// phil note: do we need to require graphql?
// import{
//   GraphQLID, // more flexible to use for IDs than strings
//   GraphQLSchema, // needed to export our schema
// }from 'graphql';

const graphql = require('graphql')
const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID, // more flexible to use for IDs than strings
  GraphQLSchema,
  GraphQLList
   // needed to export our schema  
} = graphql;

// dummy data to test schema
let usersData = [
  {id: '1', username: 'phil', email: 'phil@email.com', password: 'pass1'},
  {id: '2', username: 'joe', email: 'joe@email.com', password: 'pass2'},
  {id: '3', username: 'steve', email: 'steve@email.com', password: 'pass3'}
]

// dummy data for stats
const stats = [
  // { stats_id: 1, container_id: 1, timestamp: 20210823, cpu_usage: 100, memory_usuage: 100, net_io: 100, block_io: 20, p_id: 15, req_per_min: 50},
  // { stats_id: 2, container_id: 2, timestamp: 20210823, cpu_usage: 50, mem_usage: 50, net_io: 50, block_io: 10, p_id: 10, req_per_min: 50},
  // { stats_id: 3, container_id: 3, timestamp: 20210823, cpu_usage: 25, mem_usage: 25, net_io: 25, block_io: 5, p_id: 5, req_per_min: 50},
  { stats_id: 1, container_id: 1, cpu_usage: 100, mem_usage: 100, net_io: 100, block_io: 20, p_id: 15, req_per_min: 50},
  { stats_id: 2, container_id: 2, cpu_usage: 50, mem_usage: 50, net_io: 50, block_io: 10, p_id: 10, req_per_min: 50},
  { stats_id: 3, container_id: 3, cpu_usage: 25, mem_usage: 25, net_io: 25, block_io: 5, p_id: 5, req_per_min: 50},  
]

//graphqlobjecttype is function from graphql
const UserType =  new GraphQLObjectType({
  name: 'User',
  description: 'Users data in our app',
    fields: () => ({
      id: {
        type: GraphQLInt,
        //resolve is what is invoked so graphql knows how to get data
      },
      username: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      password: {
        type: GraphQLString,
      }
    })
})
const containerData = [
  {container_id: 1, dockerID: 1, name: 'hello', size: 455, status: 'Good', user_id: 1},
  {container_id: 2, dockerID: 2, name: 'hey', size: 55, status: 'Ight', user_id: 2},
  {container_id: 3, dockerID: 3, name: 'ello', size: 45, status: 'Bad', user_id: 3}
]
//query for containers 
const ContainerType = new GraphQLObjectType({
  name: 'Containers',
  description: 'Our containers',
  fields: () => ({
    id: {type: GraphQLInt},
    dockerID: {type: GraphQLInt},
    name: {type: GraphQLString},
    size: {type: GraphQLInt},
    status: {type: GraphQLString},
    containerUser: {
      type: new GraphQLList(UserType),
      resolve: (container) => {
        console.log(container);
        // console.log(parent.user_id) // this should be equal to user_id
        return usersData.filter( user => user.id  === container.user_id)
      }
    }
  })
})

// const StatsType = new GraphQLObjectType ({
//   name: 'Stats',
//   desription: 'Stats data',
//   fields: () => ({
//     stats_id: { type: graphQLID},
//     container_id: { type: graphQLID},
//     // timestamp: { type: }, // dates and times have to be defined as custom scalars like Date or timestamp - might need to npm install --save graphql-scalars
//     cpu_usage: { type: graphQLInt },
//     mem_usage: { type: graphQLInt },
//     net_io: { type: graphQLInt },
//     block_io: { type: graphQLInt },
//     p_id: { type: graphQLInt },
//     req_per_min: { type: graphQLInt },
//     container: {
//       type: ContainerType,
//       resolve: (parent, args) =>  {
//         console.log(parent)
//         console.log(args)
//         return containerData.find(container_id => container_id === parent.container_id)
//       }
//     }
//   })
// })

// root query: how we initially jump into graph
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root Query',
  fields: () => ({
    user: {
      type: new GraphQLList(UserType),
      // args: { id: {type: GraphQLID} },u
      // resolve(parent, args) {
      //   // code to get data from db / other source
      //   return usersData.find(user => user.id === args.id)
      // }
      //if this were a database, return database here
      resolve: () => usersData
    },
    oneUser: {
      type: UserType,
      description: 'A single user',
      args: {
        id: {type: GraphQLID}
      },
      resolve: (parent, args) => usersData.find(oneUser => oneUser.id === args.id)
    },
    container: {
      type: new GraphQLList(ContainerType),
      description: 'List of all our containers',
      resolve: () => containerData
    },
    oneContainer: {
      type: ContainerType,
      description: 'a single container',
      args: {
        id: {type: GraphQLID}
      },
      resolve: (parent, args) => containerData.find(container => container.id === args.id)
    }
    // stat: {
    //   type: StatsType,
    //   description: 'Stats on a container',
    //   args: {container_id: {type: GraphQLID}},
    //   resolve: (parent, args) => {
    //     return containerData.find(stat => stat.id === args.id)
    //   } 
    // }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType
})

// export schema
module.exports = schema;

/*
  Phil Notes - schema file: define types, define relationships between types, and define root query: define how user can jump into graph and grab data
  
  stats query
  CREATE TABLE IF NOT EXISTS stats (
  id SERIAL PRIMARY KEY,
  container integer REFERENCES containers(id) NOT NULL,
  timestamp date NOT NULL,
  cpuUsage integer NOT NULL,
  memUsage integer NOT NULL,
  netIo varchar(50) NOT NULL
  blockIo varchar(50) NOT NULL,
  pids integer NOT NULL,
  reqPerMin integer
)

    const stats = [
      { statid: 1, containerid: 1, timestamp: 20210823, cpu_usage: 100, memory_usuage: 100, net_io: 100, block_io: 20, p_ids: 15, req_per_min: 50}.
      { statid: 2, containerid: 2, timestamp: 20210823, cpu_usage: 50, memory_usuage: 50, net_io: 50, block_io: 10, p_ids: 10, req_per_min: 50},
      { statid: 3, containerid: 3, timestamp: 20210823, cpu_usage: 25, memory_usuage: 25, net_io: 25, block_io: 5, p_ids: 5, req_per_min: 50},
    ]

*/

