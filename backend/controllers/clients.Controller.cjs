const Clients = require('../models/clients.Models.cjs')

//_________________________________________________
// GET ALL CLIENTS
const getClients = async(req,res) => {
    try{
        const clients = await Clients.find({});
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// GET CLIENT BY ID
const getClient = async(req,res) => {
    try{
        const { id } = req.params;
        const client = await Clients.findById(id);
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// CREATE CLIENT
const createClient = async(req,res) => {
    try{
        const client = await Clients.create(req.body);
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// UPDATE CLIENT BY ID 
const updateClient = async(req,res) => {
    try{
        const { id } = req.params;
        
        const client = await Clients.findByIdAndUpdate(id, req.body);
        
        if (!client) {
            res.status(404).json({message: 'User not found'});
        }

        const updatedClient = await Clients.findById(id);
        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// DELETE A CLIENT BY ITS ID

const deleteClient = async(req,res) => {
    try{
        const { id } = req.params;
        
        const client = await Clients.findByIdAndDelete(id);
        
        if (!client) {
            res.status(404).json({message: 'client not found'});
        }

        res.status(200).json({message: 'The client was successfully deleted.'});
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};


//_________________________________________________
// EXPORTS

module.exports = {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient
}

