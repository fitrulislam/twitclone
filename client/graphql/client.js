import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://user-tuitclone.roarized.com/graphql'
});

export default client;