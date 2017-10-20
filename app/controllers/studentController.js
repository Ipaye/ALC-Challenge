const Student = require('../models/student');

module.exports = {
  /**
   * Get all student
   */
  getAllStudents: (req, res, next) => {
    Student.find({}).then((students) => {
      res.status(200).json(students)
      // console.log('Found students', students);
    }).catch((err) => {
      console.log(err);
    })
  },

  /**
   * Create a student
   */
  createStudent: (req, res, next) => {
    const newStudent = new Student(req.value.body);
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
    } = req.value.params;
    Student.findById(studentId).then((student) => {
      if (student.id == null) {
        res.status(404).json({
          "message": "Student Doesnt Exist"
        });
        throw new Error('No Student Found');
        next(err);
      }
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
    } = req.value.params;
    const newDetails = req.value.body;
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
    } = req.value.params;

    Student.findById(studentId).then((student) => {
      console.log(student);
      if (!student || null) {
        throw new Error("No Student Found");
        res.status(404);
        next(err);
      }
      Student.findByIdAndRemove(student.id).then(() => {
        res.status(200).json({
          "success": true,
          "message": "Student Record Deleted successfully"
        })
      }).catch((err) => {
        next(err);
      })
    }).catch((err) => {
      next(err);
    })
  }
}