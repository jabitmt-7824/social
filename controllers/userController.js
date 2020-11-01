const User = require("../models/user");
const Post = require("../models/post");

// create user account
module.exports.createUser = async function (req, res) {
    try {
        // check user already exist 
        let alreadyUser = await User.findOne({ name: req.body.name })
        if (alreadyUser) {
            // if user already exist
            return res.status(400).json({
                status: "failure",
                reason: "This user-name already exist"
            });
        }
        else {
            // if user does not exist, create a new user
            User.create(req.body);
            return res.status(201).json({
                status: "success"
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "failure",
            reason: `Internal server error ${error}`
        });
    }
}

// fetch profile of a user
module.exports.profile = async function (req, res) {
    try {
        // check user exist
        let user = await User.findOne({ name: req.params.username })
            .populate({
                path: "posts",
                select: "postId caption imageUrl upvotes -_id"
            })
            .populate({
                path: "followers",
                select: "fromUser -_id"
            })
            .populate({
                path: "following",
                select: "toUser -_id"
            });
        if (user) {
            // if user exist
            let arrFollowers = [], arrFollowing = []
            // set an array of followers
            user.followers.forEach(follow => {
                arrFollowers.push(follow.fromUser)
            });
            // set an array of following
            user.following.forEach(follow => {
                arrFollowing.push(follow.toUser)
            });
            return res.status(200).json({
                "username": user.name,
                "followers": arrFollowers,
                "following": arrFollowing,
                "posts": user.posts
            });
        }
        else {
            // if user not found
            return res.status(404).json({});
        }
    } catch (error) {
        return res.status(400).json({
            status: "failure",
            reason: `Internal server error ${error}`
        });
    }
}