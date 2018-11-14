const Joi = require('joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  release: {
    type: Date,
    default: Date.now()
  },
  mainActor: {
    type: String,
    minlength: 1
  }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(){}

exports.Movie = Movie;
exports.validate = validateMovie;
