const router = require('express').Router();
const usersController = require('./../controllers/users');
const {roleMiddleware} = require('../middlewares/auth');

router.use(roleMiddleware);
router.get('', usersController.getUsers);
router.get('/:id', usersController.getUsers);
router.post('', usersController.createUser);
router.put('/:id', usersController.putUserByID);
router.delete('/:id', usersController.delUserByID);

module.exports = router;