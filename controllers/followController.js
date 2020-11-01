const User = require("../models/user");
const Follow = require("../models/follow");

// follow a user
module.exports.follow = async function (req, res) {
    try {
        let fromUser, toUser
        // check from user exist
        fromUser = await User.findOne({ name: req.params.usernameA })
        if (fromUser) {
            // check to user exist
            toUser = await User.findOne({ name: req.params.usernameB })
            if (toUser) {
                // check 'following' already exist
                let alreadyFollowing = await Follow.findOne({ fromUser: req.params.usernameA, toUser: req.params.usernameB });
                if (alreadyFollowing) {
                    // if 'following' already exist
                    return res.status(400).json({
                        status: "failure",
                        reason: "Already Follwing"
                    });
                } else {
                    // if 'following' does not exist already, create a new document
                    let follow = await Follow.create({ fromUser: req.params.usernameA, toUser: req.params.usernameB });
                    await toUser.followers.push(follow);
                    await toUser.save();
                    await fromUser.following.push(follow);
                    await fromUser.save()
                    return res.status(202).json({
                        status: "success"
                    });
                }
            } else {
                // if toUser does not exist
                return res.status(400).json({
                    status: "failure",
                    reason: "This user not exist"
                });
            }
        } else {
            // if fromUser does not exist
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