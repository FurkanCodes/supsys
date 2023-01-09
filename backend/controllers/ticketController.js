const asyncHandler = require("express-async-handler");

const User = require("../models/user");
const Ticket = require("../models/ticketModel");

//desc: gets user ticket
//route: /api/tickets
//access: private
const getTickets = asyncHandler(async (req, res) => {
  //get user
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

//desc: gets user ticket
//route: /api/tickets/:id
//access: private
const getUserTicket = asyncHandler(async (req, res) => {
  //get user
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("not authorized");
  }
  res.status(200).json(ticket);
});

//desc: gets user ticket
//route: /api/tickets
//access: private
const createTicket = asyncHandler(async (req, res) => {
  const { issue, description } = req.body;

  if (!issue || !description) {
    res.status(400);
    throw new Error("please add a problem and description");
  }
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const ticket = await Ticket.create({
    issue,
    description,
    user: req.user.id,
    status: "open",
  });

  res.status(200).json(ticket);
});

//desc: delete ticket
//route: DELETE /api/tickets/:id
//access: private
const deleteTicket = asyncHandler(async (req, res) => {
  //get user
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  await Ticket.remove();

  res.status(200).json({ success: true });
});

//desc: update user ticket
//route: PUT /api/tickets
//access: private
const updateTicket = asyncHandler(async (req, res) => {
  //get user
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});
module.exports = {
  getTickets,
  createTicket,
  getUserTicket,
  deleteTicket,
  updateTicket,
};
