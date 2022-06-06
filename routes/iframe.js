const router = require('express').Router();

router.get('/:number', (req, res) => {
    res.render('iframe/iframe_' + req.params.number + '.ejs');
});

module.exports = router;
