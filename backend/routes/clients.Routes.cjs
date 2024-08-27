const express = require('express');
const Clients = require ('../models/clients.Models.cjs')
const router = express.Router();

const  {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient
} = require('../controllers/clients.Controller.cjs')

//FIND
router.get('/', getClients);
router.get("/:id", getClient);

//CREATE
router.post('/', createClient);

//UPDATE
router.put("/:id", updateClient);

//DELETE 
router.delete("/:id", deleteClient);


module.exports = router;