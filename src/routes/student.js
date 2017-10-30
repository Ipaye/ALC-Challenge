var express = require('express');
var router = express.Router();
const request = require('request');
/* GET users listing. */
router.get('/', function (req, res, next) {
  let url = "https://alc-student-resource.herokuapp.com/students";
  request(url, function (error, response, body) {
    // console.log(response);

    if (!error && response.statusCode == 200) {
      let students = JSON.parse(body);
      console.log(students);
      res.render('students', {
        title: "View All student",
        students
      })
    }
  });
});

router.get('/add', function (req, res, next) {
  res.render('addStudent', {
    title: 'Add Student'
  });
})


router.get('/view/:id', function (req, res, next) {
  const studentId = req.params.id;
  const url = "https://alc-student-resource.herokuapp.com/students/" + studentId;
  // console.log(url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let singleStudent = JSON.parse(body);
      console.log(singleStudent);
      res.render('singleStudent', {
        title: 'View Student | Alc Records',
        singleStudent
      })
    }
  });
});

router.get('/edit/:id', function (req, res, next) {
  const studentId = req.params.id;
  console.log(studentId);

  const url = "https://alc-student-resource.herokuapp.com/students/" + studentId;
  // console.log(url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let student = JSON.parse(body);
      console.log(student);
      res.render('editStudent', {
        title: 'View Student | Alc Records',
        student
      })
    }
  });
})

router.post('/add', function (req, res, next) {
  console.log(req.body);
})


module.exports = router;