const express = require('express')
const router = express.Router()

const conversationController = require("../controllers/conversation")

//New conversation
router.post("/", conversationController.create)
// Get conversation
router.get("/:userId", conversationController.get)

module.exports = router