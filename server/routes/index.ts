import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('app', { title: 'Express' });
});

module.exports = router;
