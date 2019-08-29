const router = require('express').Router();
const verifyToken = require('../verifyToken');

router.get('/', verifyToken, (req, res) => {
  res.send(req.user);
  // res.json({posts: {title: 'My first post', description: 'Random data'}});
});

module.exports = router;
