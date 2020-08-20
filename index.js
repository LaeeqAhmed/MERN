//index.js file is the file of the first page of web that is to be the first template of our website
const express = require('express')//express=basically a foldername expree ko khud hi pata chal jata ha
//const routes = require('./routes/api'); importing
//setup an exprees app
const app = express();
//body parser a middleware
const bodyParser = require('body-parser');
//adding mongoose
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/ninjago", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;//If we want to use mongoose in different position inside the codes it must be seen as global mode
app.use(express.static('public'));// a middleware that define all front end files such ashtml,css middleware for frontend
app.use(bodyParser.json());
app.use('/api',require('./routes/api')); // we have a module (./routes/api) and use inside '/api'
//another middleware for error handler...
/*app.use(function(err,req,res,next){
console.log(err);
//res.send({errorhandler:err.ValidationError});
});*/
app.use(function(err,req,res,next){
console.log(err);
});
//connection to mongodb
/*
app.get('/api', function(req, res){//(1->method,2->route,3->callbackfuncwith2 )
  console.log('get request shadi karle');
  res.send({name:'hunain ali son of imran bhatti'});
  res.end();
});*/
//use this app
//initialize routes
//this one is also called as middleware

//listen for requests
app.listen(process.env.port || 4000, function(){
  console.log('now we are able to listening for requests');
});
