const Tickets = require('../models/tickets.Models.cjs')

//_________________________________________________
// GET ALL TICKETS
const getTickets = async(req,res) => {
    try{
        const tickets = await Tickets.find({});
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// GET TICEKT BY ID
const getTicket = async(req,res) => {
    try{
        const { id } = req.params;
        const tickets = await Tickets.findById(id);
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// CREATE TICKET
const createTicket= async(req,res) => {
    try{
        const ticket = await Tickets.create(req.body);
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// UPDATE TICKET BY ID 
const updateTicket= async(req,res) => {
    try{
        const { id } = req.params;
        
        const ticket = await Tickets.findByIdAndUpdate(id, req.body);
        
        if (!ticket) {
            res.status(404).json({message: 'Ticket not found'});
        }

        const updatedTicket = await Tickets.findById(id);
        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// DELETE A TICKET BY ITS ID

const deleteTicket= async(req,res) => {
    try{
        const { id } = req.params;
        
        const ticket = await Tickets.findByIdAndDelete(id);
        
        if (!ticket) {
            res.status(404).json({message: 'Ticket not found'});
        }

        res.status(200).json({message: 'The Ticket was successfully deleted.'});
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};


//_________________________________________________
// EXPORTS

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket
}
