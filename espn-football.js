const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');

function getName(td) {
    let name;
    if (td.indexOf(',') === -1) {
        name = td.substring(td.indexOf('.') + 2);
        name = name.substring(name.lastIndexOf(' ') + 1);
    } else {
        name = td.substring(td.indexOf('.') + 2, td.indexOf(','));
    }
    return name;
}

function getRankings(slotCategoryId, scoringPeriodId, seasonId, callback) {
    const url = `http://g.espncdn.com/ffl/tools/rankingsTable?slotCategoryId=${slotCategoryId}&scoringPeriodId=${scoringPeriodId}&seasonId=${seasonId}&rankType=ppr`;
    request.get(url, function (error, response, body) {
        let table = body.substring(body.indexOf('var newTable = jQuery(\'') + 23);
        table = table.substring(0, table.indexOf('\');')).replace(/\\/g, '');
        const $ = cheerio.load(table);
        const rankings = $('tbody tr').map(function (i, elem) {
            const $tr = $(this), td = $tr.find('td:nth-child(1)').text();
            return {
                overall: td.substring(0, td.indexOf('.')),
                name: getName(td),
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

router.get('/:seasonId/:scoringPeriodId/qb', (req, res) => {
    getRankings(0, req.params.scoringPeriodId, req.params.seasonId, (rankings) => {
        res.json(rankings);
    });
});

router.get('/:seasonId/:scoringPeriodId/rb', (req, res) => {
    getRankings(2, req.params.scoringPeriodId, req.params.seasonId, (rankings) => {
        res.json(rankings);
    });
});

router.get('/:seasonId/:scoringPeriodId/wr', (req, res) => {
    getRankings(4, req.params.scoringPeriodId, req.params.seasonId, (rankings) => {
        res.json(rankings);
    });
});

router.get('/:seasonId/:scoringPeriodId/te', (req, res) => {
    getRankings(6, req.params.scoringPeriodId, req.params.seasonId, (rankings) => {
        res.json(rankings);
    });
});

router.get('/:seasonId/:scoringPeriodId/dst', (req, res) => {
    getRankings(16, req.params.scoringPeriodId, req.params.seasonId, (rankings) => {
        res.json(rankings);
    });
});

module.exports = router;
