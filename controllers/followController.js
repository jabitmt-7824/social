const User = require("../models/user");
const Follow = require("../models/follow");
module.exports.follow = async function (req, res) {
    try {
        let fromUser, toUser
        fromUser = await User.findOne({ name: req.params.usernameA })
        if (fromUser) {
            toUser = await User.findOne({ name: req.params.usernameB })
            if (toUser) {
                let alreadyFollowing = await Follow.findOne({ fromUser: req.params.usernameA, toUser: req.params.usernameB });
                if (alreadyFollowing) {
                    return res.status(400).json({
                        status: "failure",
                        reason: "Already Follwing"
                    });
                } else {
                    let follow = await Follow.create({ fromUser: req.params.usernameA, toUser: req.params.usernameB });
                    toUser.followers.push(follow);
                    toUser.save();
                    fromUser.following.push(follow);
                    fromUser.save()
                    return res.status(202).json({
                        status: "success"
                    });
                }
            } else {
                return res.status(400).json({
                    status: "failure",
                    reason: "This user not exist"
                });
            }
        } else {
            return res.status(400).json({
                status: "failure",
                reason: `This user not exist`
            });
        }

    } catch (error) {
        return res.status(400).json({
            status: "failure",
            reason: `Internal server error ${error}`
        });
    }
}