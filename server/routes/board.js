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
      getClosedIssues()
      .then((rsp) => {
        var git_issues = rsp.data;
        var closed_pipeline = {};
        closed_pipeline.name = "Closed";
        closed_pipeline.issues = git_issues;
        pipelines.push(closed_pipeline);
        res.json(pipelines);
      })
      .catch((e) => {
        console.log('Nooo :( errors everywhere', e);
      })
    })
    .catch((e) => {
      console.log('Nooo :( errors everywhere', e);
    })
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
