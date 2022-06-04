const router = require('express').Router();

router.get('/setting', (req, res) => {
    if (req.session.is_logined) {
        res.render('setting.ejs', {
            'username': req.session.nickname
        });
    } else {
        res.redirect('login')
    }
});

module.exports = router;