// 모듈 로드
const express = require('express');
const port = process.env.PORT || 2323;
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var bodyParser = require('body-parser')

const app = express();

require('dotenv').config();
app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
    store : new MySQLStore({
        host: process.env.MYSQL_DEV_HOST,
        port: process.env.MYSQL_DEV_PORT,
        user: process.env.MYSQL_DEV_USER,
        password: process.env.MYSQL_DEV_PASSWORD,
        database: process.env.MYSQL_DEV_DATABASE
    })
}));

const auth = require('./routes/auth/auth.js');
app.use('/auth', auth);

const update = require('./routes/auth/update.js');
app.use('/auth', update);

const login_sigin_ejs = require('./routes/login_signin.js');
app.use('/', login_sigin_ejs);

const setting_routes = require('./routes/setting.js');
app.use('/setting', setting_routes);

const profile_routes = require('./routes/profile.js');
app.use('/u', profile_routes);

const iframe_routes = require('./routes/iframe.js');
app.use('/u', iframe_routes);


function authIsLogied(req) {
    if(req.session.is_logined) {
        return true;
    } else {
        return false;
    }
}

app.get('/', (req, res) => {
    res.render('main.ejs', {
        "is_logined": `${authIsLogied(req)}`,
        "is_logineds": `${req.session.is_logined}`
    })
});

app.use((req, res, next) => {
    res.status(404).render('404.ejs')
  });

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});
