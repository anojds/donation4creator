const router = require('express').Router();
var request = require('request');
var crypto = require('crypto');
const getConnection = require('./db.js');
const ejs = require('ejs');
const path = require('path');
var appDir = path.dirname(require.main.filename);
const nodemailer = require('nodemailer');


router.post('/login', (req, res) => {
    var post = req.body;
    var id = post.id;
    var pwd = post.pwd;

    getConnection((err, conn) => {
        conn.query(
            `select user_id, user_email, salt, user_password,mail_is_certification From sendmoneycreator_user where user_id = '${id}';`,
            function (err, result, fields) {
                if (result.length > 0) {
                    if(result[0].mail_is_certification !== 0) {
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
                        res.render('mailVerficationLogin.ejs', {
                            "id": `${result[0].user_id}`,
                            "mail": `${result[0].user_email}`,
                        })
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
    let mail_verfication_salt = crypto.randomBytes(10).toString('hex');
    let base64_encoded_link = Buffer.from(id + "/" + mail_verfication_salt, "utf8").toString('base64');

    getConnection((err,conn) => {
        conn.query(
            `INSERT INTO sendmoneycreator_user (user_id, salt, user_password,user_email,create_account_time,mail_certification_id) values ('${id}','${salt}','${hashPassword}','${email}','1','${mail_verfication_salt}')`,
            async function (err, result, fields) {
                if (err) {
                    res.send("문제가 발생했습니다 좀이따 다시 시도해보시고 만약 오류가 지속된다면 관리자에게 문의를 주세요 (Discord : anojds#1234)");
                } else {
                    ejs.renderFile(appDir + '/views/authMail.ejs', { id: base64_encoded_link }, function (err, data) {
                        if (err) { console.log(err) }
                        emailTemplete = data;
                    });
                    let transporter = nodemailer.createTransport({
                        service: "gmail",
                        host: process.env.mail_host,
                        port: process.env.mail_port,
                        secureConnection: false,
                        auth: {
                            user: process.env.mail_id2,
                            pass: process.env.mail_password2,
                        },
                        tls: {
                            ciphers: 'SSLv3'
                        }
                    });
                    let mailOptions = await transporter.sendMail({
                        from: '"sendmoney4creator👻" <sendmoney4creator@gmail.com>',
                        // to: 'sendmoney4creator@naver.com',
                        to: 'appturbo102@gmail.com',
                        subject: '회원가입을 위한 인증번호를 입력해주세요.',
                        text: "Hello world?",
                        html: emailTemplete,
                    });                
                    transporter.sendMail(mailOptions, function (err, info) {
                        if (err) {
                            res.json({ msg: 'err' });
                        } else {
                            res.json({ msg: 'sucess' });
                        }
                        transporter.close()
                    });

                    res.cookie('key1', id, {
                        maxAge: 10000
                    })
                    res.cookie('key2', email, {
                        maxAge: 10000
                    })
                    res.redirect('/mail/send');
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