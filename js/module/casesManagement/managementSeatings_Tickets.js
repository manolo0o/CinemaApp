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

}
export default tickets;