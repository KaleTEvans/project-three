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
  movieId: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String
  },
  image: {
    type: String,
  }
},
{
  toJson: {
    getters: true
  }
});

module.exports = movieSchema;
