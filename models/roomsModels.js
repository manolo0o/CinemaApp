const mongoose = require('mongoose');

const roomsSchema = mongoose.Schema({    
    name: {
        type: String,
        required: [true, "Please enter a room name"]
    },
    seatings: {
        type: Array,
        default: [],
    }
}, {
    versionKey: false   
});

const rooms = mongoose.model("rooms", roomsSchema);

module.exports = rooms;


