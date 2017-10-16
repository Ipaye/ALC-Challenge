const Student = require('../models/student');
const Course = require('../models/course');

module.exports = {
  /**
   * Get all student
   */
  getAllStudents: (req, res, next) => {
    Student.find({}).then((users) => {
      res.status(200).json({
        users
      })
      console.log('Found users', users);
    }).catch((err) => {
      console.log(err);
    })
  },

  /**
   * Create a student
   */
  createStudent: (req, res, next) => {
    const newStudent = new Student(req.body);
    newStudent.save().then((student) => {
      console.log('saved');
      res.status(201).json({
        "message": "success",
        student
      })
    }).catch((err) => {
      next(err);
    })
    console.log('student created', newStudent);
  },

  /**
   * Get a single student
   */
  getAStudent: (req, res, next) => {
    const {
      studentId
    } = req.params;
    Student.findById(studentId).then((student) => {
      res.status(200).json(student);
    }).catch((err) => {
      next(err);
    })
  },

  /**
   * Find and update a single student
   */
  updateAStudent: (req, res, next) => {
    const {
      studentId
    } = req.params;
    const newDetails = req.body;
    Student.findByIdAndUpdate(studentId, newDetails).then(() => {
      res.status(200).json({
        "success": true
      })
    }).catch((err) => {
      next(err);
    })


  },

  /**
   * Find and delete a single student
   */
  deleteAStudent: (req, res, next) => {
    const {
      studentId
    } = req.params;
    Student.findByIdAndRemove(studentId).then(() => {
      res.status(200).json({
        "success": true,
        "message": "Student Record Deleted successfully"
      })
    }).catch((err) => {
      next(err);
    })
  },

  getAStudentCourse: (req, res, next) => {
    const {
      studentId
    } = req.params;
    Student.findById(studentId).then((student) => {
      console.log('Student Info', student);
    }).catch((err) => {
      next(err);
    })

  },
  makeAStudentCourse: (req, res, next) => {
    const {
      studentId
    } = req.params;
    const newCourse = new Course(req.body);
    Student.findById(studentId).then((student) => {
      console.log('Student Info', student);
      newCourse.student = student;
      newCourse.save().then(() => {
        console.log(`Course saved`);
      }).catch((err) => {
        next(err);
      });
      student.courses.push(newCourse);
      student.save().then(() => {
        console.log(`Student updated`);
        res.status(201).json(newCourse);
      }).catch((err) => {
        next(err);
      });

    }).catch((err) => {
      next(err);
    })

  }

}