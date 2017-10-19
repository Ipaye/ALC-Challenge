const express = require('express');
const router = express.Router();

const studentController = require('../app/controllers/studentController');
const { validateParam, schemas, ValidateBody } = require('../app/helpers/validator');


router.route('/')
  .get(studentController.getAllStudents)
  .post( ValidateBody(schemas.studentSchema),studentController.createStudent);

router.route('/:studentId')
  .get(validateParam(schemas.idSchema, 'studentId') ,studentController.getAStudent)
  .patch(validateParam(schemas.idSchema, 'studentId'),ValidateBody(schemas.studentSchema) ,studentController.updateAStudent)
  .delete(validateParam(schemas.idSchema, 'studentId'), studentController.deleteAStudent);

  router.route('/:studentId/course')
  .get(validateParam(schemas.idSchema, 'studentId'),studentController.getAStudentCourse)
  .post(validateParam(schemas.idSchema, 'studentId'), studentController.makeAStudentCourse);
module.exports = router;