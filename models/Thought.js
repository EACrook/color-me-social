const {
    Schema,
    model,
    Types
} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max: [280, 'You are over the amount of characters']
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    }
})

const ThoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: [true, 'Text is required'],
        min: [1, 'You must write at least one character!'],
        max: [280, 'You need less characters!']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type:  Schema.Types.ObjectId,
        ref: 'User'
    },
    reaction: [ReactionSchema]

},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
})

ThoughtSchema.virtual('reactCount').get(function() {
    return this.reaction.length;
})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought;