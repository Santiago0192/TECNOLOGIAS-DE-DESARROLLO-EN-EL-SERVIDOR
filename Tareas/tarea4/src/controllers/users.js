const jwt = require('jsonwebtoken');

const User = require('./../models/user');
const hashPassword = require('./../utils/hash-password');
const responseStatus = require('./../utils/response-status');

require('dotenv').config();

class UsersController {
    signup(req, res){
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(data).then(response => {
            const {password, ...resto} = response
            const token = jwt.sign({ userId: response._id, email: response.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
            response.token = token;
            response.save();
            
            res.status(201).json({
                status: 'success',
                message: 'Usuario creado exitosamente',
                user: resto,
                token: token
            });
        }).catch(e =>{
            res.status(responseStatus.BAD_REQUEST).send('Error al crear usuario')
        })
    }
    
    login(req, res){
        
        const { email, password } = req.body;

        User.findOne({email}).then(response =>{
            if (response && (password == response.password)){
                const data = {
                    id: response._id,
                    name: response.name,
                    email: response.email
                }
                const token = jwt.sign({ userId: response._id, email: response.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
                res.status(200).json({ token });
            } else {
                res.status(responseStatus.UNAUTHENTICATED.send('Error al iniciar sesion'))
            }
        }).catch(e =>{
            res.status(responseStatus.BAD_REQUEST).send('Error al buscar usuario')
        })
    }
};

module.exports = new UsersController();