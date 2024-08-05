import { ObjectId } from "mongodb";
import functions from "./casesManagement/managementFunctions.js";

//____________________ GET ALL FUNCTIONS ____________________________

/**
 * Función para obtener todas las funciones.
 * Crea una instancia de la clase `functions`, la inicializa y llama al método `getAllFunctions`.
 * @returns {Promise<Array>} - Array con todas las funciones.
 * @throws {Error} - Lanza un error si ocurre un problema al obtener las funciones.
 */
export const getAllFunctions = async () => {
    let functionInstance = new functions();
    await functionInstance.initialize();
    try {
        const Function = await functionInstance.getAllFunctions();
        console.log("functions:", JSON.stringify(Function, null, 2));
        return Function;
    } catch (error) {
        console.error("Error obtaining all functions...", error);
        throw error;
    } finally {
        await functionInstance.close();
    }
};

//____________________ FUNCTION HOURS BY MOVIE ID ____________________________

/**
 * Función para obtener funciones por ID de la película.
 * Crea una instancia de la clase `functions`, la inicializa y llama al método `getFunctionsByMovieID`.
 * @param {string} pelicula_id - ID de la película.
 * @returns {Promise<Array>} - Array con las funciones correspondientes a la película.
 * @throws {Error} - Lanza un error si ocurre un problema al obtener las funciones específicas de la película.
 */
export const getFunctionsByMovieID = async (pelicula_id) => {
    let functionInstance = new functions();
    await functionInstance.initialize();
    try {
        const Function = await functionInstance.getFunctionsByMovieID(pelicula_id);
        console.log("Movie functions:", JSON.stringify(Function, null, 2));
        return Function;
    } catch (error) {
        console.error("Error obtaining specific movie function...", error);
        throw error;
    } finally {
        await functionInstance.close();
    }
};

//____________________ ADD BOOKINGS BY FUNCTION ID ____________________________

/**
 * Función para añadir una nueva reserva a una función por su ID.
 * Crea una instancia de la clase `functions`, la inicializa y llama al método `addBookingsByFunctionID`.
 * @param {ObjectId} functionsID - ID de la función.
 * @param {Reservation} newReservation - La nueva reserva a añadir.
 * @returns {Promise<Object>} - Documento de la función actualizado.
 * @throws {Error} - Lanza un error si ocurre un problema al añadir la reserva.
 */
export const addBookingsByFunctionID = async (functionsID, newReservation) => {
    let functionInstance = new functions();
    await functionInstance.initialize();
    try {
        const Function = await functionInstance.addBookingsByFunctionID(functionsID, newReservation);
        console.log("Updated function:", JSON.stringify(Function, null, 2));
        return Function;
    } catch (error) {
        console.error("Error adding booking by function id...", error);
        throw error;
    } finally {
        await functionInstance.close();
    }
};

//____________________ DELETE BOOKING BY FUNCTION ID ____________________________

/**
 * Función para eliminar una reserva de una función por su ID.
 * Crea una instancia de la clase `functions`, la inicializa y llama al método `removeBookingByFunctionID`.
 * @param {ObjectId} functionsID - ID de la función.
 * @param {Reservation} reservationToRemove - La reserva a eliminar.
 * @returns {Promise<Object>} - Documento de la función actualizado.
 * @throws {Error} - Lanza un error si ocurre un problema al eliminar la reserva.
 */
export const removeBookingByFunctionID = async (functionsID, reservationToRemove) => {
    let functionInstance = new functions();
    await functionInstance.initialize();
    try {
        const updatedFunction = await functionInstance.removeBookingByFunctionID(functionsID, reservationToRemove);
        console.log("Updated function:", JSON.stringify(updatedFunction, null, 2));
        return updatedFunction;
    } catch (error) {
        console.error("Error removing booking by function ID...", error);
        throw error;
    } finally {
        await functionInstance.close();
    }
};

//_________________________________________________________________________________

(async () => {
    //____________________ GET ALL FUNCTIONS ____________________________

    await getAllFunctions();

    //____________________ FUNCTION HOURS BY MOVIE ID ____________________________

    // let pelicula_id = "64b28b5c3f8b9e6fdbc7febe";
    // await getFunctionsByMovieID(pelicula_id);

    //____________________ ADD BOOKINGS BY FUNCTION ID ____________________________

    // let funcion_id = new ObjectId('66a9c051bf1f3519f6394c29');
    // let cliente_id = new ObjectId('64b28b5c3f8b9e6fdbc7febd');
    // let asiento = 'F20';

    // let newReservation = {
    //     asiento: asiento,
    //     cliente_id: cliente_id
    // };

    // try {
    //     await addBookingsByFunctionID(funcion_id, newReservation);
    // } catch (error) {
    //     console.log("Error adding reservation:", error);
    // }

    //____________________ DELETE BOOKING BY FUNCTION ID ____________________________

    // let funcion_id = new ObjectId('66a9c051bf1f3519f6394c29');
    // let cliente_id = new ObjectId('64b28b5c3f8b9e6fdbc7febd');
    // let asiento = 'F20';
    
    // let reservationToRemove = {
    //     asiento: asiento,
    //     cliente_id: cliente_id
    // };

    // try {
    //     await removeBookingByFunctionID(funcion_id, reservationToRemove);
    // } catch (error) {
    //     console.log("Error removing reservation:", error);
    // }
})();
