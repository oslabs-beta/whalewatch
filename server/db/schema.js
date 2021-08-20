import{
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
}from 'graphql';
import tables from './setup.sql';
console.log('this is tables', tables)

//graphqlobjecttype is function from graphql
const users =  new GraphQLObjectType({
  name: 'User',
  description: 'Users data in our app',
  fields: () => {
    return{
      id: {
        type: GraphQLInt,
        //resolve is what is invoked so graphql knows how to get data
        resolve(users){
          return users.id;
        }
      },
      username: {
        type: GraphQLString,
        resolve(users){
          return users.username;
        }
      },
      email: {
        type: GraphQLString,
        resolve(users){
          return users.email;
        }
      },
      password: {
        type: GraphQLString,
        resolve(users){
          return users.password;
        }
      }
    }
  }
})


