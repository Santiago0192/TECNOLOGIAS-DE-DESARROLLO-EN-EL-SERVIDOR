const router = require('express').Router();
const usersController = require('./../controllers/users');
const { authMiddleware, roleMiddleware } = require('./../middlewares/auth');

//router.use(authMiddleware);
router.put('/:id', authMiddleware, roleMiddleware, usersController.putUserByID);
router.post('', authMiddleware, roleMiddleware, usersController.createUser);
router.get('', authMiddleware, roleMiddleware, usersController.getUsers);
router.get('/:id', authMiddleware, roleMiddleware, usersController.getUserById);
router.delete('/:id', authMiddleware, roleMiddleware, usersController.delUserByID);

module.exports = router;