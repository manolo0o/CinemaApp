import { ObjectId } from "mongodb";
import functions from "./casesManagement/managementFunctions.js";

//____________________ GETALL FUNCTIONS ____________________________


export const getAllFunctions =  async () => {
    let functionInstance = new functions();
    await functionInstance.initialize();
    try{
        const Function = await functionInstance.getAllFunctions();
        console.log("functions:", Function);
        return Function;
    } catch (error){
        console.error("Error obtaining all functions...", error);
        throw error;;
    } finally {
        await functionInstance.close();
    };
};

//____________________ FUNCTION HOUR BY MOVIEID ____________________________

export const getFunctionsBy___MovieID =  async (pelicula_id) => {
    let functionInstance = new functions();
    await functionInstance.initialize();
    try{
        const Function = await functionInstance.getFunctionsBy___MovieID(pelicula_id);
        console.log("Movie functions:",  JSON.stringify(Function, null, 2));
        return Function;
    } catch (error){
        console.error("Error obtaining specific movie function...", error);
        throw error;;
    } finally {
        await functionInstance.close();
    };
};

//____________________ ADD BOOKINGS BY FUNCTION ID ____________________________

export const addBookingsByFunctionID =  async (functionsID, newReservation) => {
    let functionInstance = new functions();
    await functionInstance.initialize();
    try{
        const Function = await functionInstance.addBookingsByFunctionID(functionsID, newReservation);
        console.log("Movie functions:",  JSON.stringify(Function, null, 2));
        return Function;
    } catch (error){
        console.error("Error adding booking by function id...", error);
        throw error;;
    } finally {
        await functionInstance.close();
    };
};

//____________________ DELETE BOOKING BY FUNCTION ID ____________________________

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
(async() => {
//____________________ GETALL FUNCTIONS ____________________________

//    await getAllFunctions();

//____________________ FUNCTION HOUR BY MOVIEID ____________________________
    
//    let pelicula_id = "64b28b5c3f8b9e6fdbc7febe" ;
//    await getFunctionsBy___MovieID(pelicula_id);

//____________________ ADD BOOKINGS BY FUNCTION ID ____________________________

//     let funcion_id = new ObjectId('66a9c051bf1f3519f6394c29');
//     let cliente_id = new ObjectId('64b28b5c3f8b9e6fdbc7febd');
//     let asiento = 'F20';

//     let newReservation = {
//         asiento: asiento,
//         cliente_id: cliente_id
//     };

//     try {
//         await addBookingsByFunctionID(funcion_id, newReservation);
//     } catch (error) {
//         console.log("Error al agregar reserva:", error);
// }

//____________________ DELETE BOOKING BY FUNCTION ID ____________________________

let funcion_id = new ObjectId('66a9c051bf1f3519f6394c29');
    let cliente_id = new ObjectId('64b28b5c3f8b9e6fdbc7febd');
    let asiento = 'F20';
    
    let reservationToRemove = {
        asiento: asiento,
        cliente_id: cliente_id
    };

    try {
        await removeBookingByFunctionID(funcion_id, reservationToRemove);
    } catch (error) {
        console.log("Error al eliminar reserva:", error);
    }

})();
