var express = require('express');
const { userModel } = require('./bdd');
var router = express.Router();


/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login', {erreur: null, session : req.session.user, message: null });
})

/* POST sign-up */
router.post('/sign-up', async function(req, res, next) {
  var users = await userModel.findOne({email: req.body.emailFromFront});
  console.log('users :>> ', JSON.stringify(users));
  if (users == null){
    console.log('sign-up détecté :>> ', JSON.stringify(req.body));
    var newUser = new userModel({
      lastName: req.body.lastNameFromFront,
      firstName: req.body.firstNameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
      lastTrips: []
    })
    await newUser.save();
    req.session.user = newUser;
    req.session.trips = [];
    console.log('newUser :>> ', newUser);
    console.log('req.session.user :', req.session.user);
    res.render('home', {session: req.session.user, message: null });
  } else {
    res.render('login', {erreur: "Cet email existe déjà!", session: req.session.user, message: null})
  }
  
})

/* POST sign-in */
router.post('/sign-in', async function(req, res, next) {
  console.log('sign-in détecté :>> ', JSON.stringify(req.body));
  var user = await userModel.findOne({
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront,
  });
  if (user != null) {
    req.session.user = user;
    req.session.trips = [];
    res.render('home', {erreur: null, session: req.session.user, message: null });
  } else {
    req.session.user = null;
    res.render('login', {erreur: "Login invalide", session: req.session.user, message: null });
  }
})

/* GET signout */
router.get('/sign-out', function(req,res,next) {
  req.session.user = null;
  console.log("sign-out détecté");
  res.redirect('/users/login');
})


module.exports = router;
