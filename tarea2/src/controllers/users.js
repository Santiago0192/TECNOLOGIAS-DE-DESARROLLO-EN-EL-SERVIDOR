const User = require('./../models/user');
const ResponseStatus = require('./../utils/response-status');

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
                // Estuve probando pero no se como hacer o donde guardar los cambios
            } else {
                res.status(404).send('User not found');
            }
        }).catch(error => {
            console.error('Error updating user:', error);
            res.status(500).send('Internal Server Error');
        });
    }

    delUserByID(req, res){
        const userDelete = req.params.id;
        const user = new User();

        //user.findUserById(userDelete).then(userFound => {
            if (userDelete) {
                res.send('Delete user with ID: ' + userDelete);
                // Estuve probando pero no se como hacer o donde guardar los cambios
                //res.send(user.delete(userDelete));
            } else {
                res.status(ResponseStatus.NOT_FOUND).send('User not found');
            }
        /*}).catch(error => {
            console.error('Error fetching user by ID:', error);
            res.status(500).send('Something went wrong');
        });*/

        //res.send ('user role' + userRole);
    }

    getUserRole(req, res){
        const userRole = req.role;
        res.send ('user role' + userRole);
    }

};

module.exports = new UsersController();