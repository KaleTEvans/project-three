const { gql } = require('apollo-server-express');

// need to add properties related to the project
const typeDefs = gql`

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    popularMovies: Result
    singleMovie(title: String!): Result
    savedMovies: [Movie]
  }

  type Result {
    page: Int
    results: [Movie]
  }

  type Movie {
    id: String
    title: String
    overview: String
    poster_path: String
    release_date: String
    vote_average: String
  }

  type User {
    _id: ID
    username: String!
    email: String
    savedMovies: [Movie]

  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMovie(id: String, title: String!, overview: String!, poster_path: String!, release_date: String, vote_average: String): User
    removeMovie(id: String!): User
  }
  

`;

module.exports = typeDefs;






