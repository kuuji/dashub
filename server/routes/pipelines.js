var express = require('express');
var router = express.Router();
var zenhub_api = require('../config/zenhub');
/* GET users listing. */
router.get('/', function(req, res, next) {
  zenhub_api.getBoard({ repo_id: process.env.REPO_ID})
  .then((data) => {
    res.json(data);
  })
  .catch((e) => {
    console.log('Nooo :( errors everywhere', e);
  })
});


module.exports = router;
