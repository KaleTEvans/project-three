import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedMovies {
        movieId
        movieTitle
        image
        overview
        releaseDate
      }
    }
  }
`;