const express = require('express');
const path = require('path');
const proxy = require('express-http-proxy');
const morgan = require('morgan');

const app = express();

app.use(express.static(__dirname + '/dist'));

app.use('/draftkings', proxy('https://www.draftkings.com'));

app.use('/espn-rankings', proxy('https://espn-rankings.herokuapp.com'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(process.env.PORT || 8080);
