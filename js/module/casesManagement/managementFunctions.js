import { ObjectId } from "mongodb";
import { connect } from "../../../helpers/db/connect.js";

/**
 * Clase `functions` que maneja las operaciones de la colección `funciones` en MongoDB.
 * Se extiende de la clase `connect` para gestionar la conexión a la base de datos.
 */
class functions extends connect {
    static instance;

    /**
     * Constructor de la clase `functions`.
     * Implementa el patrón Singleton para asegurar que solo haya una instancia de la clase.
     */
    constructor() {
        super();
        if (typeof functions.instance === "object") {
            return functions.instance;
        }
        functions.instance = this;
        return this;
    }

    /**
     * Método para inicializar la conexión a la base de datos y obtener la colección `funciones`.
     * @returns {Promise<void>}
     */
    async initialize() {
        await this.open();
        this.collection = this.db.collection("funciones");
    }

    //____________________ GET ALL FUNCTIONS ____________________________

    /**
     * @typedef {Object} Function
     * @property {string} functionsID - ID de la función.
     * @property {string} pelicula_id - ID de la película.
     * @property {string} cine_id - ID del cine.
     * @property {string} fecha_hora - Fecha y hora de la función.
     * @property {string} sala - Sala de cine.
     * @property {string} asientos_disponibles - Asientos disponibles.
     * @property {string} asientos_totales - Asientos totales.
     * @property {string} precio - Precio.
     */

    /**
     * Obtiene todas las funciones de la colección.
     * @returns {Promise<Array<Function>>} - Array con todas las funciones.
     */
    async getAllFunctions() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    //____________________ FUNCTION HOUR BY MOVIEID ____________________________

    /**
     * @typedef {Object} Function
     * @property {string} functionsID - ID de la función.
     * @property {string} pelicula_id - ID de la película.
     * @property {string} cine_id - ID del cine.
     * @property {string} horas - Horas de la función.
     * @property {string} sala - Sala de cine.
     * @property {string} asientos_disponibles - Asientos disponibles.
     * @property {string} asientos_totales - Asientos totales.
     * @property {string} precio - Precio.
     */

    /**
     * Obtiene las funciones por ID de la película.
     * @param {string} pelicula_id - ID de la película.
     * @returns {Promise<Array<Function>>} - Array con las funciones correspondientes.
     */
    async getFunctionsByMovieID(pelicula_id) {
        let res = await this.collection.find(
            { "pelicula_id": new ObjectId(pelicula_id) },
            {
                projection: {
                    "_id": 0,
                    "sala": 1,
                    "precio": 1,
                    "horas": 1
                }
            }
        ).toArray();
        return res;
    }

    //____________________ ADD BOOKINGS BY FUNCTION ID ____________________________

    /**
     * @typedef {Object} Reservation
     * @property {string} asiento - Número de asiento.
     * @property {ObjectId} cliente_id - ID del cliente.
     */

    /**
     * Añade una nueva reserva a una función por su ID.
     * @param {ObjectId} functionsID - ID de la función.
     * @param {Reservation} newReservation - La nueva reserva a añadir.
     * @returns {Promise<Object>} - Documento de la función actualizado.
     * @throws {Error} - Lanza un error si no hay asientos disponibles.
     */
    async addBookingsByFunctionID(functionsID, newReservation) {
        // Buscar la función por su ID
        const functionDoc = await this.collection.findOne({ "_id": new ObjectId(functionsID) });

        if (!functionDoc) {
            throw new Error('Function not found');
        }

        // Comprobar si hay asientos disponibles
        if (functionDoc.asientos_disponibles <= 0) {
            throw new Error('No available seats');
        }

        // Añadir la nueva reserva al array de reservas
        const updatedReservations = [...functionDoc.reservas, newReservation];

        // Actualizar el documento de la función con la nueva reserva y decrementar los asientos disponibles
        const result = await this.collection.updateOne(
            { "_id": new ObjectId(functionsID) },
            {
                $set: {
                    reservas: updatedReservations,
                    asientos_disponibles: functionDoc.asientos_disponibles - 1
                }
            }
        );

        // Devolver el documento de la función actualizado
        if (result.matchedCount > 0) {
            return await this.collection.findOne({ "_id": new ObjectId(functionsID) });
        } else {
            throw new Error('Failed to update the function');
        }
    }

//____________________ DELETE BOOKING BY FUNCTION ID ____________________________

    /**
     * Elimina una reserva de una función por su ID y los detalles de la reserva.
     * Primero busca el documento de la función en la base de datos usando el ID de la función proporcionado. Luego, verifica si la reserva especificada existe en el documento. Si la reserva se encuentra, se elimina de la lista de reservas y se actualiza el número de asientos disponibles. Finalmente, se actualiza el documento en la base de datos con la lista de reservas actualizada y el número de asientos disponibles incrementado.
     * 
     * @param {ObjectId} functionsID - El ID de la función de la que se desea eliminar la reserva.
     * @param {Reservation} reservationToRemove - Un objeto que representa la reserva que se desea eliminar. Debe contener:
     *   @param {string} asiento - El número de asiento de la reserva.
     *   @param {ObjectId} cliente_id - El ID del cliente que hizo la reserva.
     * @returns {Promise<Object>} - Retorna una promesa que resuelve con el documento de la función actualizado después de eliminar la reserva.
     * @throws {Error} - Lanza un error si:
     *   - No se encuentra la función con el ID proporcionado (`'Function not found'`).
     *   - La lista de reservas no está presente o no es un array (`'Reservations not found in the function'`).
     *   - No se encuentra la reserva especificada en la lista de reservas (`'Reservation not found'`).
     *   - No se pudo actualizar el documento de la función en la base de datos (`'Failed to update the function'`).
 */
    async removeBookingByFunctionID(functionsID, reservationToRemove) {
        // Busca el documento de la función por su ID
        const functionDoc = await this.collection.findOne({ "_id": new ObjectId(functionsID) });

        // Verifica si la función existe
        if (!functionDoc) {
            throw new Error('Function not found');
        }

        // Verifica si la propiedad reservas es un array
        if (!Array.isArray(functionDoc.reservas)) {
            throw new Error('Reservations not found in the function');
        }

        // Encuentra el índice de la reserva en la lista de reservas
        const reservationIndex = functionDoc.reservas.findIndex(reserva =>
            reserva.asiento === reservationToRemove.asiento &&
            reserva.cliente_id.equals(reservationToRemove.cliente_id)
        );

        // Verifica si la reserva se encontró
        if (reservationIndex === -1) {
            throw new Error('Reservation not found');
        }

        // Elimina la reserva de la lista
        functionDoc.reservas.splice(reservationIndex, 1);

        // Actualiza el documento de la función en la base de datos
        const result = await this.collection.updateOne(
            { "_id": new ObjectId(functionsID) },
            {
                $set: {
                    reservas: functionDoc.reservas,
                    asientos_disponibles: functionDoc.asientos_disponibles + 1
                }
            }
        );

        // Verifica si la actualización fue exitosa
        if (result.matchedCount > 0) {
            // Retorna el documento actualizado
            return await this.collection.findOne({ "_id": new ObjectId(functionsID) });
        } else {
            throw new Error('Failed to update the function');
        }
    }

}

export default functions;
