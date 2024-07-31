import { ObjectId } from "mongodb";
import { connect } from "../../../helpers/db/connect.js";

class clients extends connect{
    static instance;

    constructor(){
        super();
        if(typeof clients.instance === "object"){
            return clients.instance;
        }
        clients.instance = this;
        return this;
    }
    async initialize(){
        await this.open();
        this.collection = this.db.collection("clientes")
    }

// ______________________ ALL CLIENTS ________________________

/**
     * @typedef {Object} clients
     * @property {string} idClient - clients id.
     * @property {string} name - client name .
     * @property {string} email - client email.
     * @property {string} telefono - client telephone .
     * @property {string} direccion - client adress.
     * @property {string} tipo_cliente_id - client type ID.
     * @property {string}  reservas - client bookings.
     */
    /**
     * get the result of the collection.
     * @returns {Promise<Array<clients>>} - Array with the result of clients.
     */

    async getAllClients(){
        let res = await this.collection.find(
            {}
        ).toArray();
        return res;
    } 

// ______________________ CLIENT SATATUS BY ID ________________________

/**
     * @typedef {Object} clients
     * @property {string} idClient - clients id.
     * @property {string} name - client name .
     * @property {string} email - client email.
     * @property {string} telefono - client telephone .
     * @property {string} direccion - client adress.
     * @property {string} tipo_cliente_id - client type ID.
     * @property {string}  reservas - client bookings.
     */
    /**
     * get the result of the collection.
     * @returns {Promise<Array<clients>>} - Array with the result of clients.
     */
    async vipClients (tipo_cliente_id){
        let res = await this.collection.aggregate([
            { $match: { tipo_cliente_id: new ObjectId(tipo_cliente_id) } },
                {
                $lookup: {
                    from: "tipoCliente",
                    localField: "tipo_cliente_id",
                    foreignField: "_id",
                    as: "tipoClienteInfo",
                        pipeline:[
                        {
                        $project:{
                            _id:0,
                            nombre: 1,
                            descuento: 1
                        }
                        }
                    ]
                }
                },
                {
                $project: {
                    _id:0,
                    tipo_cliente_id:0
                }
                }
        ]).toArray();
        return res;
    }

}
export default clients;
