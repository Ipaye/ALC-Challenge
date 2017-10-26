var express = require('express');
var router = express.Router();
const request = require('request');
/* GET users listing. */
router.get('/', function (req, res, next) {
  let url = "http://localhost:4000/students";
  request(url, function (error, response, body) {
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
router.get('/student/:id', function (req, res, next) {
  const studentId = req.params.id;
  const url = "http://localhost:4000/students/" + studentId;
  console.log(url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let singleStudent = JSON.parse(body);
      console.log(singleStudent);
      res.render('singleStudent', {
        title: "Student info",
        singleStudent
      })
    }
  });
})
router.get('/add', function (req, res, next) {
  res.render('addStudent', {title : 'Add Student'});
})

router.post('/add', function (req, res, next) {
  console.log(req.body);
})

module.exports = router;