const express = require('express');
const app = express();

const espn = require('./espn');

app.set('json spaces', 2);

app.use('/rankings/espn', espn);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
