var ZenHub = require('zenhub-api');
var api = new ZenHub(process.env.ZENHUB_API_KEY);

module.exports = api;