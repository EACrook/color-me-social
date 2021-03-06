const {
    Schema,
    model
} = require('mongoose');

const UserSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required!']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]

});

const User = model('User', UserSchema)

module.exports = User;