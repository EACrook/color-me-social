const { User } = require('../models');

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log('error with find all users', err);
            res.status(400).json(err);
        });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log('issue with finding one user', err)
        })
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUserData => {
            
        })
    }
}