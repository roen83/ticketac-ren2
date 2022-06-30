var express = require('express');
var router = express.Router();

/* GET tripsAvailable page */
router.post('tripsAvailable', function(req, res, next) {
  console.log('tripsAvailable détecté');
  var tripsAvailable = ["test1", "test2"];
  res.render('tripsAvailable', {tripsAvailable});
})

/* GET addTrip to basket page */
router.get('addTrip', function(req,res,next) {
  console.log("add trip détecté");
  req.session.trips = ["test"];
  res.render('tripsBasket', {trips: req.session.trips});
})

/* GET checkout from trip basket page */
router.get('checkout', function(req, res, next){
  console.log("checkout détecté");
  var message = "Votre panier validé: bla-bla-bla...";
  res.render('home', {erreur: null, message});
})

/* GET myLastTrips page */
router.get('myLastTrips', function(req,res,next){
  console.log("myLastTrips détecté");
  res.render('myLastTrips', {});
})

module.exports = router;
