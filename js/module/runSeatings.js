import { ObjectId } from "mongodb";
import tickets from "./casesManagement/managementSeatings_Tickets.js"

//____________________ ALL BUYED TICKETS ____________________________

export const getAll__BuyedTickets =  async () => {
    let ticketsInstance = new tickets();
    await ticketsInstance.initialize();
    try{
        const ticket = await ticketsInstance.getAll__BuyedTickets();
        console.log("Tickets:", ticket);
        return ticket;
    } catch (error){
        console.error("Error obtaining all tickets...", error);
        throw error;;
    } finally {
        await ticketsInstance.close();
    }
};

//____________________ AVAILABLE SEATS ____________________________

export const getAvailableSeatsByFunctionID =  async (funcion_id) => {
    let ticketsInstance = new tickets();
    await ticketsInstance.initialize();
    try{
        const ticket = await ticketsInstance.getAvailableSeatsByFunctionID(funcion_id);
        console.log("Tickets:", JSON.stringify(ticket, null, 2));
        return ticket;
    } catch (error){
        console.error("Error obtaining available tickets...", error);
        throw error;;
    } finally {
        await ticketsInstance.close();
    }
};
//____________________ OCCUPIED SEATS BY FUNCTIONID____________________________

export const getOccupiedSeatsByFunctionID =  async (funcion_id) => {
    let ticketsInstance = new tickets();
    await ticketsInstance.initialize();
    try{
        const ticket = await ticketsInstance.getOccupiedSeatsByFunctionID(funcion_id);
        console.log("Tickets:", JSON.stringify(ticket, null, 2));
        return ticket;
    } catch (error){
        console.error("Error obtaining occupied seats...", error);
        throw error;;
    } finally {
        await ticketsInstance.close();
    }
};

//____________________ ADD TICKET ____________________________

export const addTicket = async(
    idTickets,
    funcion_id,
    cliente_id,
    asiento,
    precio,
    fecha_compra,
    descuento_aplicado,
    método_pago
    ) => {
    let ticketsInstance = new tickets();
    await ticketsInstance.initialize();
    try{
        const resultadoAgregar = await ticketsInstance.addTicket(
            idTickets,
            funcion_id,
            cliente_id,
            asiento,
            precio,
            fecha_compra,
            descuento_aplicado,
            método_pago
        );
        console.log("Resultado de Agregar Ticket:", resultadoAgregar);
        return resultadoAgregar;
    } catch (error){
        console.error("Error al agregar Ticket:", error);
        throw error;
    } finally{
        await ticketsInstance.close();
    }
}

//___________________________________________________________________

(async() => {

//____________________ ALL BUYED TICKETS ____________________________

//    await getAll__BuyedTickets();

//____________________ AVAILABLE SEATS ____________________________

//    let funcion_id = "64b28b5c3f8b9e6fdbc7feca";
//    await getAvailableSeatsByFunctionID(funcion_id);

//____________________ OCCUPIED SEATS BY FUNCTIONID____________________________

// let funcion_id = "64b28b5c3f8b9e6fdbc7feca";
// await getOccupiedSeatsByFunctionID(funcion_id);

//____________________ ADD TICKET ____________________________

    let funcion_id = new ObjectId('64b28b5c3f8b9e6fdbc7feca') ;
    let cliente_id = new ObjectId('64b28b5c3f8b9e6fdbc7febd') ;
    let asiento = 'F12' ;
    let precio = 12.5 ;
    let fecha_compra = new Date('2024-07-26T15:30:00.000Z"') ;
    let descuento_aplicado = 0 ;
    let método_pago = 'tarjeta de crédito' ;
    
    
    try{ 
        await addTicket(
            funcion_id,
            cliente_id,
            asiento,
            precio,
            fecha_compra,
            descuento_aplicado,
            método_pago
        );
    }catch (error) {
        console.log("Error al agregar ticket:", error);
        console.log("Detalles del error:", JSON.stringify(error.errInfo.details, null, 2));
    }

})();

        // {
        //     "_id": {
        //       "$oid": "64b28b5c3f8b9e6fdbc7feca"
        //     },
        //     "funcion_id": {
        //       "$oid": "64b28b5c3f8b9e6fdbc7feca"
        //     },
        //     "cliente_id": {
        //       "$oid": "64b28b5c3f8b9e6fdbc7febd"
        //     },
        //     "asiento": "F12",
        //     "precio": 12.5,
        //     "fecha_compra": {
        //       "$date": "2024-07-26T15:30:00.000Z"
        //     },
        //     "descuento_aplicado": 0,
        //     "método_pago": "tarjeta de crédito"
        //   }