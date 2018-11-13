const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hello-mongo', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(error => console.error(error.message));

// Available schema Datatypes 
// : String, Number, Date, Buffer, Boolean, ObjectID, Array
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

/* CRUD Operation */

async function createCourse() {
  const course = new Course({
    name: '실전 DApp 빌드',
    author: 'john',
    tags: ['Ethereum', 'Blockchain', 'DApp'],
    isPublished: false
  });
  try{
    const result = await course.save();
    console.log(result);
  } catch(error) {
    console.error(error.mesage);
  }
}

async function getCourses() {
  const courses = await Course
    //.find({ price: { $lt: 15, $gt: 10 })
    //.find({ price: { $in: [10, 15] } })
    // .find({ isPublished: true })
    // .limit(10)
    // .sort({ name: -1 })
    // .select({ name: 1, tags: 1 })
    // .select('name tags')
    // .find({ author: /^ne/i })
    // .find({ author: /hn$/})
    // .find({ author: /.*oh.*/})
    // .count()

  console.log(courses);
}
/* 비교 쿼리 연산자 
  $eq (equal)
  $neq (not equal)
  $gt (greater than)
  $gte (greater than or equal to)
  $lt (less than)
  $lte
  $in
  $nin
*/

/* 논리 쿼리 연산자
  .or
    Course.find()
      .or([{ author: 'neo' }, { isPublished: false }])
  .and
    Course.find()
      .and([{ author: 'neo' }, { isPublished: false }])
*/


getCourses();