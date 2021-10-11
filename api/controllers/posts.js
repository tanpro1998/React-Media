const Post = require("../models/Posts");
const User = require("../models/User");
// Create post
module.exports.create = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};
// Update post
module.exports.update = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated!!!");
    } else {
      res.status(403).json("You can update only your post!!!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
// Delete post
module.exports.delete = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted!!!");
    } else {
      res.status(403).json("You can delete only your post!!!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
// like/dislike
module.exports.like_dislike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("the post has been liked!!!");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("the post has been disliked!!!!");
    }
  } catch (err) {
    res.json(err);
  }
};
// get timeline
module.exports.gettimeline = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all user post

module.exports.getAllUser = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
    });
    const posts = await Post.find({
      userId: user._id,
    });
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json(err);
  }
};
