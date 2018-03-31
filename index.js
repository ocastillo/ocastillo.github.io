const appConfig = {
    session: {
        secret: process.env.sessionSecret || 'asdfhalkjhasdfj'
    }
};

require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3002;
const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const app = express();
const package = require('./package.json');
const homeController = require('./app/controllers/home');

const forceSsl = (req, res, next) => {
    if (env === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
}

app.use(forceSsl);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use('/static', express.static('./app/client/public'));
app.use('/.well-known', express.static('./app/client/public/.well-known'));

app.set('views', __dirname + '/app/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// Setup Locals
app.use((req, res, next) => {
    //app.locals.userInfo = getUserInfo(req.user);
    next();
});

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/home', homeController.index);
app.post('/contact', homeController.apiContact);


app.listen(port || 3000, function () {
  console.log(package.name + ' v' + package.version + ' listening on port ' + port);
});
