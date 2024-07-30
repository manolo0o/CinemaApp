import { ObjectId } from "mongodb";
import clients from "./casesManagement/managementClient.js"

// ______________________ ALL CLIENTS ________________________

export const getAllClients =  async () => {
    let clientInstance = new clients();
    await clientInstance.initialize();
    try{
        const client = await clientInstance.getAllClients();
        console.log("clients:", client);
        return client;
    } catch (error){
        console.error("Error obtaining all clients...", error);
        throw error;;
    } finally {
        await clientInstance.close();
    }
};

//_____________________________________________________________
(async() => {
// ______________________ ALL CLIENTS ________________________

await getAllClients();

})();