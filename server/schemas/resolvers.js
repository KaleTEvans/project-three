const { AuthenticationError } = require('apollo-server-express');
const { User, Movie } = require('../models');
const { signToken } = require('../utils/auth');
const fetch = require('node-fetch');
require('dotenv').config();
const { apiKey } = process.env;

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedMovies');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    popularMovies: () => {
      return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
      .then(res => res.json())
    },
    singleMovie: (root, args) => {
      return fetch(`https://api.themoviedb.org/3/search/movie/?api_key=${apiKey}&language=en-US&query=${args.title}&page=1`)
      .then(res => res.json())
    },
    // savedMovies: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Movie.find(params).sort({ createdAt: -1 });
    // }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
    
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
    
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const token = signToken(user);
      return { token, user };
    },
    saveMovie: async (parent, { id, title, overview, poster_path, release_date, vote_average }, context) => {
      if (context.user) {

        const mutatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedMovies: { id, title, overview, poster_path, release_date, vote_average } } },
          { new: true, useFindAndModify: false }
        );

        return mutatedUser;
      }

      throw new AuthenticationError('Error saving movie');
    },
    removeMovie: async (parent, { id }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedMovies: { id } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  },
    
    
    
};

module.exports = resolvers;