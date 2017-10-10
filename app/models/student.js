const mongoose = require('mongoose');
const schema = mongoose.Schema;

const studentSchema = new schema({
  firstName : {
    type : String,
  },
  lastName : {
    type : String,
  },
  email : {
    type : String,
  },
  address : {
    type : String,
    required: true
  },
  phoneNumber : {
    type : String,
  }  
});


const Student = module.exports = mongoose.model('Student', studentSchema);