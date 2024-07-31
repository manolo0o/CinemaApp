import { ObjectId } from "mongodb";
import { connect } from "../../../helpers/db/connect.js";

class tickets extends connect {
    static instance;

    constructor() {
        super();
        if (typeof tickets.instance === "object") {
            return tickets.instance;
        }
        tickets.instance = this;
        return this;
    }

    async initialize() {
        await this.open();
        this.collection = this.db.collection("boletos");
    }

    //____________________ ALL BUYED TICKETS ____________________________

    /**
     * @typedef {Object} tickets
     * @property {string} idTickets - ID del ticket.
     * @property {string} funcion_id - ID de la función.
     * @property {string} cliente_id - ID del cliente.
     * @property {string} asiento - Asiento asignado.
     * @property {string} precio - Precio del ticket.
     * @property {string} fecha_compra - Fecha de compra.
     * @property {string} descuento_aplicado - Descuento aplicado.
     * @property {string} método_pago - Método de pago.
     */

    /**
     * Obtiene todos los tickets comprados.
     * @returns {Promise<Array<tickets>>} - Array con el resultado de los tickets comprados.
     * @throws {Error} - Lanza un error si ocurre algún problema al obtener los tickets.
     */
    async getAll__BuyedTickets() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    //____________________ AVAILABLE SEATS ____________________________

    /**
     * Obtiene los asientos disponibles y totales para una función específica.
     * @param {string} funcion_id - ID de la función.
     * @returns {Promise<Array<Object>>} - Array con la información de los asientos disponibles y totales.
     * @throws {Error} - Lanza un error si ocurre algún problema al obtener los asientos disponibles.
     */
    async getAvailableSeatsByFunctionID(funcion_id) {
        let res = await this.collection.aggregate([
            { $match: { _id: new ObjectId(funcion_id) } },
            {
                $lookup: {
                    from: "funciones",
                    localField: "funcion_id",
                    foreignField: "_id",
                    as: "asientos disponibles y totales",
                    pipeline: [
                        {
                            $project: {
                                '_id': 0,
                                'asientos_disponibles': 1,
                                'asientos_totales': 1
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    '_id': 0,
                    'asientos disponibles y totales': 1
                }
            }
        ]).toArray();
        return res;
    }

    //____________________ OCCUPIED SEATS BY FUNCTIONID ____________________________

    /**
     * Obtiene los asientos ocupados para una función específica.
     * @param {string} funcion_id - ID de la función.
     * @returns {Promise<Array<Object>>} - Array con la información de los asientos ocupados.
     * @throws {Error} - Lanza un error si ocurre algún problema al obtener los asientos ocupados.
     */
    async getOccupiedSeatsByFunctionID(funcion_id) {
        let res = await this.collection.find(
            { "funcion_id": new ObjectId(funcion_id) },
            {
                projection: {
                    "_id": 0,
                    "asiento": 1,
                    "cliente_id": 1
                }
            }
        ).toArray();
        return res;
    }

    //____________________ ADD TICKET ____________________________

    /**
     * Agrega un nuevo ticket para una función específica.
     * @param {string} funcion_id - ID de la función.
     * @param {string} cliente_id - ID del cliente.
     * @param {string} asiento - Asiento asignado.
     * @param {string} precio - Precio del ticket.
     * @param {string} fecha_compra - Fecha de compra.
     * @param {string} descuento_aplicado - Descuento aplicado.
     * @param {string} método_pago - Método de pago.
     * @param {string} hora_funcion - Hora de la función.
     * @returns {Promise<Object>} - Resultado de la inserción del ticket.
     * @throws {Error} - Lanza un error si ocurre algún problema al agregar el ticket.
     */
    async addTicket(
        funcion_id,
        cliente_id,
        asiento,
        precio,
        fecha_compra,
        descuento_aplicado,
        método_pago,
        hora_funcion
    ) {
        console.log("Adding Ticket", {
            funcion_id,
            cliente_id,
            asiento,
            precio,
            fecha_compra,
            descuento_aplicado,
            método_pago,
            hora_funcion
        });

        try {
            const asientoExistente = await this.collection.findOne({
                funcion_id: new ObjectId(funcion_id),
                asiento: asiento
            });

            if (asientoExistente) {
                throw new Error('El asiento ya está ocupado.');
            }

            // Verificar si hay asientos disponibles en la colección funciones
            const funcionesCollection = this.db.collection('funciones');
            const funcion = await funcionesCollection.findOne({
                _id: new ObjectId(funcion_id),
                asientos_disponibles: { $gt: 0 }
            });

            if (!funcion) {
                throw new Error('No hay asientos disponibles.');
            }

            // Actualizar el número de asientos disponibles
            await funcionesCollection.updateOne(
                { _id: new ObjectId(funcion_id) },
                { $inc: { asientos_disponibles: -1 } }
            );

            const resultado = await this.collection.insertOne({
                funcion_id: new ObjectId(funcion_id),
                cliente_id: new ObjectId(cliente_id),
                asiento: asiento,
                precio: precio,
                fecha_compra: new Date(fecha_compra),
                descuento_aplicado: descuento_aplicado,
                método_pago: método_pago,
                hora_funcion: hora_funcion
            });

            console.log("Resultado:", resultado);
            return resultado;
        } catch (error) {
            console.error("Error al comprar Ticket", error);
            throw error;
        }
    }
}

export default tickets;
