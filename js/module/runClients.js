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

// ______________________ CLIENT SATATUS BY ID ________________________

export const vipClients =  async (tipo_cliente_id) => {
    let clientInstance = new clients();
    await clientInstance.initialize();
    try{
        const client = await clientInstance.vipClients(tipo_cliente_id);
        console.log("clients:", JSON.stringify(client, null, 2));
        return client;
    } catch (error){
        console.error("Error obtaining client...", error);
        throw error;;
    } finally {
        await clientInstance.close();
    }
};
//_____________________________________________________________
(async() => {
// ______________________ ALL CLIENTS ________________________

// await getAllClients();

// ______________________ CLIENT SATATUS BY ID ________________________

    let tipo_cliente_id = '64b28b5c3f8b9e6fdbc7febf'
    await vipClients(tipo_cliente_id);

})();