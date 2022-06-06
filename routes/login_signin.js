const router = require('express').Router();

router.get('/login', (req, res) => {
    if(req.session.is_logined) {
        res.redirect("/u/" + req.session.nickname)
    } else {
        res.render('login.ejs');
    }
});

router.get('/signin', (req, res) => {
    if(req.session.is_logined) {
        res.redirect("/u/" + req.session.nickname)
    } else {
        res.render('signin.ejs');
    }
});

module.exports = router;