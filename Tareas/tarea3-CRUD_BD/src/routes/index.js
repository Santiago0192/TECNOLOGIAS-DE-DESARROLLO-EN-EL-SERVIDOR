const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const usersRoutes = require('./users');

router.use(express.json());

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);

router.get('', (req, res) => { // localhost:PORT/
    res.send('router works');
})

module.exports = router;