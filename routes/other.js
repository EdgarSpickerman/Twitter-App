//redirects every page not defined by the router to /error 
const express = require('express');
const router = express.Router();
router.get('/error/:id', (req, res) => res.redirect('/error'));
router.get('/:id', (req, res) => res.redirect('/error'));

module.exports = router;