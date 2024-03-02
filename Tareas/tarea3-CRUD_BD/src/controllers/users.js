const jwt = require('jsonwebtoken');

const User = require('./../models/user');
const ResponseStatus = require('./../utils/response-status');
const hashPassword = require('./../utils/hash-password');
const responseStatus = require('./../utils/response-status');

class UsersController {
    getUsers(req, res){
        const user_id = req.params.id;

        if (user_id) {
            return User.findById(user_id)
                .then(response => {
                    return res.status(200).send('User Found');
                }
                ).catch(err => {
                    return res.status(503).send('User not found');
                }
            );
        }

        return User.find({})
        .then(users => {
            res.status(200).send(users);
        })
        .catch(err => {
            res.status(503).send('Something went wrong');
        });
    }

    createUser(req, res){
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            status: req.body.status,
            role: req.body.role
        }

        if (data.name && data.email && data.password) {
            return User.create(data)
            .then(response => {
                res.status(201).send('User created successfully');
            }).catch(e => {
                res.status(503).send('Error creating user');
            });
        }

        res.status(ResponseStatus.BAD_REQUEST).send('Missing required fields');
        console.log('User not created due to missing fields'+data.name + data.email + data.password);
    }

    putUserByID(req, res){
        const userId = req.params.id;
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            status: req.body.status,
            role: req.body.role
        }

        if (user_id) {
            return User.findByIdAndUpdate(user_id, data)
                .then(response => {
                    res.status(200).send(response);
                }).catch(err => {
                    return res.status(503).send('Unable to update User');
                });
        }

        res.status(418).send('No id provided');
    }

    delUserByID(req, res){
        const user_id = req.params.id;

        if (user_id) {
            return User.findByIdAndDelete(user_id)
                .then(response => {
                    return res.status(200).send(response);
                }).catch(err => {
                    return res.status(503).send('Unable to delete user');
                });
        }

        res.status(418).send('Missing ID');
    }

    getUserRole(req, res){
        const userRole = req.role;
        res.send ('user role' + userRole);
    }

    signup(req, res){
        //const userId = req.params.id;
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword(req.body.password)
        }

        res.send('Registrar Usuario:' + userReg + ' Key: ' + userKey);

        User.create(data).then(response => {
            const {password, ...resto} = response
            res.send(resto);
        }).catch(e =>{
            res.status(ResponseStatus.BAD_REQUEST).send('Error al crear usuario')
        })
    }
    
    login(req, res){
        User.findOne({
            email: req.body.email,
            password: hashPassword(req.body.password)
        }).then(response =>{
            if (response){
                const data = {
                    id: response._id,
                    name: response.name,
                    email: response.email,
                    role: response.role
                }
                console.log('Response:' + response)
                res.send('User Found: ' + response)
            } else {
                res.status(responseStatus.UNAUTHENTICATED.send('Error al iniciar sesion'))
            }
        }).catch(e =>{
            res.status(ResponseStatus.BAD_REQUEST).send('Error al buscar usuario')
        })
    }
    
};

module.exports = new UsersController();