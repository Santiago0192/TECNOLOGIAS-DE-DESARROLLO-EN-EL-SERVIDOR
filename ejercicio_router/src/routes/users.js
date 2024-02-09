const router = require('express').Router();
const usersController = require('./../controllers/users');
//const authMiddleware = require('../middlewares/auth');

//router.use(authMiddleware);
router.put('/:id', usersController.putUserByID);
router.post('', usersController.createUser);
router.get('', usersController.getUsers);
router.get('/:id', usersController.getUserById);
router.delete('/users/:id', usersController.delUserByID);

module.exports = router;