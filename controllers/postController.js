const Post = require("../models/postSchema");

exports.createPost = async (request, response) => {
  try {
    const { title, body } = request.body;
    const post = new Post({ title, body });
    const savedPost = await post.save();
    response.status(200).json({
      post: savedPost,
    });
  } catch (error) {
    console.error(error);
    console.error(error.message);
    response.status(500).json({
      success: false,
      data: "Error Saving Post",
      message: error.message,
    });
  }
};

exports.getAllPost = async (request, response) => {
  try {
    const post = await Post.find()
      .populate("likes")
      .populate("comments")
      .exec();
    response.status(200).json({
      post,
    });
  } catch (error) {
    console.error(error);
    console.error(error.message);
    response.status(500).json({
      success: false,
      data: "Error Getting All Posts",
      message: error.message,
    });
  }
};
