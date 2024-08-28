const funciones = require('../models/functions.Models.cjs')

//_________________________________________________
// GET ALL FUNCTIONS
const getFunctions = async(req,res) => {
    try{
        const functionS = await funciones.find({});
        res.status(200).json(functionS);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// GET FUNCTIONS BY ID
const getFunction = async(req,res) => {
    try{
        const { id } = req.params;
        const functioN = await funciones.findById(id);
        res.status(200).json(functioN);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// CREATE FUNCTION
const createFunction = async(req,res) => {
    try{
        const functioN = await funciones.create(req.body);
        res.status(200).json(functioN);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// UPDATE CLIENT BY ID 
const updateFunction = async(req,res) => {
    try{
        const { id } = req.params;
        
        const functioN = await funciones.findByIdAndUpdate(id, req.body);
        
        if (!functioN) {
            res.status(404).json({message: 'User not found'});
        }

        const updatedFunction = await funciones.findById(id);
        res.status(200).json(updatedFunction);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//_________________________________________________
// DELETE A FUNCTION BY ITS ID

const deleteFunction = async(req,res) => {
    try{
        const { id } = req.params;
        
        const functioN = await funciones.findByIdAndDelete(id);
        
        if (!functioN) {
            res.status(404).json({message: 'client not found'});
        }

        res.status(200).json({message: 'The client was successfully deleted.'});
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};


//_________________________________________________
// EXPORTS

module.exports = {
    getFunctions,
    getFunction,
    createFunction,
    updateFunction,
    deleteFunction
}
