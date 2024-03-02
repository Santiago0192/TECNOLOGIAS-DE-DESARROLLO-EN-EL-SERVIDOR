const jwt = require('jsonwebtoken');

const User = require('./../models/user');
const ResponseStatus = require('./../utils/response-status');
const hashPassword = require('./../utils/hash-password');
const responseStatus = require('./../utils/response-status');

class UsersController {
    getUsers(req, res){
        const user = new User();
        user.find().then(response => {
            res.send(response);
        }).catch(e => {
            res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong');
        });
        console.log('User request');
    }

    createUser(req, res){
        const newUser = req.body;
        const user = new User();

        user.insert(newUser);

        res.status(ResponseStatus.SUCCESS).send('User created successfully');
        console.log('User Created');
    }

    getUserById(req, res){
        const userId = req.params.id;
        const user = new User();

        user.findUserById(userId).then(user => {
            if (user) {
                res.send(JSON.stringify(user));
            } else {
                res.status(ResponseStatus.NOT_FOUND).send('User not found');
            }
        }).catch(error => {
            console.error('Error fetching user by ID:', error);
            res.status(500).send('Something went wrong');
        });
    }

    putUserByID(req, res){
        const userId = req.params.id;
        const putUser = req.body;

        const user = new User();

        user.findUserById(userId).then(putUser => {
            if (putUser) {
                res.send('Put User');
            } else {
                res.status(ResponseStatus.NOT_FOUND).send('User not found');
            }
        }).catch(error => {
            console.error('Error updating user:', error);
            res.status(500).send('Internal Server Error');
        });
    }

    delUserByID(req, res){
        const userDelete = req.params.id;
        const user = new User();

        user.findUserById(userDelete).then(user => {
            if (user) {
                res.send('Delete user with ID: ' + userDelete);
                //res.send(user.delete(userDelete));
            } else {
                res.status(ResponseStatus.NOT_FOUND).send('User not found');
            }
        }).catch(error => {
            console.error('Error fetching user by ID:', error);
            res.status(500).send('Something went wrong');
        });

        //res.send ('user role' + userRole);
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