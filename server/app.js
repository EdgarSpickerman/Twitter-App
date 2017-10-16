//modules
const express = require('express');
const bodyParser = require('body-parser');
const home = require('../routes/home');
const error = require('../routes/home');


//variables
const app = express();
const port = process.env.PORT || 3000;
const consoleMessage = `Twitter Application running on localhost:${port}`;


//Setting up the application
    //settings view engine, req/res parsing and serving of static assets
        app.set('view engine', 'pug');
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use('/static', express.static('public'));

    //routes
        app.use(home);
        app.use(error);

    //listening Port
        app.listen(port, () => consoleMessage);