const express = require('express');
const mongoose = require('mongoose');
const Rooms = require('./models/rooms.Models.cjs')
const roomsRoute = require('./routes/rooms.Routes.cjs')
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
app.use("/rooms", roomsRoute)


// test
app.get('/', (req,res) => {
    res.send('hello from node API updated')
})


mongoose
    .connect(
        "mongodb://adminCinecampus:manuelito31!!@3.144.218.77:27017/cineCampus?authSource=cineCampus"
        )
        .then(() => {
            console.log('Connected to database!');
            app.listen(3000, () => {
                console.log('Server is running on port 3000')
            });
        })
        .catch(()=>{
            console.log("Connection failed!")
        });



