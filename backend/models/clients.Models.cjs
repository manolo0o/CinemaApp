const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone_number: {
            type: String,
            required: false,
        },
        adress: {
            type: String,
            required: false,
        },
        bookings: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'booking',
            default: [],
        },
        }, 
        {
            versionKey: false   
        });

module.exports = mongoose.model('user_client', userSchema);
