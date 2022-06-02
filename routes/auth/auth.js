const router = require('express').Router();

router.post('/register', (req, res) => {
    let param = [req.params.id, req.params.pwd, req.params.email];

    // bcrypt.hash(param[1], saltRounds, (error, hash) => {
    //     param[1] = hash;

    //     db.query('INSERT INTO sendmoneycreator_user(`user_id`,`user_pw`,`user_email`,`create_account_time`) VALUES(?,?,?,?);', param, (err, row) => {
    //         if(err) console.log(err)
    //     })
    // })
});

router.post('/login', (req, res) => {
    var post = req.body;
    var id = post.id;
    var password = post.pwd;
    var server_id = "2";
    var server_pwd = "1";

    if(id === server_id && password === server_pwd) {
        req.session.is_logined = true;
        req.session.nickname = server_pwd;
    } else {
    }
})

router.post('/logout', (req, res) => {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});

module.exports = router;