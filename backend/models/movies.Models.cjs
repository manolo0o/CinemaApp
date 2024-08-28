const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    director: { 
        type: String, 
        required: true 
    },
    actors: [{ 
        type: String, 
        required: true 
    }],
    genre: { 
        type: String, 
        required: true 
    },
    duration: { 
        type: Number, 
        required: true 
    },
    releaseDate: { 
        type: Date, 
        required: true 
    },
    language: { 
        type: String, 
        required: true 
    },
    subtitles: [{ 
        type: String 
    }],
    format: { 
        type: String, 
        required: true 
    }
    },{
        versionKey: false   
    }
);

const Movies = mongoose.model('movies', movieSchema);

module.exports = Movies;
