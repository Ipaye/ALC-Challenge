//Require Modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');



// Setting mongoose promise to global promise
mongoose.Promise = global.Promise;

// mongoose Connection 
mongoose.connect('mongodb://ipaye:studentrecord@ds121495.mlab.com:21495/alc-student-record', {useMongoClient :true});

// Check Connection
mongoose.connection.on('connect', ()=> {
  console.log('connect to the db');  
}).on('error', (err)=> {
  console.log('failed to connect');
})

// Custom requires
const student = require('./routes/route');

const PORT = process.env.PORT || 4000;
// instantiate express
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}))

// Routes
app.use('/students', student);

// Route for the home Page
app.get('/', (req,res,next)=>{
  res.status(200).json({
    message : 'Welcome to the api, go to /students to access the Students API'
  })
})
app.get('*', (req,res,next)=>{
  res.status(404).json({
    message : 'Page not found'
  })
})

// Catch 404 Errors and forward them to error handler
app.use((req, res, next)=>{
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
})

// Error handler function
app.use((err, req, res, next)=>{
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  // response to client
  res.status(status).json({
    error : {
      message : error.message
    }
  });

  // Response to self
  console.error(err);
});


// Start Server
app.listen(PORT, ()=>{
  console.log(`Magic is happening on http://localhost:${PORT}`);  
});