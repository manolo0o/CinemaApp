const Rooms = require('../models/rooms.Models.cjs')

//_________________________________________________
// GET ALL CINEMA ROOMS
const getRooms = async(req,res) => {
    try{
        const rooms = await Rooms.find({});
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// GET CINEMA ROOM BY ID
const getRoom = async(req,res) => {
    try{
        const { id } = req.params;
        const room = await Rooms.findById(id);
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// CREATE A NEW ROOM 
const createRoom = async(req,res) => {
    try{
        const room = await Rooms.create(req.body);
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// UPDATE A ROOM BY ID 
const updateRoom = async(req,res) => {
    try{
        const { id } = req.params;
        
        const room = await Rooms.findByIdAndUpdate(id, req.body);
        
        if (!room) {
            res.status(404).json({message: 'Room not found'});
        }

        const updatedRoom = await Rooms.findById(id);
        res.status(200).json(updatedRoom);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// DELETE A ROOM BY ITS ID

const deleteRoom = async(req,res) => {
    try{
        const { id } = req.params;
        
        const room = await Rooms.findByIdAndDelete(id);
        
        if (!room) {
            res.status(404).json({message: 'Room not found'});
        }

        res.status(200).json({message: 'The room was successfully deleted.'});
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};


//_________________________________________________
// EXPORTS

module.exports = {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom
}