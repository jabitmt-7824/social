const User = require("../models/user");
const Post = require("../models/post");

module.exports.createUser = async function (req, res) {
    try {
        let alreadyUser = await User.findOne({ name: req.body.name })
        if (alreadyUser) {
            return res.status(400).json({
                status: "failure",
                reason: "This user-name already exist"
            });
        }
        else {
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

module.exports.profile = async function (req, res) {
    try {
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
            let arrFollowers = [], arrFollowing = []
            user.followers.forEach(follow => {
                arrFollowers.push(follow.fromUser)
            });
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
            return res.status(404).json({});
        }
    } catch (error) {
        return res.status(400).json({
            status: "failure",
            reason: `Internal server error ${error}`
        });
    }
}