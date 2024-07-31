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
}

export default clients;
