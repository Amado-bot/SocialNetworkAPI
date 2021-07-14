// starting code
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')


const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: 'Username is Required.'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // add getter method to format timestamp
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    })

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'You must enter your thought.',
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // add getter method to format timestamp
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: 'Username is Required.'
    },
    reactions: [ReactionSchema]

},
    {
        toJSON: {
            virtuals: true,
            getters: true // need to set up getters still
        },
        id: false
    }
)

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought