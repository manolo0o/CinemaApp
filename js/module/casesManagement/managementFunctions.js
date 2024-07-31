import { ObjectId } from "mongodb";
import { connect } from "../../../helpers/db/connect.js";

class functions extends connect {
    static instance;

    constructor(){
        super();
        if(typeof functions.instance === "object"){
            return functions.instance;
        }
        functions.instance = this;
        return this;
    }

    async initialize(){
        await this.open();
        this.collection = this.db.collection("funciones")    
    }

//____________________ GETALL FUNCTIONS ____________________________

    /**
     * @typedef {Object} functions
     * @property {string} functionsID - Movie id.
     * @property {string} pelicula_id - movie title.
     * @property {string} cine_id - cinema id.
     * @property {string} fecha_hora - date_hour.
     * @property {string} sala - cinema hall.
     * @property {string} asientos_disponibles - available seats.
     * @property {string} asientos_totales _ total seats.
     * @property {string} precio - price.
     */

    /**
     * get the result of the collection.
     * @returns {Promise<Array<functions>>} - Array with the result of functions collection.
     */
    async getAllFunctions(){
        let res = await this.collection.find(
            {}
        ).toArray();
        return res;
    }

//____________________ FUNCTION HOUR BY MOVIEID ____________________________
    /**
     * @typedef {Object} functions
     * @property {string} functionsID - Movie id.
     * @property {string} pelicula_id - movie title.
     * @property {string} cine_id - cinema id.
     * @property {string} horas - hour.
     * @property {string} sala - cinema hall.
     * @property {string} asientos_disponibles - available seats.
     * @property {string} asientos_totales _ total seats.
     * @property {string} precio - price.
     */

    /**
     * get the result of the collection.
     * @returns {Promise<Array<functions>>} - Array with the result of functions collection.
     */
    async getFunctionsBy___MovieID(pelicula_id){
        let res = await this.collection.find(
            {"pelicula_id": new ObjectId(pelicula_id)},
            {
                projection:{
                    "_id":0,
                    "sala":1,
                    "precio":1,
                    "horas":1
                }
            }
        ).toArray();
        return res;
    }
//____________________ ADD BOOKINGS BY FUNCTION ID ____________________________
    /**
     * @typedef {Object} Reservation
     * @property {string} asiento - Seat number.
     * @property {ObjectId} cliente_id - Client ID.
     */

    /**
     * Add a new booking to a function by its ID.
     * @param {ObjectId} functionsID - Function ID.
     * @param {Reservation} newReservation - The new reservation to add.
     * @returns {Promise<Object>} - Updated function document.
     * @throws {Error} - Throws an error if there are no available seats.
     */
    async addBookingsByFunctionID(functionsID, newReservation) {
        // Fetch the function by its ID
        const functionDoc = await this.collection.findOne({ "_id": new ObjectId(functionsID) });

        if (!functionDoc) {
            throw new Error('Function not found');
        }

        // Check if there are available seats
        if (functionDoc.asientos_disponibles <= 0) {
            throw new Error('No available seats');
        }

        // Add the new reservation to the reservations array
        const updatedReservations = [...functionDoc.reservas, newReservation];

        // Update the function document with the new reservation and decrement available seats
        const result = await this.collection.updateOne(
            { "_id": new ObjectId(functionsID) },
            {
                $set: {
                    reservas: updatedReservations,
                    asientos_disponibles: functionDoc.asientos_disponibles - 1
                }
            }
        );

        // Return the updated function document
        if (result.matchedCount > 0) {
            return await this.collection.findOne({ "_id": new ObjectId(functionsID) });
        } else {
            throw new Error('Failed to update the function');
        }
    }

}
export default functions;