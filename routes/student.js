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

router.post('/edit/:id', function (req, res, next) {
  const studentId = req.params.id;
  const studentDetail = req.body;
  const options = {
    url: 'https://alc-student-resource.herokuapp.com/students/' + studentId,
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
    },
    json: true,
    body: studentDetail
  };

  request(options, function (error, response, body) {
    console.log(response);
    if (!error && response.statusCode == 200) {
      let success = response.message;
      req.flash('success_msg', 'Student Record Updated Successfully');
      res.redirect(`/student`);
    }
    if (error && response.statusCode == 400) {
      req.flash('error_msg', 'Student Record Failed to Update Record 😦, check your inputs.');
      res.render('editStudent');
    }
  });
})


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

router.get('/delete/:id', function (req, res, next) {
  const studentId = req.params.id;
  console.log(studentId);
  const options = {
    url: 'https://alc-student-resource.herokuapp.com/students/' + studentId,
    method: 'DELETE'
  };

  const url = "https://alc-student-resource.herokuapp.com/students/" + studentId;
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      req.flash('success_msg', 'Student Record Deleted Successfully');
      res.redirect('/student');
    }
  });
})


router.post('/add', function (req, res, next) {
  const studentDetail = req.body;
  const options = {
    url: 'https://alc-student-resource.herokuapp.com/students',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
    json: true,
    body: studentDetail
  };

  request(options, function (error, response, body) {
    console.log(response);
    if (!error && response.statusCode == 201) {
      let success = response.message;
      req.flash('success_msg', 'Student Record Added Successfully');
      res.redirect('/student');
    }
    if (error && response.statusCode == 400) {
      req.flash('error_msg', 'Student Record Failed to Add 😦, check your inputs.');
      res.render('addStudent');
    }
  });
})


module.exports = router;