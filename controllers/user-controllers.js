const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            // .populate({
            //     path: 'users',
            //     select: '-__v'
            // })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Unable to find user' })
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },
    updateUser({ params, body }, res) {
        User.findByIdAndUpdate(params.userId, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Unable to locate user' })
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    },
    deleteUser({ params }, res) {
        User.findByIdAndDelete(params.userId)
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Unable to locate user' })
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err)) 
    }
}

module.exports = userController;