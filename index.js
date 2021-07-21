const fetch = require('node-fetch');
require('dotenv').config();

fetch(`https://api.themoviedb.org/3/search/movie/?api_key=55def83f6c5739d768f4cf225b79eed3&language=en-US&query=inception&page=1`)
.then(res => res.json())
.then(data => {
    console.log(data);
})

