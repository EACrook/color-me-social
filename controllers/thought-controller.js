const { Thought, User } = require('../models');

const thoughtController = {
    getThought({ params, body}, res) {
        console.log('WE HIT GET THOUGHT!!!!')
        Thought.find({})
        .then(dbUserData => {
            res.json(dbUserData)
        })
        .catch(err => {
            console.log('err', err)
        })
        
    },

    addThought({ params, body }, res) {
        console.log('body', body);
        Thought.create(body)
        .then(({ _id }) => {
            console.log('_id', _id)
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData); 
        })
        .catch(err => res.json(err));
    },

    addReaction({ params, body }, res) {
        console.log('Body!!! about to update thought!!', body)
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reaction: body } },
            { new: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            console.log('Just updated in .then!', dbUserData)
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if(!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { users: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.commentId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    }
}

module.exports = thoughtController;