import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//change const name related to the project
export const SAVE_MOVIE = gql`
  mutation saveMovie($id: String, $title: String!, $overview: String!, $poster_path: String!, $release_date: String, $vote_average: String) {
    saveMovie(id: $id, title: $title, overview: $overview, poster_path: $poster_path, release_date: $release_date, vote_average: $vote_average) {
      _id
      username
      email
      savedMovies {
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

//change const name related to the project
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
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