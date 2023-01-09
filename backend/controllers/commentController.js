const asyncHandler = require("express-async-handler");

const User = require("../models/user");
const Ticket = require("../models/ticketModel");
const Comment = require("../models/commentModel");

//desc: gets comments
//route: GET /api/tickets/:ticketId/comments
//access: private
const getComments = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const comment = await Comment.find({ ticket: req.params.ticketId });

  res.status(200).json(comment);
});
//desc: create comments
//route: POST /api/tickets/:ticketId/comments
//access: private
const createComment = asyncHandler(async (req, res) => {
  //get user
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const ticket = await Ticket.findById(req.params.ticketId);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  const comment = await Comment.create({
    text: req.body.text,
    isStaff: false,
    user: req.user.id,
    ticket: req.params.ticketId,
  });
  res.status(200).json(comment);
});

module.exports = {
  getComments,
  createComment,
};
