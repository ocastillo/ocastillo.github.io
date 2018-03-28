const appConfig = {
    session: {
        secret: process.env.sessionSecret || 'asdfhalkjhasdfj'
    }
};

const port = process.env.port || 3002;
const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const app = express();
const package = require('./package.json');
const homeController = require('./app/controllers/home');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use('/static', express.static('./app/client/public'));

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


app.listen(port || 3000, function () {
  console.log(package.name + ' v' + package.version + ' listening on port ' + port);
});
