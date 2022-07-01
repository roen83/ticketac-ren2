var express = require('express');
var router = express.Router();
const { tripModel, userModel } = require('./bdd');

/* GET tripsAvailable page */
router.post('/tripsAvailable', async function(req, res, next) { 

  var tripsAvailable = await tripModel.find({ departureCity: req.body.fromCity, arrivalCity: req.body.toCity, departureDate: new Date(req.body.dateFromFront) });
console.log(tripsAvailable);
console.log(req.body);
console.log(new Date(req.body.dateFromFront));

  res.render('tripsAvailable', {tripsAvailable, session: req.session.user});
})

/* GET addTrip to basket page */
router.get('/addTrip', function(req,res,next) {
  console.log("add trip détecté");
  req.session.trips.push(req.query.tripId);
  res.render('tripsBasket', {trips: req.session.trips});
})

/* GET checkout from trip basket page */
router.get('/checkout', function(req, res, next){
  console.log("checkout détecté");
  var message = "Votre panier validé: bla-bla-bla...";
  res.render('home', {erreur: null, message});
})

/* GET myLastTrips page */
router.get('/myLastTrips', function(req,res,next){
  console.log("myLastTrips détecté");
  res.render('myLastTrips', {});
})

module.exports = router;
