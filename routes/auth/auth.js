const router = require('express').Router();
var util = require('util');
var crypto = require('crypto');
var mysql = require('mysql');
const login_salt = "";
router.post('/login', (req, res) => {
    var post = req.body;
    var id = post.id;
    var password = post.pwd;

    return new Promise(function (resolve, reject) {
        var conn = mysql.createConnection({
            host: process.env.MYSQL_DEV_HOST,
            port: process.env.MYSQL_DEV_PORT,
            user: process.env.MYSQL_DEV_USER,
            password: process.env.MYSQL_DEV_PASSWORD,
            database: process.env.MYSQL_DEV_DATABASE
        });
        conn.connect(function (err) {
            conn.query(
                `select user_id, salt, user_password From sendmoneycreator_user where user_id = '${id}';`,
                function (err, result, fields) {
                    if (result.length > 0) {
                        if (err) throw err;
                        const hashPassword = crypto
                            .createHash('sha512')
                            .update(password + result[0].salt)
                            .digest('hex');
                            console.log('sss')
                        if (id === result[0].user_id && hashPassword === result[0].user_password) {
                            req.session.is_logined = true;
                            req.session.nickname = result[0].user_id;
                            res.redirect('/');
                        } else {
                        }
                    } else {
                        res.send("비밀번호가 일치하지 않습니다")
                    }
                },
            );
        })
    })
})

router.post('/register', (req, res) => {
    const body = req.body;
    let id = body.id
    let pwd = body.pwd
    let email = body.email;
    const salt = crypto.randomBytes(128).toString('base64');
    const hashPassword = crypto
        .createHash('sha512')
        .update(pwd + salt)
        .digest('hex');

    return new Promise(function (resolve, reject) {
        var conn = mysql.createConnection({
            host: process.env.MYSQL_DEV_HOST,
            port: process.env.MYSQL_DEV_PORT,
            user: process.env.MYSQL_DEV_USER,
            password: process.env.MYSQL_DEV_PASSWORD,
            database: process.env.MYSQL_DEV_DATABASE
        });

        conn.query(
            `INSERT INTO sendmoneycreator_user (user_id, salt, user_password,user_email,create_account_time) values ('${id}','${salt}','${hashPassword}','${email}','1')`,
            function (err, rows, fields) {
                if (err) {
                    res.send("문제가 발생했습니다 좀이따 다시 시도해보시고 만약 오류가 지속된다면 관리자에게 문의를 주세요 (Discord : anojds#1234)");
                } else {
                    res.redirect('/');
                }
            },
        );
    })
});

router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});


module.exports = router;