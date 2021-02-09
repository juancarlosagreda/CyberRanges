var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/general-form', function (req, res, next) {
    return res.render('general-form');
});

module.exports = router;
