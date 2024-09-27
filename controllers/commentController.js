const Post = require("../models/postSchema");
const Comment = require("../models/commentSchema");

exports.createComment = async (request, response) => {
  try {
    const { post, user, body } = request.body;
    const comment = new Comment({ post, user, body });
    const savedComment = await comment.save();
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    )
      .populate("comments")
      .exec();
    response.status(200).json({
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    console.error(error.message);
    response.status(500).json({
      success: false,
      data: "Error Saving Comment",
      message: error.message,
    });
  }
};
