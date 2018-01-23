const express = require('express');
const path = require('path');
const proxy = require('express-http-proxy');
const morgan = require('morgan');

const app = express();

app.use(express.static(__dirname + '/dist'));

app.use('/lineup', proxy('https://www.draftkings.com', {
  proxyReqPathResolver: function (req) {
    return '/lineup' + require('url').parse(req.url).path;
  }
}));

app.use('/rankings', proxy('https://espn-rankings.herokuapp.com', {
  proxyReqPathResolver: function (req) {
    return '/rankings' + require('url').parse(req.url).path;
  }
}));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(process.env.PORT || 8080);
