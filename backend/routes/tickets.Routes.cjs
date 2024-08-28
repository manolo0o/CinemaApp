const express = require('express')
const Tickets = require('../models/tickets.Models.cjs')
const router = express.Router();

const {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket
} = require('../controllers/Tickets.Controller.cjs');

//FIND
router.get('/', getTickets);
router.get("/:id", getTicket);

//CREATE
router.post('/', createTicket);

//UPDATE
router.put("/:id", updateTicket);

//DELETE 
router.delete("/:id", deleteTicket);


module.exports = router;