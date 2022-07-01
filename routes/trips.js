var express = require('express');
var router = express.Router();
const { tripModel, userModel } = require('./bdd');

/* GET tripsAvailable page */
router.post('/tripsAvailable', async function(req, res, next) { 
  console.log(req.body);
  var date = req.body.dateFromFront.split('/');
console.log(date);
var formattedDate = new Date(date[2], date[1]-1, date[0], 1);
var formattedDateNext = new Date(date[2], date[1]-1, date[0]+1, 0);
console.log('formattedDate :>> ', formattedDate);
  var tripsAvailable = await tripModel.find({ departureCity: req.body.fromCity, arrivalCity: req.body.toCity, departureDate: {$gte: formattedDate, $lte: formattedDateNext }});
console.log(tripsAvailable);



  res.render('tripsAvailable', {tripsAvailable, session: req.session.user});
})

/* GET addTrip to basket page */
router.get('/addTrip', async function(req,res,next) {
  
  var trip = await tripModel.findById(req.query.tripId);
  
  req.session.trips.push(trip);
  console.log('req.session.trips :>> ', req.session.trips);
  res.render('tripsBasket', {trips: req.session.trips, session: req.session.user});
})

/* GET checkout from trip basket page */
router.get('/checkout', async function(req, res, next){
  console.log("checkout détecté");
  var message = "Votre panier validé: bla-bla-bla...";
  await userModel.updateOne({_id: req.session.user._id}, {lastTrips: ['62bd6c24fd5db53a2c9510f6']})
  res.render('home', {erreur: null, message, session: req.session.user});
})

/* GET myLastTrips page */
router.get('/myLastTrips', async function(req,res,next){
  console.log("myLastTrips détecté");
  //var trips = req.session.trips; // pour essayer
  var userId = req.session.user._id
  console.log('userId :>> ', userId);
  var user = await userModel.findById(userId).populate('lastTrips');
  console.log('user :>> ', user);
  res.render('myLastTrips', {user, session: req.session.user});
})

module.exports = router;
