const Thought = require('../models/Thought')
const User = require('../models/User')

const thoughtController = {
    // get all thoughts

    getThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log("There was an error. " + err);
                res.status(400).json(err)
            });
    },

    // get a single thought by its _id

    getThoughtsById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // post to create a new thought, push to associated user's thoughts array field
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));
    },
    // put to update a thought by its _id

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this ID. ' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete to remove a thought by its _id

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'There is no Thought with this ID.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },



    // post to create a reaction stored in single thought's reactions array
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(500).json({ message: 'No thought found with this ID' });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },


    // delete to pull and remove a reaction by the reaction's reactionID field
    removeReaction({ params }, res) {
        Thought.findOne(
            { _id: params.thoughtId },

        )
            .then(dbThoughtData => {
                dbThoughtData.reactions.pull(params.reactionId)
                return dbThoughtData.save();
            })

            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }

}

module.exports = thoughtController