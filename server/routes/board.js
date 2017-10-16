var express = require('express');
var router = express.Router();
var zenhub_api = require('../config/zenhub');
var github_api = require('../config/github');


router.get('/pipelines', function(req, res, next) {
  // get board from zenhub with pipelines and issue ids
  getBoard()
  .then((data) => {
    var pipelines = data.pipelines;
  // get issue details from github
    getIssues()
    .then((rsp) => {
      var git_issues = rsp.data;
      pipelines.forEach(function(pipeline) {
        var populated_issues = git_issues.filter(filterIssue,pipeline.issues);
        pipeline.issues = populated_issues;
      }, this);
      // Zenhub doesn't provide closed issues 
      // so we need to get them manually and create the Closed pipeline ourself
      getClosedIssues()
      .then((rsp) => {
        var git_issues = rsp.data;
        var closed_pipeline = {};
        var comments_promises = [];
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

router.get('/:issue_id/comments', function(req, res, next) {

  getComments(req.params.issue_id)
    .then((rsp) => {
      var git_comments = rsp.data;
      // res.json(git_comments.filter(filterComments));
      res.json(git_comments);
    })
    .catch((e) => {
      console.log('Nooo :( errors everywhere', e);
    })
});



module.exports = router;

var getBoard = function(){
  return zenhub_api.getBoard({ repo_id: process.env.REPO_ID});
}

var getIssues = function(){
  return github_api.getIssues(process.env.GITHUB_OWNER,process.env.GITHUB_REPO).listIssues({"labels": labels});
}

var getComments = function(issue_id){
  return github_api.getIssues(process.env.GITHUB_OWNER,process.env.GITHUB_REPO).listIssueComments(issue_id);
}

var getClosedIssues = function(){
  return github_api.getIssues(process.env.GITHUB_OWNER,process.env.GITHUB_REPO).listIssues({"labels": labels,"state": "closed"});
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
var filterComments = function(git_comment) {
  return git_comment.body.includes("🐙");
}


