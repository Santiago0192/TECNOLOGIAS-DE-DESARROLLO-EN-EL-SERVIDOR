const usersController = require('./../controllers/users');

const router = require('express').Router();

router.get('', (req, res) => { // localhost:PORT/auth
    res.send('auth works');
});

router.get('/login',(req, res) => {
    res.render('login',{}) 
});

router.get('/signup',(req, res) => {
    res.render('signup',{}) 
});

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);

module.exports = router;