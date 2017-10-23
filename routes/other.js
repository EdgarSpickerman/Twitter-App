const express = require('express');
const router = express.Router();

router.get('/error/:id', (req, res) => res.redirect('/'));
router.get('/:id', (req, res) => res.redirect('/'));

module.exports = router;