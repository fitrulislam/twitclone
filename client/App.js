import React from 'react';
import 'es6-symbol/implement';
import { ApolloProvider } from "react-apollo";

import Index from './src/index';
import client from './graphql/client';

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={ client }>
        <Index />
      </ApolloProvider>
    );
  };
};
