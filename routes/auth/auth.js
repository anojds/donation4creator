const router = require('express').Router();

var crypto = require('crypto');
const getConnection = require('./db.js');

router.post('/login', (req, res) => {
    var post = req.body;
    var id = post.id;
    var pwd = post.pwd;


    getConnection((err, conn) => {
        conn.query(
            `select user_id, salt, user_password From sendmoneycreator_user where user_id = '${id}';`,
            function (err, result, fields) {
                if (result.length > 0) {
                    if (err) throw err;

                    const hashPassword = crypto
                        .createHash('sha512')
                        .update(pwd + result[0].salt)
                        .digest('hex');

                    if (id === result[0].user_id && hashPassword === result[0].user_password) {
                        req.session.is_logined = true;
                        req.session.nickname = result[0].user_id;
                        res.redirect('/');
                    } else {
                        res.send("계정을 찾을수 없습니다")
                    }
                } else {
                    res.send("계정을 찾을수 없습니다")
                }
            },
        );
        conn.release();
    });
});

router.post('/register', (req, res) => {
    const body = req.body;
    let id = body.id;
    var pwd = body.pwd
    var sppwd = pwd.toString().split(',');

    let email = body.email;
    let salt = crypto.randomBytes(128).toString('base64');
    let hashPassword = crypto
        .createHash('sha512')
        .update(sppwd[0] + salt)
        .digest('hex');


    getConnection((err,conn) => {
        conn.query(
            `INSERT INTO sendmoneycreator_user (user_id, salt, user_password,user_email,create_account_time) values ('${id}','${salt}','${hashPassword}','${email}','1')`,
            function (err, result, fields) {
                if (err) {
                    res.send("문제가 발생했습니다 좀이따 다시 시도해보시고 만약 오류가 지속된다면 관리자에게 문의를 주세요 (Discord : anojds#1234)");
                } else {
                    res.redirect('/');
                }
            },
        );
        conn.release();
    });

});

router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

router.post('/ishaveacc', (req, res) => {
    const body = req.body;
    let id = body.id


    getConnection((err, conn) => {
        conn.query(
            `select user_id From sendmoneycreator_user where user_id = '${id}'`,
            function (err, result, fields) {
                if (err) {
                    res.send("문제가 발생했습니다 좀이따 다시 시도해보시고 만약 오류가 지속된다면 관리자에게 문의를 주세요 (Discord : anojds#1234)");
                } else {
                    if (result.length === 0) {
                        res.json({
                            'isNotHaveSameUser': true
                        })
                        return true
                    } else {
                        res.json({
                            'isNotHaveSameUser': false
                        })
                    }
                }
            },
        );
        conn.release();
    });
})

router.get('/islogined', (req, res) => {
    res.json({
        'isLogined': req.session.is_logined
    })
});

router.get('/mypage', (req, res) => {
    if (req.session.is_logined === true) {
        res.redirect("/u/" + req.session.nickname)
    } else {
        res.redirect('/');
    }
});


module.exports = router;