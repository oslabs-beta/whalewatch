import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import styles from './scss/Application.scss';

const enhancedFetch = (url, init) => {

  return fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      'Access-Control-Allow-Origin': '*'
    },
  },
  ).then(response => response)
}

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors',
    credentials: 'include'
  },
  fetch: enhancedFetch,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'));