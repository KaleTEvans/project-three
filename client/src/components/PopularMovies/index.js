import React, { useState } from 'react';
import { Card, Container, CardColumns, Button } from 'react-bootstrap';
import Auth from '../../utils/auth';

const PopularList = ({ popular }) => {
    console.log(popular)
    const imgRoute = 'https://image.tmdb.org/t/p/w500';

    // create state for holding returned api data
    const [searchedMovies, setSearchedMovies] = useState([]);
    // create state to hold saved bookId values
    const [savedMovieIds, setSavedMovieIds] = useState([]);

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


    return (
        <>  
            <link href="https://fonts.googleapis.com/css2?family=Otomanopee+One&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet"></link>
            <Container>
                <h2>Popular Movies</h2>
                <CardColumns>
                {popular.results && 
                    popular.results.map(movie => (
                        <Card key={movie.id} border='dark'>
                            {movie.poster_path ? (
                            <Card.Img src={imgRoute + movie.poster_path} alt={`The cover for ${movie.title}`} variant='top' />
                            ) : null}
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text style={{ fontSize: 20 }}>{movie.overview}</Card.Text>
                                <p style={{ fontSize: 20 }}>Release Date: {movie.release_date}</p>
                                <p style={{ fontSize: 20 }}>IMDB score: {movie.vote_average}</p>
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
                    ))}
                </CardColumns>
            </Container>
        </>
    )

};

export default PopularList;