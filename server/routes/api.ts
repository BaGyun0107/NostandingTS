const router = require('express').Router();
const api = require('../controllers/api');

router.get('/api', api.kakaoDB.get);

module.exports = router;
