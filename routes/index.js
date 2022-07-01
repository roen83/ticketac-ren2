var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var allModels = require('./bdd');
var tripModel = allModels.tripModel;
var userModel = allModels.userModel;
//console.log('allModels :>> ', JSON.stringify(allModels));

//var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
//var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]

/* GET default / page */
router.get('/', function (req,res,next) {
  res.redirect('/home');
})

/* GET home page. */
router.get('/home', function(req, res, next) {
  //si login en session: home.ejs, sinon redirige vers /login
  console.log('req.session.user :>> ', req.session.user);
  if (req.session.user != null) {
    res.render('home', {erreur: null, session: req.session.user, message: null});
  } else {
    res.redirect('/users/login');
  }
  //res.render('home', {  });
});


// Remplissage de la base de donnée, une fois suffit
/*
router.get('/save', async function(req, res, next) {

  // How many journeys we want
  var count = 300

  // Save  ---------------------------------------------------
    for(var i = 0; i< count; i++){

    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

    if(departureCity != arrivalCity){

      var newTrip = new tripModel ({
        departureCity: departureCity , 
        arrivalCity: arrivalCity, 
        departureDate: date[Math.floor(Math.random() * Math.floor(date.length))],
        departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
        price: Math.floor(Math.random() * Math.floor(125)) + 25,
      });
       
       await newTrip.save();

    }

  }
  res.render('index', { title: 'Express' });
});
*/

// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
/*
router.get('/result', function(req, res, next) {

  // Permet de savoir combien de trajets il y a par ville en base
  for(i=0; i<city.length; i++){

    tripModel.find( 
      { departure: city[i] } , //filtre
  
      function (err, journey) {

          console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
      }
    )

  }


  res.render('index', { title: 'Express' });
});
*/

module.exports = router;
