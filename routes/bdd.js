const mongoose = require('mongoose');

// useNewUrlParser ;)
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
 };

// --------------------- BDD -----------------------------------------------------
mongoose.connect('mongodb+srv://admin:admin@cluster0.835jd.mongodb.net/ticketac?retryWrites=true&w=majority',
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Ticketac connection : Success ***');
    }
   }
);



var tripSchema = mongoose.Schema({
    departureCity: String,
    arrivalCity: String,
    departureDate: Date,
    departureTime: String,
    price: Number,
  });
  
  var tripModel = mongoose.model('trips', tripSchema);
  
  var userSchema = mongoose.Schema({
    lastName: String,
    firstName: String,
    email: String, //unique
    password: String,
    lastTrips: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'trips'
    },
  });
  
  var userModel = mongoose.model('users', userSchema);
  
  module.exports = {tripModel, userModel};