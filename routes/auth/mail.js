const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
var appDir = path.dirname(require.main.filename);


router.get('/mail', async(req, res) => {
    let authNum = Math.floor(Math.random()*(999999-111111+1)) + 111111;
    let emailTemplete;
    ejs.renderFile(appDir+'/views/authMail.ejs', {authCode : authNum}, function (err, data) {
      if(err){console.log(err)}
      emailTemplete = data;
    });

    let transporter = nodemailer.createTransport({
        service: "Naver",
        host: process.env.mail_host,
        port: process.env.mail_port,
        secureConnection: false,
        auth: {
            user: process.env.mail_id,
            pass: process.env.mail_password,
        },
        tls: {
            ciphers:'SSLv3'
        }
    });

    let mailOptions = await transporter.sendMail({
        from: "\"Fred Foo 👻\" <sendmoney4creator@naver.com>",
        to: "appturbo102@gmail.com",
        subject: '회원가입을 위한 인증번호를 입력해주세요.',
        html: emailTemplete,
    });


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        console.log("Finish sending email : " + info);
        res.send(authNum);
        transporter.close()
    });
});

module.exports=router;