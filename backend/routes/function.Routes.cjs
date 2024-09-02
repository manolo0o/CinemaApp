const express = require('express');
const funciones = require ('../models/functions.Models.cjs')
const router = express.Router();

const  {
    getFunctions,
    getFunction,
    createFunction,
    updateFunction,
    deleteFunction
} = require('../controllers/functions.Controller.cjs')

//FIND
router.get('/', getFunctions);
router.get("/:id", getFunction);

//CREATE
router.post('/', createFunction);

//UPDATE
router.put("/:id", updateFunction);

//DELETE 
router.delete("/:id", deleteFunction);


module.exports = router;