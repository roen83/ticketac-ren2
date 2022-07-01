var express = require('express');
var router = express.Router();

/* GET tripsAvailable page */
router.post('/tripsAvailable', function(req, res, next) {
  console.log('tripsAvailable détecté');
  var tripsAvailable = [
    {  "_id": {    "$oid": "62bd6c24fd5db53a2c9510f6"  },  "departureCity": "Nantes",  "arrivalCity": "Rennes",  "departureDate": {    "$date": {      "$numberLong": "1543017600000"    }  },  "departureTime": "16:00",  "price": 121,  "__v": 0},
    {  "_id": {    "$oid": "62bd6c24fd5db53a2c9510f8"  },  "departureCity": "Melun",  "arrivalCity": "Paris",  "departureDate": {    "$date": {      "$numberLong": "1542672000000"    }  },  "departureTime": "10:00",  "price": 93,  "__v": 0}];
  res.render('tripsAvailable', {tripsAvailable, session: req.session.user});
})

/* GET addTrip to basket page */
router.get('/addTrip', function(req,res,next) {
  console.log("add trip détecté");
  req.session.trips = [req.query.tripId];
  console.log('req.body.tripId :>> ', JSON.stringify(req.query.tripId));
  res.render('tripsBasket', {trips: req.session.trips, session: req.session.user});
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
  var trips = [
    {  "_id": {    "$oid": "62bd6c24fd5db53a2c9510f6"  },  "departureCity": "Nantes",  "arrivalCity": "Rennes",  "departureDate": {    "$date": {      "$numberLong": "1543017600000"    }  },  "departureTime": "16:00",  "price": 121,  "__v": 0},
    {  "_id": {    "$oid": "62bd6c24fd5db53a2c9510f8"  },  "departureCity": "Melun",  "arrivalCity": "Paris",  "departureDate": {    "$date": {      "$numberLong": "1542672000000"    }  },  "departureTime": "10:00",  "price": 93,  "__v": 0}];
  res.render('myLastTrips', {trips, session: req.session.user});
})

module.exports = router;
