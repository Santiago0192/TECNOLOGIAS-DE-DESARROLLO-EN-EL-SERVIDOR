const router = require('express').Router();
const usersController = require('./../controllers/users');
const {roleValid} = require('../middleware/auth');
//const authMiddleware = require('../middlewares/auth');

//router.use(authMiddleware);
router.put('/:id', roleValid, usersController.putUserByID);
router.post('', roleValid, usersController.createUser);
router.get('', roleValid, usersController.getUsers);
router.get('/:id', roleValid, usersController.getUserById);
router.delete('/users/:id', roleValid, usersController.delUserByID);

module.exports = router;