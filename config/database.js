const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/rentalnode';

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

module.exports = mongoose;