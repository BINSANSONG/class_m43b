const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/exercise-basic', { useNewUrlParser: true })
  .then(() => console.log('Exercise TIME!٩(ᐛ)و'))
  .catch(error => console.error(error.message));

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now() },
  isPublished: Boolean,
  price: Number,
});

async function getEx1(){

}

async function getEx2(){
  
}

async function getEx3(){
  
}

getEx1();
getEx2();
getEx3();