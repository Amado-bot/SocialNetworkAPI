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
const User = model('User', UserSchema);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

module.exports = User;