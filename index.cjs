const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});

app.get('/', (req,res) => {
    res.send('hello from node API updated')
})

mongoose.connect('mongodb://admin:manuelito31@3.144.218.77:27017/?authSource=admin')
.then(() => console.log('Connected!'));
