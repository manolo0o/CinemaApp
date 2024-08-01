import { ObjectId } from "mongodb";
import { connect } from "../../../helpers/db/connect.js";

/**
 * Clase `clients` que maneja las operaciones de la colección `clientes` en MongoDB.
 * Se extiende de la clase `connect` para gestionar la conexión a la base de datos.
 */
class clients extends connect {
    static instance;

    /**
     * Constructor de la clase `clients`.
     * Implementa el patrón Singleton para asegurar que solo haya una instancia de la clase.
     */
    constructor() {
        super();
        if (typeof clients.instance === "object") {
            return clients.instance;
        }
        clients.instance = this;
        return this;
    }

    /**
     * Método para inicializar la conexión a la base de datos y obtener la colección `clientes`.
     * @returns {Promise<void>}
     */
    async initialize() {
        await this.open();
        this.collection = this.db.collection("clientes");
    }


    // ______________________ ALL CLIENTS ________________________

    /**
     * @typedef {Object} Client
     * @property {string} idClient - ID del cliente.
     * @property {string} name - Nombre del cliente.
     * @property {string} email - Email del cliente.
     * @property {string} telefono - Teléfono del cliente.
     * @property {string} direccion - Dirección del cliente.
     * @property {string} tipo_cliente_id - ID del tipo de cliente.
     * @property {string} reservas - Reservas del cliente.
     */

    /**
     * Obtiene todos los clientes de la colección.
     * @returns {Promise<Array<Client>>} - Array con todos los clientes.
     */
    async getAllClients() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    // ______________________ CLIENT STATUS BY ID ________________________

    /**
     * @typedef {Object} Client
     * @property {string} idClient - ID del cliente.
     * @property {string} name - Nombre del cliente.
     * @property {string} email - Email del cliente.
     * @property {string} telefono - Teléfono del cliente.
     * @property {string} direccion - Dirección del cliente.
     * @property {string} tipo_cliente_id - ID del tipo de cliente.
     * @property {string} reservas - Reservas del cliente.
     */

    /**
     * Obtiene clientes VIP basados en su tipo.
     * @param {string} tipo_cliente_id - ID del tipo de cliente.
     * @returns {Promise<Array<Client>>} - Array con los clientes VIP.
     */
    async vipClients(tipo_cliente_id) {
        let res = await this.collection.aggregate([
            { $match: { tipo_cliente_id: new ObjectId(tipo_cliente_id) } },
            {
                $lookup: {
                    from: "tipoCliente",
                    localField: "tipo_cliente_id",
                    foreignField: "_id",
                    as: "tipoClienteInfo",
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                nombre: 1,
                                descuento: 1
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    _id: 0,
                    tipo_cliente_id: 0,
                    reservas: 0
                }
            }
        ]).toArray();
        return res;
    }

// ______________________ CREATE USER ________________________

/**
 * Inserta un nuevo usuario en la colección 'clientes' y crea un usuario en MongoDB con el rol especificado.
 *
 * Este método realiza las siguientes acciones:
 * 1. Inserta el documento del usuario en la colección 'clientes'.
 * 2. Valida el rol y las credenciales del usuario.
 * 3. Crea un usuario en MongoDB con el rol especificado si el rol es válido.
 *
 * @param {Object} user - El objeto de usuario a insertar y crear. Debe tener las siguientes propiedades:
 *   @param {string} user.email - El correo electrónico del usuario, usado como nombre de usuario para el usuario en MongoDB.
 *   @param {string} user.password - La contraseña para el usuario en MongoDB.
 *   @param {string} user.rol - El rol del usuario. Debe ser 'user' o 'admin'.
 *   @param {string} user.nombre - El nombre del usuario.
 *   @param {string} user.telefono - El número de teléfono del usuario.
 *   @param {string} user.direccion - La dirección del usuario.
 *   @param {ObjectId} user.tipo_cliente_id - El ObjectId del tipo de cliente asociado con el usuario.
 *
 * @returns {Promise<Object>} - Una promesa que se resuelve con el resultado del comando MongoDB para crear el usuario.
 *
 * @throws {Error} - Lanza un error si el rol es inválido o si ocurre un error al crear el usuario en MongoDB.
 */
async insertUser(user) {
    // Insertar el usuario en la colección 'clientes'
    const result = await this.collection.insertOne(user);
    console.log('Usuario insertado con id:', result.insertedId);

    // Asegurar que el rol y las credenciales sean válidos antes de crear el usuario en MongoDB
    if (user.rol === "user" || user.rol === "admin") {
        try {
            const createUserResult = await this.db.command({
                createUser: user.email, // Suponiendo que 'email' se usa como nombre de usuario
                pwd: user.password, // Asegúrate de que 'password' se usa para la contraseña
                roles: [{ role: user.rol, db: "CineCampus" }] // Usa la base de datos correcta
            });
            console.log("Usuario en MongoDB creado con éxito.");
            return createUserResult;
        } catch (error) {
            console.error("Error al crear el usuario en MongoDB:", error);
            throw error;
        }
    } else {
        console.log("Error: Rol inválido");
        throw new Error("Rol inválido");
    }
}

// ______________________ REMOVE USER ________________________

/**
 * Elimina un usuario de la colección 'clientes' y también lo elimina de la base de datos MongoDB.
 *
 * Este método realiza las siguientes acciones:
 * 1. Elimina el documento del usuario de la colección 'clientes'.
 * 2. Elimina el usuario de la base de datos MongoDB.
 *
 * @param {string} email - El correo electrónico del usuario a eliminar. Se utiliza tanto para eliminar el documento en la colección como para eliminar el usuario en MongoDB.
 *
 * @returns {Promise<Object>} - Una promesa que se resuelve con el resultado del comando MongoDB para eliminar el usuario.
 *
 * @throws {Error} - Lanza un error si ocurre un problema al eliminar el usuario de la colección o de la base de datos MongoDB.
 */
async deleteUser(email) {
    try {
        // Eliminar el usuario de la colección 'clientes'
        const deleteFromCollectionResult = await this.collection.deleteOne({ email: email });
        if (deleteFromCollectionResult.deletedCount === 0) {
            console.log("Error: Usuario no encontrado en la colección 'clientes'.");
            return;
        }
        console.log('Usuario eliminado de la colección con el email:', email);

        // Eliminar el usuario de la base de datos MongoDB
        const deleteUserResult = await this.db.command({
            dropUser: email
        });

        console.log('Usuario en MongoDB eliminado con éxito.');
        return deleteUserResult;
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        throw error;
    }
}



}

export default clients;
