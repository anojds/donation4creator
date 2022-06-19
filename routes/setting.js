const router = require('express').Router();
const getConnection = require('./auth/db.js');

function authIsLogied(req) {
    if (req.session.is_logined) {
        return true;
    } else {
        return false;
    }
}


router.get('/', (req, res) => {
    if (req.session.is_logined) {
        let user_icon_link, user_header_link, username, short_status, create_acc_time, introduce, tag, desired_amount, kakao_url, toss_url, paypal_url, qr_img_kakao = "", qr_img_toss = "", qr_img_paypal = "";

        getConnection((err, conn) => {
            conn.query(`select user_id, create_account_time, user_icon_link, user_header_link, short_description, user_description, tag, desired_amount, kakao_payment_url, toss_payment_url, paypal_payment_url FROM sendmoneycreator_user WHERE user_id = '${req.session.nickname}';`,
                function (err, result, fields) {
                    if (err) throw err;
                    user_icon_link = '/static/img/test/icon.png';
                    user_header_link = '/static/img/test/sample_header.jpg';
                    username = `${req.session.nickname}`;
                    short_status = result[0].short_description;
                    create_acc_time = result[0].create_account_time;
                    introduce = result[0].user_description;
                    tag = result[0].tag;
                    desired_amount = result[0].desired_amount;
                    kakao_url = result[0].kakao_payment_url;
                    toss_url = result[0].toss_payment_url;
                    paypal_url = result[0].paypal_payment_url;
                    return res.render('setting.ejs', {
                        "user_icon": `${user_icon_link}`,
                        "user_header": `${user_header_link}`,
                        "username": `${username}`,
                        "short_status": `${short_status}`,
                        "create_acc_time": `${create_acc_time}`,
                        "introduce": `${introduce}`,
                        "tag": `${tag}`,
                        "desired_amount": `${desired_amount}`,
                        "kakao_url": `${kakao_url}`,
                        "kakao_url_img": `${qr_img_kakao}`,
                        "toss_url": `${toss_url}`,
                        "toss_url_img": `${qr_img_toss}`,
                        "paypal_url": `${paypal_url}`,
                        "paypal_url_img": `${qr_img_paypal}`,
                        "isLogined": `${authIsLogied(req)}`
                    });
                });
            conn.release();

        });
    } else {
        res.redirect('/login')
    }
});

router.get('/leave', (req, res) => {
    if (req.session.is_logined) {
        res.render('leaveService.ejs');
    } else {
        res.redirect('/login');
    }
});


module.exports = router;