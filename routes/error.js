//variables and modules
const express = require('express');
const router = express.Router();

//error route
// if errors are really present then render the error page
//if errors are not really present then render the 404 page
router.get('/error', (req, res) => {
    if (res.locals.error) {
        res.render('error');
    } else {
        let err = new Error('Page Not Found');
        err.status = 404;
        res.locals.error = err.message;
        res.locals.message = err.stack;
        res.locals.status = err.status
        res.render('error')
    }
});

module.exports = router;