const Post = require("../models/post");
const User = require("../models/user");

// create post
module.exports.createPost = async function (req, res) {
    try {
        // check user exist
        let user = await User.findOne({ name: req.params.username })
        if (user) {
            // if user exist, create a new post
            let post = await Post.create({caption:req.body.caption, imageUrl:req.body.imageUrl, upvotes:0, createdUser:req.params.username});
            await user.posts.push(post);
            await user.save();
            return res.status(201).json({
                "postId": post.postId,
                "imageUrl": post.imageUrl,
                "caption": post.caption,
                "upvotes": post.upvotes
            });
        }
        else {
            // if user does not exist
            return res.status(400).json({
                status: "failure",
                reason: "This user not exist"
            });
        }
    } catch(error) {
        return res.status(400).json({
            status: "failure",
            reason: `Internal server error ${error}`
        });
    }
}

module.exports.allPosts = async function (req, res) {
    try {
        // check user exist
        let user = await User.findOne({ name: req.params.usernameA }).
        populate({
            path: "posts",
            select:"postId caption imageUrl upvotes -_id"
        })
        if(user)
        {
            // if user exist, return all post of the user
            return res.status(201).json({
                posts : user.posts
            });

        } else {
            // if user does not exist
            return res.status(400).json({
                status: "failure",
                reason: `This user not exist`
            });
        }
    } catch(error) {
        return res.status(400).json({
            status: "failure",
            reason: `Internal server error ${error}`
        });
    }
}