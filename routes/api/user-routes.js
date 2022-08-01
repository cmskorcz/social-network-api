const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controllers');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;