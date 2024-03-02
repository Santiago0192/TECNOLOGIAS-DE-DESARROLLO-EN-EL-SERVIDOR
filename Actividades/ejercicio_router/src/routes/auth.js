const router = require('express').Router();

router.get('', (req, res) => { // localhost:PORT/auth
    res.send('auth works');
});

router.get('/test', (req, res) => { // localhost:PORT/auth/test
    res.send('test auth works');
})

module.exports = router;