import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
//Should I import electron?
const client = new ApolloClient({
  uri: 'http://localhost:3000',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'));