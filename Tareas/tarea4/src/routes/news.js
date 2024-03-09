const jwt = require('jsonwebtoken');
const router = require('express').Router();
const {authMiddleware,requireLogin,verificarToken} = require('../middlewares/auth');
require('dotenv').config();

const User = require('../models/user');

//router.use(verificarToken);

router.get('/:token',(req, res) => {
    const token = req.params.token;

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }

        // Decodificar el token y obtener el userId
        const userId = decoded.userId;

        // Buscar el usuario en la base de datos por userId y token
        User.findOne({token: token })
            .then(user => {

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
                .catch(error => {
                    console.error('Error al buscar usuario:', error);
                    res.status(500).json({ error: 'Error al buscar usuario' });
                });
        });
    });

module.exports = router;