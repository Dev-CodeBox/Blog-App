const Post = require("../models/postSchema");
const Like = require("../models/likeSchema");

exports.likePost = async (request, response) => {
  try {
    const { post, user } = request.body;
    const like = new Like({
      post,
      user,
    });
    const savedLike = await like.save();
    const updatedLike = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true }
    )
      .populate("likes")
      .exec();

    response.status(200).json({
      post: updatedLike,
    });
  } catch (error) {
    console.error(error);
    console.error(error.message);
    res.status(500).json({
      success: false,
      data: "Error Liking Post",
      message: error.message,
    });
  }
};

exports.unLikePost = async (request, response) => {
  try {
    const { post, like } = request.body;
    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLike._id } },
      { new: true }
    );
    response.status(200).json({
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    console.error(error.message);
    response.status(500).json({
      success: false,
      data: "Error Unliking Post",
      message: error.message,
    });
  }
};
