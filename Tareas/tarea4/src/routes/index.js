require('dotenv').config();

const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const newsRoutes = require('./news');

router.use(express.json());
//const path = require('path')
//const axios = require('axios');

//Main Page
router.get('',(req,res) => {
    res.render('home', {
        title: 'News'
    });
});

//LogIn & SignIn
router.use('/auth',authRoutes);

// Noticias
router.use('/noticias',newsRoutes);

module.exports = router;