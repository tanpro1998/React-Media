const express = require('express')
const router = express.Router()
const messageController = require("../controllers/message")
// add message
router.post("/", messageController.add)

// get all message
router.get("/:conversationId", messageController.get)


module.exports = router