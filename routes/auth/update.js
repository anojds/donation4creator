const router = require('express').Router();
const getConnection = require('./db.js');

function isUndefined(text) {
    if (text === " ") {
        return true;
    } else {
        if (text === "") {
            return true;
        } else {
            if (typeof text === undefined) {
                return true;
            } else {
                return false;
            };
        }
    }
}

router.post('/edituser', (req, res) => {
    var tag, kakao_link, toss_link, paypal_link, s_description, description, desired_amount
    var post = req.body;


    isUndefined(post.tag) ? tag = "0" : tag = post.tag;
    isUndefined(post.kakao_link) ? kakao_link = "0" : kakao_link = "https://qr.kakaopay.com/" + post.kakao_link;
    isUndefined(post.toss_link) ? toss_link = "0" : toss_link = "https://toss.me/" + post.toss_link;
    isUndefined(post.paypal_link) ? paypal_link = "0" : paypal_link = "https://www.paypal.me/" + post.paypal_link;
    isUndefined(post.s_description) ? s_description = "0" : s_description = post.s_description;
    isUndefined(post.desired_amount) ? desired_amount = "0" : desired_amount = post.desired_amount;
    s_description.replace(/"/gi, '&quot;')
    s_description.replace(/'/gi, '&quot;')
    isUndefined(post.description) ? description = "0" : description = post.description;
    description.replace(/"/gi, '&quot;')
    description.replace(/'/gi, '&quot;')

    var id = req.session.nickname;


    getConnection((err,conn) => {
        conn.query(
            `UPDATE sendmoneycreator_user SET tag = '${tag}', kakao_payment_url = '${kakao_link}', toss_payment_url = '${toss_link}', paypal_payment_url = '${paypal_link}', short_description = '${s_description}', user_description = '${description}', desired_amount = '${desired_amount}' WHERE user_id = '${id}';`,
            function (err, result, fields) {
                if (err) {
                    return res.json({
                        'isOkay': err
                    })
                };
            }
        );
        conn.release();
    });
    return res.json({
        'isOkay': true
    })
})


module.exports = router;
