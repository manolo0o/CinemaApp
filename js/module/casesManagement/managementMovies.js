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
        this.collection = this.db.collection("peliculas");
    }

    //____________________ ALL MOVIES ____________________________

    /**
     * @typedef {Object} movies
     * @property {string} _id - ID de la película.
     * @property {string} titulo - Título de la película.
     * @property {string} descripcion - Descripción de la película.
     * @property {string} director - Director de la película.
     * @property {string} actores - Actores de la película.
     * @property {string} genero - Género de la película.
     * @property {string} duracion - Duración de la película.
     * @property {string} fecha_estreno - Fecha de estreno de la película.
     * @property {string} calificacion - Calificación de la película.
     * @property {string} idioma - Idioma de la película.
     * @property {string} subtitulos - Subtítulos disponibles para la película.
     * @property {string} formato - Formato de la película (2D, 3D, IMAX, etc.).
     */

    /**
     * Obtiene todos los documentos de la colección de películas, proyectando solo el título, ID, género y duración.
     * @returns {Promise<Array<movies>>} - Array con el resultado de la colección de películas.
     */
    async getAllmovies() {
        let res = await this.collection.find(
            {},
            {
                projection: {
                    "titulo": 1,
                    "genero": 1,
                    "duracion": 1
                }
            }
        ).toArray();
        return res;
    }

    //____________________ MOVIES BY ID ____________________________

    /**
     * Obtiene los detalles completos de una película por su ID.
     * @param {string} idMovies - ID de la película.
     * @returns {Promise<Array<movies>>} - Array con el resultado de la película solicitada.
     */
    async getMoviesByID(idMovies) {
        let res = await this.collection.find(
            {"_id": new ObjectId(idMovies)},
            {
                projection: {
                    "titulo": 1,
                    "descripcion": 1,
                    "director": 1,
                    "actores": 1,
                    "genero": 1,
                    "duracion": 1,
                    "fecha_estreno": 1,
                    "calificacion": 1,
                    "idioma": 1,
                    "subtitulos": 1,
                    "formato": 1
                }
            }
        ).toArray();
        return res;
    }

    //____________________ FUNCTIONS BY MOVIEID ____________________________

    /**
     * Obtiene las funciones asociadas a una película por su ID, incluyendo la disponibilidad de asientos y horarios.
     * @param {string} idMovies - ID de la película.
     * @returns {Promise<Array<Object>>} - Array con el resultado de las funciones asociadas a la película.
     */
    async getMovieFunctionsByID(idMovies) {
        let res = await this.collection.aggregate([
            { $match: {_id: new ObjectId(idMovies)} },
            {
                $lookup: {
                    from: "funciones",
                    localField: "_id",
                    foreignField: "pelicula_id",
                    as: "funciones"
                }
            },
            {
                $project: {
                    '_id': 0,
                    'titulo': 1,
                    'funciones.asientos_disponibles': 1,
                    'funciones.asientos_totales': 1,
                    'funciones.horas': 1
                }
            }
        ]).toArray();
        return res;
    }
}

export default movies;
