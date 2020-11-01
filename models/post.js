const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const db = require("../config/mongoose");
autoIncrement.initialize(db);
// schema for doctor
const postSchema = new Schema({
     caption: {
         type: String,
         required: true
     },
     imageUrl: {
         type: String,
         required: true
     },
     upvotes: {
         type: Number
     },
     createdUser: {
        type: String,
        required : true    
     }
},
    {
        timestamps: true
    }
);
postSchema.plugin(autoIncrement.plugin, {
    model: 'Post',
    field: 'postId',
    startAt: 1000,
    incrementBy: 1
});
// create post model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
