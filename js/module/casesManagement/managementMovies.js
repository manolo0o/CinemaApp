import { ObjectId } from "mongodb";
import { connect } from "../../../helpers/db/connect.js";

class movies extends connect {
    static instance;

    constructor(){
        super();
        if(typeof movies.instance === "object"){
            return movies.instance;
        }
        movies.instance = this;
        return this;
    }

    async initialize(){
        await this.open();
        this.collection = this.db.collection("peliculas")    
    }
//____________________ ALL MOVIES ____________________________

    /**
     * @typedef {Object} movies
     * @property {string} _id - Movie id.
     * @property {string} titulo - movie title.
     * @property {string} descripcion - description of the movie.
     * @property {string} director - Movie director.
     * @property {string} actores - Actor from the movie.
     * @property {string} genero - Film gender.
     * @property {string} duracion - Film duration.
     * @property {string} fecha_estreno - Dremiere date.
     * @property {string} calificacion - criticism.
     * @property {string} idioma - lenguage of the movie.
     * @property {string} subtitulos - Available captions.
     * @property {string} formato - movie format (2D,3D,IMAX...ETC).
     */

    /**
     * Obtiene todos los resultados de la colección.
     * @returns {Promise<Array<Equipo>>} - Array con todos los resultados de los Noticias.
     */

    async getAllmovies(){
        let res = await this.collection.find({}).toArray();
        return res;
    }
}
export default movies;