const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getComments,
  createComment,
} = require("../controllers/commentController");
const protect = require("../middleware/authMiddleware");

router.route("/").get(protect, getComments).post(protect, createComment);

module.exports = router;
