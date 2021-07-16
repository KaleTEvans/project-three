const { Schema } = require('mongoose');

// schema for movies that are saved by the user
const movieSchema = new Schema({
  movieTitle: [
    {
      type: String,
      required: true
    },
  ],
  overview: {
    type: String,
    required: true,
  },
  genres: {
    type: Array
  },
  movieId: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = bookSchema;
