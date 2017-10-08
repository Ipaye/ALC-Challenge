const express = require('express');
const router = express.Router();

const studentController = require('../app/controllers/studentController');

router.route('/')
  .get(studentController.getAllStudents)
  .post(studentController.createStudent);

router.route('/:studentId')
  .get(studentController.getAStudent)
  .patch(studentController.updateAStudent)
  .delete(studentController.deleteAStudent);

module.exports = router;