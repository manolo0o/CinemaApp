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

(async() => {
//____________________ ALL BUYED TICKETS ____________________________

//    await getAll__BuyedTickets();

//____________________ AVAILABLE SEATS ____________________________

    let funcion_id = "64b28b5c3f8b9e6fdbc7feca";
    await getAvailableSeatsByFunctionID(funcion_id);

    })();