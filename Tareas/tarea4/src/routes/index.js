require('dotenv').config();

const router = require('express').Router();
const path = require('path')

const axios = require('axios');

router.get('',(req,res) => {
    res.render('home', {
        title: 'APP NAME'
    });
});

// Noticias
router.get('/noticias',(req, res) => {
    const filtro = req.query.filter;
    const apiKey = process.env.NEWS_API_KEY;

    var url = `https://newsapi.org/v2/everything?q=${filtro}&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            //console.log(data); // Imprime los datos de la respuesta JSON
            res.render('news',{
                articles: data.articles,
                filtro: filtro
            });    // Devuelve los datos como respuesta HTTP
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
            res.status(500).json({ error: 'Error al obtener noticias' });
        });
})

module.exports = router;