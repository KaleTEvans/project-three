import React from 'react';
import { Card, Container, CardColumns } from 'react-bootstrap';

const PopularList = ({ popular }) => {
    console.log(popular)
    const imgRoute = 'https://image.tmdb.org/t/p/w500';

    return (
        <>  
            <Container>
                <h2>Popular Movies</h2>
                <CardColumns>
                {popular.results && 
                    popular.results.map(result => (
                        
                        <Card key={result.id} className='card mb-3' border='dark'>
                            
                            <Card.Body>
                                <Card.Title className='card-header'>
                                    {result.title}
                                </Card.Title>
                                <Card.Img src={imgRoute + result.poster_path} variant='top'/>
                                <Card.Text>{result.overview}</Card.Text>
                                <p>Release Date: {result.release_date}</p>
                                <p>IMDB Score: {result.vote_average}</p>
                            </Card.Body>    
                        </Card>
                    ))}
                </CardColumns>
            </Container>
        </>
    )

};

export default PopularList;