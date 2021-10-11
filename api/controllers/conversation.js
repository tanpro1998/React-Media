const Conversation = require("../models/Conversation");
// New Conversation
module.exports.create = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConverSation = await newConversation.save();
    res.status(200).json(savedConverSation);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get Conversation
module.exports.get = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
