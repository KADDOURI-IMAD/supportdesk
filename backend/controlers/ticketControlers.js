const asyncHandler = require("express-async-handler");
const Ticket = require("../model/ticketModel");
const User = require("../model/userModel");


const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(401);
    throw new Error("Add both product and description");
  }

  const ticket = await Ticket.create({
    user: req.user.id,
    product: product,
    description: description,
    status: "new",
  });
  res.status(201).json(ticket);
});

const viewTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(201).json(tickets);
});

const viewTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(401);
    throw new Error("No Ticket found");
  }
  if (ticket.user.toString() != req.user.id) {
    res.status(400);
    throw new Error("Not Authorized");
  }
  res.status(201).json(ticket);
});

const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(401);
    throw new Error("No Ticket found");
  }
  if (ticket.user.toString() != req.user.id) {
    res.status(400);
    throw new Error("Not Authorized");
  }
  const { product, description } = req.body;

  const upadatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(201).json(upadatedTicket);
});

const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(401);
    throw new Error("No Ticket found");
  }
  if (ticket.user.toString() != req.user.id) {
    res.status(400);
    throw new Error("Not Authorized");
  }
  await ticket.remove();
  res.status(201).json({ message: "Ticket has been removed" });
});
module.exports = {
  createTicket,
  viewTickets,
  viewTicket,
  updateTicket,
  deleteTicket,
};
