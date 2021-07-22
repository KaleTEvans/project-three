import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_POPULAR, QUERY_SEARCH } from '../utils/queries';
import PopularList from '../components/PopularMovies';
import { searchMovies } from '../utils/API';

import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { SAVE_MOVIE } from '../utils/mutations';

const SearchBooks = () => {
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state for holding returned api data
  const [searchedMovies, setSearchedMovies] = useState([]);

  // query for popular movie list
  const { loading, data } = useQuery(QUERY_POPULAR);

  const popular = data?.popularMovies || [];

  // create state to hold saved bookId values
  const [savedMovieIds, setSavedMovieIds] = useState([]);

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {   
      const response = await searchMovies(searchInput)

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      console.log(response)

      const items = await response.json();
      console.log(items)

      const movieData = items.results.map((movie) => ({
        movieId: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average
      }));

      setSearchedMovies(movieData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  }

  // create function to handle saving a book to our database
  const handleSaveMovie = async (movieId) => {
    // find the book in `searchedBooks` state by the matching id
    const movieToSave = searchedMovies.find((movie) => movie.id === movieId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await handleSaveMovie(movieToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if book successfully saves to user's account, save book id to state
      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

  const imgRoute = 'https://image.tmdb.org/t/p/w500';

  return (
    <div>
    <link href="https://fonts.googleapis.com/css2?family=Otomanopee+One&display=swap" rel="stylesheet"></link>
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet"></link>
    
      <Jumbotron fluid className='jumbo'>
        <Container>
          <h1 className="title">SEARCH FOR MOVIES!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a movie'
                  className="search"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg' className="search">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : <PopularList popular={popular} />}
        </h2>
        <CardColumns>
          {searchedMovies.map((movie) => {
            return (
              <Card key={movie.id} border='dark'>
                {movie.posterPath ? (
                  <Card.Img src={imgRoute + movie.posterPath} alt={`The cover for ${movie.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.overview}</Card.Text>
                  <p>Release Date: {movie.release_date}</p>
                  <p>IMDB score: {movie.vote_average}</p>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.id)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveMovie(movie.id)}>
                      {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.id)
                        ? 'This movie has already been saved!'
                        : 'Save this movie!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </div>
  );
};

export default SearchBooks;
