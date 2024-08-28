const mongoose = require('mongoose');

const seatingSchema = new mongoose.Schema({
    seat_number: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        required: true 
    }
});

const functionSchema = new mongoose.Schema({
    movie_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Movie', 
        required: true 
    },
    room_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room', 
        required: true 
    },
    function_hour: { 
        type: String, 
        required: true 
    },
    start_date: { 
        type: Date, 
        required: true 
    },
    end_date: { 
        type: Date, 
        required: true 
    },
    seatings: [seatingSchema]
    },{
        versionKey: false   
});

const Function = mongoose.model('Functions', functionSchema);

module.exports = Function;
