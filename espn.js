const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');

function getRankings(url, callback) {
  request.get(url, function (error, response, body) {
    var table = body.substring(body.indexOf('var newTable = jQuery(\'') + 23);
    table = table.substring(0, table.indexOf('\');')).replace(/\\/g, '');
    var $ = cheerio.load(table);
    var rankings = $('tbody tr').map(function (i, elem) {
      var $tr = $(this), td = $tr.find('td:nth-child(1)').text();
      return {
        overall: td.substring(0, td.indexOf('.')),
        name: td.indexOf(',') === -1 ? td.substring(td.indexOf('.') + 2) : td.substring(td.indexOf('.') + 2, td.indexOf(',')),
        opp: $tr.find('td:nth-child(2)').text(),
        berry: $tr.find('td:nth-child(3)').text(),
        karabell: $tr.find('td:nth-child(4)').text(),
        yates: $tr.find('td:nth-child(5)').text(),
        cockroft: $tr.find('td:nth-child(6)').text(),
        avg: $tr.find('td:nth-child(7)').text()
      }
    }).get();
    callback(rankings);
  });
}

router.get('/quarterbacks', function (req, res) {
  getRankings('http://g.espncdn.com/ffl/tools/rankingsTable?slotCategoryId=0&scoringPeriodId=2&seasonId=2017&rankType=ppr', function (rankings) {
    res.json(rankings);
  });
});

router.get('/running-backs', function (req, res) {
  getRankings('http://g.espncdn.com/ffl/tools/rankingsTable?slotCategoryId=2&scoringPeriodId=2&seasonId=2017&rankType=ppr', function (rankings) {
    res.json(rankings);
  });
});

router.get('/wide-receivers', function (req, res) {
  getRankings('http://g.espncdn.com/ffl/tools/rankingsTable?slotCategoryId=4&scoringPeriodId=2&seasonId=2017&rankType=ppr', function (rankings) {
    res.json(rankings);
  });
});

router.get('/tight-ends', function (req, res) {
  getRankings('http://g.espncdn.com/ffl/tools/rankingsTable?slotCategoryId=6&scoringPeriodId=2&seasonId=2017&rankType=ppr', function (rankings) {
    res.json(rankings);
  });
});

router.get('/defenses', function (req, res) {
  getRankings('http://g.espncdn.com/ffl/tools/rankingsTable?slotCategoryId=16&scoringPeriodId=2&seasonId=2017&rankType=ppr', function (rankings) {
    res.json(rankings);
  });
});

module.exports = router;
