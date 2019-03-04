const express = require('express');
const logger = require('morgan');
const products = require('./routes/products') ;
const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); 
var jwt = require('jsonwebtoken');
const app = express();
const path = require('path');

app.set('secretKey', 'nodeRestApi');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

/*
    Assets
*/

app.get('/styles.css', function(req, res) {
    res.sendFile(path.join(__dirname+"/assets/css/styles.css"));
});

app.get('/app.js', function(req, res) {
    res.sendFile(path.join(__dirname+"/assets/js/app.js"));
});

app.get('/templates/home.html', function(req, res) {
    res.sendFile(path.join(__dirname+"/templates/home.html"));
});

app.get('/templates/products.html', function(req, res) {
    res.sendFile(path.join(__dirname+"/templates/products.html"));
});

app.get('/templates/productDetails.html', function(req, res) {
    res.sendFile(path.join(__dirname+"/templates/productDetails.html"));
});

app.get('/templates/product.html', function(req, res) {
    res.sendFile(path.join(__dirname+"/templates/product.html"));
});

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.use('/users', users);

app.use('/products', validateUser, products);
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      req.body.userId = decoded.id;
      next();
    }
  });
  
}

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
 console.log(err);
 
  if(err.status === 404)
   res.status(404).json({message: "Not found"});
  else 
    res.status(500).json({message: "Something looks wrong :( !!!"});
});

app.listen(3000, function(){
    console.log('Node server listening on port 3000');
});