const { gql } = require('apollo-server-express');

// need to add properties related to the project
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  
  type Auth {
    token: ID!
    user: User
  }
  
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMovie(movieData: MovieInput!): User
    removeMovie(movieId: ID!): User
  }
`;

module.exports = typeDefs;