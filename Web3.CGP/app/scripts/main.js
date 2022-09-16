let express = require('express');
// var fs = require('fs');

let router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.send('hello world')
});

module.exports = router;
