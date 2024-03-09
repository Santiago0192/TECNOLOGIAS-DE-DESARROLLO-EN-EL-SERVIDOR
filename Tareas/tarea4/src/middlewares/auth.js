const responseStatus = require('../utils/response-status');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.query.token;
    if(token && token === '12345'){
        next();
    } else {
        return res.status(responseStatus.UNAUTHENTICATED).send('Unauthenticated');
    }
}

const requireLogin = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(responseStatus.UNAUTHENTICATED).send('Unauthenticated');
        //return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // Agrega la información del usuario al objeto de solicitud
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.status(responseStatus.UNAUTHORIZED).send('Token inválido');
    }
};

function verificarToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado - Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        User.findById(decoded.userId, (err, user) => {
            if (err || !user) {
                return res.status(401).json({ message: 'Acceso no autorizado - Usuario no encontrado' });
            }

            // Puedes almacenar la información del usuario en req.user para su uso posterior
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: 'Acceso no autorizado - Token no válido' });
    }
}

module.exports = {authMiddleware,requireLogin,verificarToken};