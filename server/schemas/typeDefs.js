const { gql } = require('apollo-server-express');

// need to add properties related to the project
const typeDefs = gql`

  type Query {
    popularMovies: Result
    singleMovie(title: String): Result
  }

  type Result {
    page: Int
    results: [Movie]
  }

  type Movie {
    id: Int
    title: String
    overview: String
    poster_path: String
    release_date: String
    vote_average: Float
  }

  type User {
    _id: ID
    username: String!
    email: String
    
  }
  
`;

module.exports = typeDefs;

// type Auth {
  //   token: ID!
  //   user: User
  // }


  // type Mutation {
  //   login(email: String!, password: String!): Auth
  //   addUser(username: String!, email: String!, password: String!): Auth
  // }