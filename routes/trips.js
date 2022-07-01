var express = require('express');
var router = express.Router();
const { tripModel, userModel } = require('./bdd');

/* GET tripsAvailable page */
router.post('/tripsAvailable', async function(req, res, next) { 
  console.log(req.body);
  if (req.body.fromCity == '' || req.body.fromCity == '' || req.body.dateFromFront == '') {
    res.render('home', {session: req.session.user, message: "Demande incomplète", erreur: "Demande incomplète"})
  } else {
  var date = req.body.dateFromFront.split('/');
console.log(date);
var formattedDate = new Date(date[2], date[1]-1, date[0], 1);
var formattedDateNext = new Date(date[2], date[1]-1, date[0]+1, 0);
console.log('formattedDate :>> ', formattedDate);
var tripsTest = await tripModel.find();
console.log('tripsTest :>> ', tripsTest);
  var tripsAvailable = await tripModel.find({ departureCity: req.body.fromCity, arrivalCity: req.body.toCity, departureDate: {$gte: formattedDate, $lte: formattedDateNext }});
console.log(tripsAvailable);
console.log("req.session.user :", req.session.user);
var message = null;
console.log('message :>> ', message);


  res.render('tripsAvailable', {tripsAvailable, session: req.session.user, message});
  }
})

/* GET addTrip to basket page */
router.get('/addTrip', async function(req,res,next) {
  
  var trip = await tripModel.findById(req.query.tripId);
  
  req.session.trips.push(trip);
  console.log('req.session.trips :>> ', req.session.trips);
  res.render('tripsBasket', {trips: req.session.trips, session: req.session.user, message: null});
})

/* GET checkout from trip basket page */
router.get('/checkout', async function(req, res, next){
  console.log("checkout détecté");
  var message = "Votre panier validé: ";
  for (let i=0; i<req.session.trips.length; i++) {
    console.log(await userModel.findById(req.session.user._id));
    await userModel.updateOne({
      _id: req.session.user._id
    }, 
    {
      $push: { lastTrips: req.session.trips[i]._id}
    })
    message += " " + req.session.trips[i].departureCity + " / " + req.session.trips[i].arrivalCity
  }
  req.session.trips = [];
  console.log('message :>> ', message);
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
  res.render('myLastTrips', {user, session: req.session.user, message: null});
})

module.exports = router;
