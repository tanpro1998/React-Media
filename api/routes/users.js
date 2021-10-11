const express = require("express");
const router = express.Router();

const userController = require("../controllers/users")

// Update User
router.put("/:id", userController.update);
// Delete User
router.delete("/:id", userController.delete);
// get a user
router.get("/", userController.get);
// Get friends
router.get("/friends/:userId", userController.getFriend)
//follow user
router.put("/:id/follow", userController.follow);
// unfollow user
router.put("/:id/unfollow", userController.unfollow);

module.exports = router;
