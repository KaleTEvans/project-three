import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_POPULAR } from '../utils/queries';
import PopularList from '../components/PopularMovies';

const Home = () => {
    const { loading, data } = useQuery(QUERY_POPULAR);

    const popular = data?.popularMovies || [];
    console.log(popular)

    return (
        <main>
            <div>
                <PopularList popular={popular} />
            </div>
        </main>
    )
}

export default Home;