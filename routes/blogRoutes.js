const express = require("express");
const router = express.Router();

const { createPost, getAllPost } = require("../controllers/postController");
const { createComment } = require("../controllers/commentController");
const { likePost, unLikePost } = require("../controllers/likeController");

router.post("/posts/create", createPost);
router.get("/Posts", getAllPost);

router.post("/comments/create", createComment);

router.post("/likes/like", likePost);
router.delete("/likes/unlike", unLikePost);

module.exports = router;
