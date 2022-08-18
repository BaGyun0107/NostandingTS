import express from 'express';

const router = express.Router();
const api = require('../controllers/api');

router.get('/api', api.kakaoDB.get);

module.exports = router;
