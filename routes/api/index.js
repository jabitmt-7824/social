const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const postController = require("../../controllers/postController");
const followController = require("../../controllers/followController");

// route for create user account
router.post("/create-user", userController.createUser);

// route for create post
router.post("/create-post/:username", postController.createPost);

// route for follow a user
router.post("/follow/:usernameA/:usernameB", followController.follow);

// route for get all post of a user
router.get("/all-posts/:usernameA", postController.allPosts);

// route for fetching a user profile
router.get("/get-user/:username", userController.profile);

module.exports = router;