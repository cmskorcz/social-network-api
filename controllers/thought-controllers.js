const { User, Thought } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err))
    },
    getThoughtById({ params }, res) {
        Thought.findById(params.thoughtId)
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Unable to locate thought' })
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err))
    },
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ username, _id }) => {
                return User.findOneAndUpdate(
                    { username: username },
                    { $push: { thoughts: _id }},
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Unable to locate user' })
                }

                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    },
    updateThought({ params, body }, res) {
        Thought.findByIdAndUpdate(params.thoughtId, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Unable to locate thought' })
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err))
    },
    deleteThought({ params }, res) {
        Thought.findByIdAndDelete(params.thoughtId)
            .then(deletedThought => {
                if (!deletedThought) {
                    res.status(404).json({ message: 'Unable to locate thought' })
                    return;
                }
                return User.findOneAndUpdate(
                    { username: deletedThought.username },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Unable to locate user' })
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    },
    createReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(
            params.thoughtId,
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Unable to locate thought' })
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err))
    },
    deleteReaction({ params }, res) {
        Thought.findByIdAndUpdate(
            params.thoughtId,
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Unable to locate thought' })
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err))
    }
}

module.exports = thoughtController;