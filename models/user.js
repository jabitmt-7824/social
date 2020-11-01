const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema for user
const userSchema = new Schema({
     name: {
         type: String,
         required: true
     },
     posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Follow"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Follow"
    }]
},
    {
        timestamps: true
    }
);

// create user model
const User = mongoose.model("User", userSchema);

module.exports = User;