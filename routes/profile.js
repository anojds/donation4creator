const router = require('express').Router();
const getConnection = require('./auth/db.js');
const qrcode = require('qrcode');

function authIsLogied(req) {
    if(req.session.is_logined) {
        return true;
    } else {
        return false;
    }
}


router.get('/:id', (req, res) => {
    let user_icon_link,user_header_link,username,short_status,create_acc_time,introduce,tag,desired_amount,kakao_url,toss_url,isdev,paypal_url,qr_img_kakao = "", qr_img_toss = "", qr_img_paypal = "";

    function handleMysqlRequest() {
        return new Promise(function (resolve, reject) {

            getConnection((err, conn) => {
                conn.query(
                    `select user_id, create_account_time, user_icon_link, user_header_link, short_description, user_description, tag, desired_amount, kakao_payment_url, toss_payment_url, paypal_payment_url, isDev FROM sendmoneycreator_user WHERE user_id = '${req.params.id}';`, function (err, result, fields) {
                        if (result.length > 0) {
                            user_icon_link = '/static/img/test/icon.png';
                            user_header_link = '/static/img/test/sample_header.jpg';
                            username = `${req.params.id}`;
                            short_status = result[0].short_description;
                            create_acc_time = result[0].create_account_time;
                            introduce = result[0].user_description;
                            tag = result[0].tag
                            desired_amount = result[0].desired_amount;
                            kakao_url = result[0].kakao_payment_url;
                            toss_url = result[0].toss_payment_url;
                            paypal_url = result[0].paypal_payment_url;
                            isdev = result[0].isDev;
                            resolve('mysql data handle is ended!');
                        } else {
                            res.render('404.ejs')
                        }
                    }
                );
                conn.release();
              });
        });
    }
    function create_qrcode_1() {
        return new Promise(function (resolve, reject) {
            if (kakao_url !== "" && kakao_url !== "0") {
                qrcode.toDataURL(kakao_url, function (err, url) {
                    qr_img_kakao = url.toString('utf-8');
                    resolve('kakao_url is ok!');
                })
            } else {
                resolve('kakao_url is empty');
            }
        })
    };

    function create_qrcode_2() {
        return new Promise(function (resolve, reject) {
            if (toss_url !== "" && toss_url !== "0") {
                qrcode.toDataURL(toss_url, function (err, url) {
                    qr_img_toss = url.toString('utf-8');
                    resolve('toss_url is ok!');
                })
            } else {
                resolve('toss_url is empty');
            }
        })
    }

    function create_qrcode_3() {
        return new Promise(function (resolve, reject) {
            if (paypal_url !== "" && paypal_url !== "0") {
                qrcode.toDataURL(paypal_url, function (err, url) {
                    qr_img_paypal = url.toString('utf-8');
                    resolve('paypal_url is ok!');
                })
            } else {
                resolve('paypal_url is empty');
            }
        })
    }

    handleMysqlRequest().then(function (data) {
        create_qrcode_1().then(function (data) {
            create_qrcode_2().then(function (data) {
                create_qrcode_3().then(function (data) {
                    res.render('profile.ejs', {
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
                        "isLogined": `${authIsLogied(req)}`,
                        "isdev": `${isdev}`
                    });
                });
            });
        });
    });
});


module.exports = router;