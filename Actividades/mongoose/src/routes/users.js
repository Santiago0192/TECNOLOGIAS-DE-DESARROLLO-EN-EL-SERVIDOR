const router = require('express').Router();
const usersController = require('./../controllers/users');
const {roleMiddleware} = require('../middlewares/auth');

router.use(roleMiddleware);
router.put('/:id', usersController.putUserByID);
router.post('/admin', usersController.createUser);
router.get('', usersController.getUsers);
router.get('/:id', usersController.getUserById);
router.delete('/:id', usersController.delUserByID);

module.exports = router;