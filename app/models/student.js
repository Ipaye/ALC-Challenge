const mongoose = require('mongoose');
const schema = mongoose.Schema;

const studentSchema = new schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    // required: true
  },
  email: {
    type: String,
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  parentPhoneNumber: {
    type: String,
  },
  courses : [{
    type : schema.Types.ObjectId,
    ref : 'Course'
  }]
});


const Student = module.exports = mongoose.model('Student', studentSchema);