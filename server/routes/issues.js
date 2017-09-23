var express = require('express');
var router = express.Router();
var github_api = require('../config/github');

router.get('/', function(req, res, next) {
  github_api.getIssues(process.env.GITHUB_OWNER,process.env.GITHUB_REPO).listIssues({"labels": process.env.LABELS})
  .then((rsp) => {
    res.json(rsp.data);
  })
  .catch((e) => {
    console.log('Nooo :( errors everywhere', e);
  }) 
});




module.exports = router;
