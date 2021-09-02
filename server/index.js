const express = require('express');
const path = require('path');
const app = express();
const {graphqlHTTP} = require('express-graphql');
const PORT = 3000;
const schema = require('./db/schema.js');
const expressJwt = require('express-jwt');
const {ApolloServer,gql} = require('apollo-server-express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


//need cors to connect our front end + back
app.use(express.json());
app.use(express.static('build'));
app.use(cookieParser());
// const authMiddleware = expressJwt({
//   secret: "Dockerpalsarecuties",
//   algorithms: ['HS256'],
//   credentialsRequired: false
// })

//app.use(authMiddleware);

// const context = async(req) =>{
//   const{authorization: token} = req.headers;
//   return {token}
// }
//use our graphql middleware. only to one endpoint
app.use('/graphql', (req,res) => {
  return graphqlHTTP({
  schema,
  context: {req,res},
  graphiql:true
})(req,res)}
)

//allow access to our index.html folder
app.use('/', express.static(path.join(__dirname, '../client')));

//serve the index file 
if (process.env.NODE_ENV === 'production') {
  //allow access to our index.html folder
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log('This is __dirname', __dirname)
})

module.exports = app;