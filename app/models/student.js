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
    lowercase: true,
    required: true
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  dob: {
    type: String,
    required: [true, 'You Must set your Date of Birth and you cannot Change it.']
  },
  level: {
    type: Number,
  },
  course: {
    type: String,
  },
  profileImage: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});


const Student = module.exports = mongoose.model('Student', studentSchema);