const mongoose = require('mongoose');
const schema = mongoose.Schema;

const courseSchema = new schema({
  courseName: {
    type: String,
  },
  courseCode: {
    type: Number,
  },
  courseUnit : {
    type : Number
  },
  student : [{
    type : schema.Types.ObjectId,
    ref : 'student'
  }]
});


const Course = module.exports = mongoose.model('Course', courseSchema);