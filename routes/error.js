const express = require('express');
const router = express.Router();

router.get('/error', (req, res) => {
    if (res.locals.error) {
        res.render('error');
    } else {
        res.redirect('/');
    }
});

module.exports = router;