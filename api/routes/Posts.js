const express = require('express')

const router = express.Router()

const postController = require("../controllers/posts")
// create post
router.post("/", postController.create)
// update post
router.put("/:id", postController.update)
// delete post
router.delete("/:id", postController.delete)
// Like/Dislike post
router.put("/:id/like", postController.like_dislike)
// get timeline
router.get("/timeline/:userId", postController.gettimeline)
// get all user
router.get("/profile/:username", postController.getAllUser)

module.exports = router