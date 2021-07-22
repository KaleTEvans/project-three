import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { QUERY_POPULAR } from '../utils/queries';
import PopularList from '../components/PopularMovies';

require('dotenv').config();
const apiKey2 = process.env.REACT_APP_API_2

const Home = () => {
  // create state for holding returned movie api data
  const [popularMovies, setPopularMovies] = useState([]);
  // const { loading, data } = useQuery(QUERY_POPULAR);

  const popMovies = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey2}&language=en-US&page=1`);
      const data = await response.json();
      console.log(data)
    
      const popData = data.results.map(movie => ({
        movieId: movie.id,
        movieTitle: movie.title,
        overview: movie.overview,
        releaseDate: movie.release_date,
        vote: movie.vote_average,
      }));
      console.log(popData)
      setPopularMovies(popData)
    } catch (err) {
      console.error(err);
    }
  
    
  return (
    <Container>
      <h1 className="title">POPULAR MOVIES!</h1>
      {popularMovies.length
      `Viewing ${popularMovies.length} results:`}
      <Form value={popMovies}></Form>
    </Container>
  )
  
  };
}

export default Home;
