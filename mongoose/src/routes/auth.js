const usersController = require('./../controllers/users');

const router = require('express').Router();

router.get('', (req, res) => { // localhost:PORT/auth
    res.send('auth works');
});

router.get('/test', (req, res) => { // localhost:PORT/auth/test
    res.send('test auth works');
});

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);

module.exports = router;