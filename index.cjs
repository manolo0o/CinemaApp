const express = require('express');
const mongoose = require('mongoose');
const app = express();


app.get('/', (req,res) => {
    res.send('hello from node API updated')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});

mongoose.connect('mongodb://adminCinecampus:manuelito31!!@3.144.218.77:27017/cineCampus?authSource=cineCampus')
.then(() => console.log('Connected!'));
