const express = require('express');
const Movies = require ('../models/movies.Models.cjs')
const router = express.Router();

const {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
} = require ('../controllers/movies.Controller.cjs')

//FIND
router.get('/', getMovies);
router.get("/:id", getMovie);

//CREATE
router.post('/', createMovie);

//UPDATE
router.put("/:id", updateMovie);

//DELETE 
router.delete("/:id", deleteMovie);


module.exports = router;