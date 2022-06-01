const express = require('express');
const app = express();
const port = process.env.PORT || 2323;
const qrcode = require('qrcode');

require('dotenv').config();
app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/public'));



app.get('/:qr', (req, res) => {
});

app.get('/user/:id', (req, res) => {

    let user_icon_link = '/static/img/test/icon.png';
    var user_header_link = '/static/img/test/sample_header.jpg';
    let username = 'anojds';
    let short_status = '개발자 s지망생 anojds입니다';
    let introduce = '소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다소개글 입니다';
    let tag = '개발자,블로거(였던것)';
    let desired_amount = 2000;
    let kakao_url = 'https://qr.kakaopay.com/FMkgMcV1I';
    let toss_url = 'toss.me/anojds';
    let paypal_url = 'paypal.me/anojds';
    let qr_img_kakao = null, qr_img_toss = null, qr_img_paypal = null;

    function create_qrcode_1() {
        return new Promise(function (resolve, reject) {
            if (kakao_url !== null) {
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
            if (toss_url !== null) {
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
            if (paypal_url !== null) {
                qrcode.toDataURL(paypal_url, function (err, url) {
                    qr_img_paypal = url.toString('utf-8');
                    resolve('paypal_url is ok!');
                })
            } else {
                resolve('paypal_url is empty');
            }
        })
    }

    create_qrcode_1().then(function (data) {
        console.log('qr1', data);
        create_qrcode_2().then(function (data) {
            console.log('qr2', data);
            create_qrcode_3().then(function (data) {
                console.log('qr3', data);
                res.render('profile.ejs', {
                    "user_icon": `${user_icon_link}`,
                    "user_header": `${user_header_link}`,
                    "username": `${username}`,
                    "short_status": `${short_status}`,
                    "introduce": `${introduce}`,
                    "tag": `${tag}`,
                    "desired_amount": `${desired_amount}`,
                    "kakao_url": `${kakao_url}`,
                    "kakao_url_img": `${qr_img_kakao}`,
                    "toss_url": `${toss_url}`,
                    "toss_url_img": `${qr_img_toss}`,
                    "paypal_url": `${paypal_url}`,
                    "paypal_url_img": `${qr_img_paypal}`,
                });
            });
        });
    });

});


app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});