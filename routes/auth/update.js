const router = require('express').Router();
// router.post('/edituser', (req, res) => {
//     const body = req.body;
//     let pwd = body.pwd
//     let email = body.email;


//     return new Promise(function (resolve, reject) {
//         var conn = mysql.createConnection({
//             host: process.env.MYSQL_DEV_HOST,
//             port: process.env.MYSQL_DEV_PORT,
//             user: process.env.MYSQL_DEV_USER,
//             password: process.env.MYSQL_DEV_PASSWORD,
//             database: process.env.MYSQL_DEV_DATABASE
//         });

//         conn.query(
//             `INSERT INTO sendmoneycreator_user (user_id, salt, user_password,user_email,create_account_time) values ('${id}','${salt}','${hashPassword}','${email}','1')`,
//             function (err, rows, fields) {
//                 if (err) {
//                     res.send("문제가 발생했습니다 좀이따 다시 시도해보시고 만약 오류가 지속된다면 관리자에게 문의를 주세요 (Discord : anojds#1234)");
//                 } else {
//                     res.redirect('/');
//                 }
//             },
//         );
//     })
// });

router.post('/edituser', (req, res) => {
    console.log('as')
})


module.exports = router;