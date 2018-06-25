import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://192.168.0.19:4000/graphql'
});

export default client;