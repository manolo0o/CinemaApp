const express = require('express');
const Rooms = require ('../models/rooms.Models.cjs')
const router = express.Router();

const {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom
} = require('../controllers/rooms.Controller.cjs')

//FIND
router.get('/', getRooms);
router.get("/:id", getRoom);

//CREATE
router.post('/', createRoom);

//UPDATE
router.put("/:id", updateRoom);

//DELETE 
router.delete("/:id", deleteRoom);


module.exports = router;