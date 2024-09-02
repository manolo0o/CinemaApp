const Movies = require('../models/movies.Models.cjs')

//_________________________________________________
// GET ALL MOVIES
const getMovies = async(req,res) => {
    try{
        const movies = await Movies.find({});
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// GET MOVIE BY ID
const getMovie = async(req,res) => {
    try{
        const { id } = req.params;
        const movie = await Movies.findById(id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// CREATE CLIENT
const createMovie = async(req,res) => {
    try{
        const movie = await Movies.create(req.body);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// UPDATE MOVIE BY ID 
const updateMovie = async(req,res) => {
    try{
        const { id } = req.params;
        
        const movie = await Movies.findByIdAndUpdate(id, req.body);
        
        if (!movie) {
            res.status(404).json({message: 'Movie not found'});
        }

        const updatedMovie = await Movies.findById(id);
        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};


//_________________________________________________
// DELETE A MOVIE BY ITS ID

const deleteMovie = async(req,res) => {
    try{
        const { id } = req.params;
        
        const movie = await Movies.findByIdAndDelete(id);
        
        if (!movie) {
            res.status(404).json({message: 'movie not found'});
        }

        res.status(200).json({message: 'The movie was successfully deleted.'});
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};


//_________________________________________________
// EXPORTS

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
}
