const express = require('express');
const router = express.Router();

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