const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const postController = require("../../controllers/postController");
const followController = require("../../controllers/followController");

router.post("/create-user", userController.createUser);
router.post("/create-post/:username", postController.createPost);
router.post("/follow/:usernameA/:usernameB", followController.follow);
router.get("/all-posts/:usernameA", postController.allPosts);
router.get("/get-user/:username", userController.profile);

module.exports = router;