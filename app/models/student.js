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
  },
  email: {
    type: String,
    lowercase : true,
    required: true
  },
  address: {
    type: String,
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
  date_created : {
    type : Date,
    default : Date.now
  }
});


const Student = module.exports = mongoose.model('Student', studentSchema);