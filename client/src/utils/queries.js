import { gql } from 'graphql-tag';

export const QUERY_POPULAR = gql`
  {
    popularMovies {
      results {
        id
        title
        overview
        poster_path
        release_date
        vote_average
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

export const QUERY_SEARCH = gql`
  query singleMovie($title: String!) {
    singleMovie(title: $title) {
      results {
        id
        title
        overview
        poster_path
        release_date
        vote_average
      }
    }
  }
`;
