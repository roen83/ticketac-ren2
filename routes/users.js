var express = require('express');
var router = express.Router();

/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

/* GET login page */
router.get('login', function(req, res, next) {
  res.render('login', {erreur: null});
})

/* POST sign-up */
router.post('sign-up', function(req, res, next) {
  console.log('sign-up détecté :>> ', JSON.stringify(req.body));
})

/* POST sign-in */
router.post('sign-in', function(req, res, next) {
  console.log('sign-in détecté :>> ', JSON.stringify(req.body));
})

module.exports = router;
