const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    function_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'funciones',
        required: true
      },
      client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clients',
        required: true
      },
      seating: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      bought_date: {
        type: Date,
        required: true
      },
      discount: {
        type: Number,
        default: 0
      },
      payment_method: {
        type: String,
        required: true
      },
      function_hour: {
        type: String,
        required: true
      }
},{
    versionKey: false   
});

const Tickets = mongoose.model("tickets", ticketSchema);

module.exports = Tickets;