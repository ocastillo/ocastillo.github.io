const appConfig = {
    session: {
        secret: process.env.sessionSecret || 'asdfhalkjhasdfj'
    }
};

require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3030;

const fs = require('fs');
const path = require('path');
const compression = require('compression');
const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const app = express();
const package = require('./package.json');

const forceSsl = (req, res, next) => {
    if (env === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
}

app.use(forceSsl);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use('/public', express.static('./public'));
app.use('/.well-known', express.static('./app/client/public/.well-known'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port || 3000, function () {
  console.log(package.name + ' v' + package.version + ' listening on port ' + port);
});
