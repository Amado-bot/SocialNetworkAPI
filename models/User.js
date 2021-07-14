// starting code
const { Schema, model, Types } = require('mongoose');


const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is Required.',
        trim: true
    },
    email: {
        type: String,
        required: 'Email is Required.',
        unique: true,
        match: [/.+@.+\..+/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
    // this is very possibly incorrect, will test later
})

const User = model('User', UserSchema)

module.exports = User;