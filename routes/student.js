var express = require('express');
var router = express.Router();
const request = require('request');


/* GET users listing. */
router.get('/', function (req, res, next) {
  let url = "https://alc-student-resource.herokuapp.com/students";
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let students = JSON.parse(body);
      // console.log(students);
      res.render('students', {
        title: "View All student",
        students
      })
    }
  });
});

/**
 * route to render the add page
 */
router.get('/add', function (req, res, next) {
  res.render('addStudent', {
    title: 'Add Student'
  });
})

/**
 * route to view a single student
 */

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

/**
 * Route to edit a single student
 */

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
    // console.log(response);
    if (!error && response.statusCode == 200) {
      let success = response.message;
      req.flash('success_msg', 'Student Record Updated Successfully');
      res.redirect(`/student`);
    }
    if (response.statusCode == 400) {
      req.flash('error_msg', 'Student Record Failed to Update Record 😦, check your inputs.');
      res.redirect('/student');
    }
  });
})

/**
 * Route to show page for editing a single student
 */

router.get('/edit/:id', function (req, res, next) {
  const studentId = req.params.id;
  const url = "https://alc-student-resource.herokuapp.com/students/" + studentId;
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

/**
 * Route to delete a single student
 */
router.get('/delete/:id', function (req, res, next) {
  const studentId = req.params.id;
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


/**
 * Route to add a single student
 */

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
    console.log(response.body.details);

    if (!error && response.statusCode == 201) {
      let success = response.message;
      req.flash('success_msg', 'Student Record Added Successfully');
      res.redirect('/student');
    }
    if (response.statusCode == 400) {
      req.flash('error_msg', 'Student Record Failed to Add 😦, check your inputs.');
      res.redirect('/student/add');
    }
  });
})


module.exports = router;