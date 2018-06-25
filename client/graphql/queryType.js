import gql from 'graphql-tag';

export const GET_ALL_USERS = gql `
  {
    users {
      _id
      name
      username
      profile
    }
  }
`;