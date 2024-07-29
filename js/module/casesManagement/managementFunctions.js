import { ObjectId } from "mongodb";
import { connect } from "../../../helpers/db/connect.js";

class functions extends connect {
    static instance;

    constructor(){
        super();
        if(typeof functions.instance === "object"){
            return functions.instance;
        }
        functions.instance = this;
        return this;
    }

    async initialize(){
        await this.open();
        this.collection = this.db.collection("funciones")    
    }

//____________________ GETALL FUNCTIONS ____________________________

    /**
     * @typedef {Object} functions
     * @property {string} functionsID - Movie id.
     * @property {string} pelicula_id - movie title.
     * @property {string} cine_id - cinema id.
     * @property {string} fecha_hora - date_hour.
     * @property {string} sala - cinema hall.
     * @property {string} asientos_disponibles - available seats.
     * @property {string} asientos_totales _ total seats.
     * @property {string} precio - price.
     */

    /**
     * get the result of the collection.
     * @returns {Promise<Array<functions>>} - Array with the result of functions collection.
     */
    async getAllFunctions(){
        let res = await this.collection.find(
            {}
        ).toArray();
        return res;
    }
//____________________ GET AVAILABLE SEATS ____________________________


}
export default functions;