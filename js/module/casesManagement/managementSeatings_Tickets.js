import { ObjectId } from "mongodb";
import { connect } from "../../../helpers/db/connect.js";

class tickets extends connect{
    static instance;

    constructor(){
        super();
        if(typeof tickets.instance === "object"){
            return tickets.instance;
        }
        tickets.instance = this;
        return this;
    }
    async initialize(){
        await this.open();
        this.collection = this.db.collection("boletos")
    }
//____________________ ALL BUYED TICKETS ____________________________

    /**
     * @typedef {Object} tickets
     * @property {string} idTickets - tickets id.
     * @property {string} funcion_id - function id .
     * @property {string} cliente_id - client id.
     * @property {string}  asiento - asigned seat.
     * @property {string}  precio - ticket price.
     * @property {string}  fecha_compra - date of purchase.
     * @property {string}  descuento_aplicado - applied discount.
     * @property {string}  método_pago - payment method.
     */
    /**
     * get the result of the collection.
     * @returns {Promise<Array<tickets>>} - Array with the result of tickets.
     */

    async getAll__BuyedTickets(){
        let res = await this.collection.find(
            {}
        ).toArray();
        return res;
    } 

//____________________ AVAILABLE SEATS ____________________________
    
    /**
     * @typedef {Object} tickets
     * @property {string} idTickets - tickets id.
     * @property {string} funcion_id - function id .
     * @property {string} cliente_id - client id.
     * @property {string}  asiento - asigned seat.
     * @property {string}  precio - ticket price.
     * @property {string}  fecha_compra - date of purchase.
     * @property {string}  descuento_aplicado - applied discount.
     * @property {string}  método_pago - payment method.
     */
    /**
     * get the result of the collection.
     * @returns {Promise<Array<tickets>>} - Array with the result of tickets.
     */

async getAvailableSeatsByFunctionID(funcion_id){
    let res = await this.collection.aggregate([
        { $match: { _id: new ObjectId(funcion_id ) } },
        {
            $lookup: {
                from: "funciones",
                localField: "funcion_id",
                foreignField: "_id",
                as: "asientos disponibles y totales",
                    pipeline: [
                        {
                    $project: {
                        '_id': 0,
                        'asientos_disponibles': 1,
                        'asientos_totales':1
                        }
                    }
                    ]
                }
            },
            {
                $project: {
                    '_id': 0,
                    'asientos disponibles y totales': 1
                }
                }
            ]).toArray();
            return res;
        }

//____________________ OCCUPIED SEATS BY FUNCTIONID____________________________

    /**
     * @typedef {Object} tickets
     * @property {string} idTickets - tickets id.
     * @property {string} funcion_id - function id .
     * @property {string} cliente_id - client id.
     * @property {string}  asiento - asigned seat.
     * @property {string}  precio - ticket price.
     * @property {string}  fecha_compra - date of purchase.
     * @property {string}  descuento_aplicado - applied discount.
     * @property {string}  método_pago - payment method.
     */
    /**
     * get the result of the collection.
     * @returns {Promise<Array<tickets>>} - Array with the result of tickets.
     */
    async getOccupiedSeatsByFunctionID(funcion_id){
        let res = await this.collection.find(
            {"_id": new ObjectId(funcion_id)},
            {
                projection:{
                    "_id":0,
                    "asiento":1,
                    "cliente_id":1
                }
            }
        ).toArray();
        return res;
    }
//____________________ ADD TICKET ____________________________
    /**
     * @typedef {Object} tickets
     * @property {string} idTickets - tickets id.
     * @property {string} funcion_id - function id .
     * @property {string} cliente_id - client id.
     * @property {string}  asiento - asigned seat.
     * @property {string}  precio - ticket price.
     * @property {string}  fecha_compra - date of purchase.
     * @property {string}  descuento_aplicado - applied discount.
     * @property {string}  método_pago - payment method.
     */
    /**
     * get the result of the collection.
     * @returns {Promise<Array<tickets>>} - Array with the result of tickets.
     */
    
    async addTicket(
        funcion_id,
        cliente_id,
        asiento,
        precio,
        fecha_compra,
        descuento_aplicado,
        método_pago,
        hora_funcion){
        console.log("Adding Ticket",{
            funcion_id,
            cliente_id,
            asiento,
            precio,
            fecha_compra,
            descuento_aplicado,
            método_pago,
            hora_funcion});
        try{

            const asientoExistente = await this.collection.findOne({
                funcion_id: new ObjectId(funcion_id),
                asiento: asiento
            });
            if (asientoExistente) {
                throw new Error('El asiento ya esta ocupado.');
            }
            // Verificar si hay asientos disponibles en la colección funciones
            const funcionesCollection = this.db.collection('funciones');
            const funcion = await funcionesCollection.findOne({
            _id: new ObjectId(funcion_id),
            asientos_disponibles: { $gt: 0 }
            });

            if (!funcion) {
            throw new Error('No hay asientos disponibles.');
            }

            // Actualizar el número de asientos disponibles
            await funcionesCollection.updateOne(
            { _id: new ObjectId(funcion_id) },
            { $inc: { asientos_disponibles: -1 } }
            );
            
            const resultado = await this.collection.insertOne({
            funcion_id: new ObjectId(funcion_id),
            cliente_id: new ObjectId(cliente_id),
            asiento: asiento,
            precio: precio,
            fecha_compra: new Date(fecha_compra),
            descuento_aplicado: descuento_aplicado,
            método_pago: método_pago,
            hora_funcion: hora_funcion
            });
            console.log("Resultado:", resultado);
            return resultado;
        } catch(error){
            console.error("Error al comprar Ticket", error);
            throw error;
        }
    }

}
export default tickets;