const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/relation', { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.error(error.message));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    required: true,
  },
  github: String,
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

async function createAuthor(name, github) {
  const author = new Author({ name, github });
  try{ 
    const result = await author.save() 
    console.log(result);
  } catch(error) {
    console.error(error.messgae)
  };
}

async function createCourse(name, author) {
  const course = new Course(name, author);
  const result = await course.save();
  console.log(result);
}

createAuthor('neo', 'gihub@hphk.kr');
// createCourse()