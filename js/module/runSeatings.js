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

//____________________ OCCUPIED SEATS ____________________________


(async() => {
//____________________ ALL BUYED TICKETS ____________________________

    await getAll__BuyedTickets();

//____________________ OCCUPIED SEATS ____________________________


    })();