import { ObjectId } from "mongodb";
import clients from "./casesManagement/managementClient.js";

// ______________________ ALL CLIENTS ________________________

    /**
     * Función para obtener todos los clientes.
     * Crea una instancia de la clase `clients`, la inicializa y llama al método `getAllClients`.
     * @returns {Promise<Array>} - Array con todos los clientes.
     * @throws {Error} - Si ocurre un error al obtener los clientes.
     */
    export const getAllClients = async () => {
        let clientInstance = new clients();
        await clientInstance.initialize();
        try {
            const client = await clientInstance.getAllClients();
            console.log("clients:", client);
            return client;
        } catch (error) {
            console.error("Error obtaining all clients...", error);
            throw error;
        } finally {
            await clientInstance.close();
        }
    };

// ______________________ CLIENT STATUS BY ID ________________________

    /**
     * Función para obtener clientes VIP por tipo de cliente.
     * Crea una instancia de la clase `clients`, la inicializa y llama al método `vipClients`.
     * @param {string} tipo_cliente_id - ID del tipo de cliente.
     * @returns {Promise<Array>} - Array con los clientes VIP.
     * @throws {Error} - Si ocurre un error al obtener los clientes VIP.
     */
    export const vipClients = async (tipo_cliente_id) => {
        let clientInstance = new clients();
        await clientInstance.initialize();
        try {
            const client = await clientInstance.vipClients(tipo_cliente_id);
            console.log("clients:", JSON.stringify(client, null, 2));
            return client;
        } catch (error) {
            console.error("Error obtaining client...", error);
            throw error;
        } finally {
            await clientInstance.close();
        }
    };
// ______________________ CREATE USER ________________________

    export const insertUser = async (user) => {
        let clientInstance = new clients();
        await clientInstance.initialize();
        try {
            const client = await clientInstance.insertUser(user);
            console.log("clients:", JSON.stringify(client, null, 2));
            return client;
        } catch (error) {
            console.error("Error Creating client...", error);
            throw error;
        } finally {
            await clientInstance.close();
        }
    };

//_____________________________________________________________

(async () => {
// ______________________ ALL CLIENTS ________________________

// await getAllClients();

// ______________________ CLIENT STATUS BY ID ________________________

// let tipo_cliente_id = '64b28b5c3f8b9e6fdbc7febf';
// await vipClients(tipo_cliente_id);


// ______________________ CREATE USER ________________________


    // Ejemplo de usuario a insertar
    // let user = {
    //     nombre: "Juan Valdez",
    //     email: "juan.valdezz@example.com",
    //     telefono: "+123456789",
    //     direccion: "Calle Falsa 123, Ciudad, País",
    //     tipo_cliente_id: new ObjectId("64b28b5c3f8b9e6fdbc7febe"),
    //     rol: "user",
    //     password: "securepassword123" // Asegúrate de manejar las contraseñas de manera segura
    // };

    // await insertUser(user);

// ______________________ REMOVE USER ________________________


    let email = "juan.perez@example.com";

    let clientInstance = new clients();
    await clientInstance.initialize();
    try {
        await clientInstance.deleteUser(email);
    } catch (error) {
        console.error("Error Deleting user...", error);
    } finally {
        await clientInstance.close();
    }
    
})();
