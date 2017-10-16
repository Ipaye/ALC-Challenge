const mongoose = require('mongoose');
const schema = mongoose.Schema;

const courseSchema = new schema({
  courseName: {
    type: String,
  },
  courseCode: {
    type: String,
  },
  courseUnit : {
    type : Number
  },
  student : {
    type : schema.Types.ObjectId,
    ref : 'Student'
  }
});


const Course = module.exports = mongoose.model('Course', courseSchema);