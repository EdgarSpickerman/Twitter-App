//modules
const express = require('express');
const bodyParser = require('body-parser');
const home = require('../routes/home');
const error = require('../routes/error');


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
        app.use((err, req, res, next) => {
            app.locals.error = { message: err, stack: err.stack };
            res.redirect('/error')
        })

    //listening Port
        app.listen(port, () => console.log(consoleMessage));