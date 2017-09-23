var express = require('express');
var router = express.Router();
var zenhub_api = require('../config/zenhub');
var github_api = require('../config/github');


router.get('/pipelines', function(req, res, next) {
  getBoard()
  .then((data) => {
    var pipelines = data.pipelines;
    getIssues()
    .then((rsp) => {
      var git_issues = rsp.data;
      pipelines.forEach(function(pipeline) {
        var populated_issues = git_issues.filter(filterIssue,pipeline.issues);
        pipeline.issues = populated_issues;
      }, this);
      res.json(pipelines);
    })
    .catch((e) => {
      console.log('Nooo :( errors everywhere', e);
    })
  })
  .catch((e) => {
    console.log('Nooo :( errors everywhere', e);
  })
});

router.get('/pipelines/:pipeline/issues', function(req, res, next) {
  getBoard()
  .then((data) => {
    var pipelines = data.pipelines;
    var zen_issues = data.pipelines[req.params.pipeline].issues;
    getIssues()
    .then((rsp) => {
      var git_issues = rsp.data;
      res.json(git_issues.filter(filterIssue,zen_issues));
    })
    .catch((e) => {
      console.log('Nooo :( errors everywhere', e);
    })
  })
  .catch((e) => {
    console.log('Nooo :( errors everywhere', e);
  })
});

router.get('/closed-issues', function(req, res, next) {
  getClosedIssues()
  .then((rsp) => {
    var git_issues = rsp.data;
    res.json(git_issues);
  })
  .catch((e) => {
    console.log('Nooo :( errors everywhere', e);
  })
});

var getBoard = function(){
  return zenhub_api.getBoard({ repo_id: process.env.REPO_ID});
}

var getIssues = function(){
  return github_api.getIssues(process.env.GITHUB_OWNER,process.env.GITHUB_REPO).listIssues({"labels": process.env.LABELS});
}

var getClosedIssues = function(){
  return github_api.getIssues(process.env.GITHUB_OWNER,process.env.GITHUB_REPO).listIssues({"labels": process.env.LABELS,"state": "closed"});
}

var filterIssue = function(git_issue){
  to_return = false;
  this.forEach(function(zen_issue) {
    if(zen_issue.issue_number == git_issue.number){
      to_return = true;
    }
  }, this);
  return to_return;
}

module.exports = router;
