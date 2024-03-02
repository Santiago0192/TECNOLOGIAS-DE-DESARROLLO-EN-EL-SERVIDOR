const router = require('express').Router();
const authRoutes = require('./auth');
const usersRoutes = require('./users');

router.get('', (req, res) => { // localhost:PORT/
    res.send('router works');
})

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);

module.exports = router;