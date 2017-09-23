
var GitHub = require('github-api');
var gh = new GitHub({
  username: process.env.GITHUB_USER,
  token: process.env.GITHUB_TOKEN
});

module.exports = gh;