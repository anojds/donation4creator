const express = require('express');
const router = express.Router();
const getConnection = require('./db.js');

router.get('/mail/send', async (req, res) => {
    res.render('mailVerfication.ejs', { "id": `${req.cookies.key1}`, "mail": `${req.cookies.key2}` });
    try {
        res.cookie('key1', '', { maxAge: 0 });
        res.cookie('key2', '', { maxAge: 0 });
    } catch (e) {}
});

router.get('/acc/:id', async (req, res) => {
    var base64DecodedText = Buffer.from(req.params.id, "base64").toString('utf8');
    base64DecodedText = base64DecodedText.split("/")
    getConnection((err, conn) => {
        conn.query(
            `SELECT user_id, user_email, mail_certification_id FROM sendmoneycreator_user WHERE user_id='${base64DecodedText[0]}';`,
            function (err, result, fields) {
                if (result.length > 0) {
                    if (err) throw err;
                    if (result[0].mail_certification_id === base64DecodedText[1]) {
                        conn.query(
                            `UPDATE sendmoneycreator_user SET mail_is_certification = '1' WHERE user_id = '${result[0].user_id}';`,
                            function (err, results, fields) {
                                res.render('mailVerficationOkay.ejs', {
                                    "id": `${result[0].user_id}`,
                                    "mail": `${result[0].user_email}`,
                                })
                            },
                        );
                    } else {
                        res.send('인증 url이 맞지 않습니다');
                    }
                } else {
                    res.send('인증 url이 맞지 않습니다');
                }
            },
        );
        conn.release();
    });
});

module.exports = router;