const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/signin', (req, res) => {
    res.render('signin.ejs');
});

module.exports = router;