import { ObjectId } from "mongodb";
import movies from "./casesManagement/managementMovies.js";

//____________________ ALL MOVIES ____________________________

/**
 * Obtiene todos los documentos de la colección de películas y los muestra en la consola.
 * @returns {Promise<Array<Object>>} - Array con el resultado de la colección de películas.
 * @throws {Error} - Lanza un error si ocurre algún problema al obtener las películas.
 */
export const getAllmovies = async () => {
    let moviesInstance = new movies();
    await moviesInstance.initialize();
    try {
        const movie = await moviesInstance.getAllmovies();
        console.log("Movies:", movie);
        return movie;
    } catch (error) {
        console.error("Error obtaining all movies...", error);
        throw error;
    } finally {
        await moviesInstance.close();
    }
};

//____________________ MOVIES BY ID ____________________________

/**
 * Obtiene los detalles completos de una película por su ID.
 * @param {string} idMovies - ID de la película que se desea obtener.
 * @returns {Promise<Array<Object>>} - Array con el resultado de la película solicitada.
 * @throws {Error} - Lanza un error si ocurre algún problema al obtener la película por ID.
 */
export const getMoviesByID = async (idMovies) => {
    let moviesInstance = new movies();
    await moviesInstance.initialize();
    try {
        const movie = await moviesInstance.getMoviesByID(idMovies);
        console.log("Movies:", movie);
        return movie;
    } catch (error) {
        console.error("Error obtaining the movies by id...", error);
        throw error;
    } finally {
        await moviesInstance.close();
    }
};

//____________________ FUNCTIONS BY MOVIEID ____________________________

/**
 * Obtiene las funciones asociadas a una película por su ID, incluyendo la disponibilidad de asientos y horarios.
 * @param {string} idMovies - ID de la película para la que se desean obtener las funciones.
 * @returns {Promise<Array<Object>>} - Array con el resultado de las funciones asociadas a la película.
 * @throws {Error} - Lanza un error si ocurre algún problema al obtener las funciones por ID de película.
 */
export const getMovieFunctionsByID = async (idMovies) => {
    let moviesInstance = new movies();
    await moviesInstance.initialize();
    try {
        const movie = await moviesInstance.getMovieFunctionsByID(idMovies);
        console.log("Movies:", JSON.stringify(movie, null, 2));
        return movie;
    } catch (error) {
        console.error("Error obtaining the functions by movie ID...", error);
        throw error;
    } finally {
        await moviesInstance.close();
    }
};

// Ejecuta las funciones para pruebas
(async () => {
    //____________________ ALL MOVIES ____________________________

    // Obtiene todas las películas
    // await getAllmovies();

    //____________________ MOVIES BY ID ____________________________

    // Parámetro para encontrar la película
    // let idMovies = "64b28b5c3f8b9e6fdbc7febe"; // Inserta el ID que deseas encontrar
    // await getMoviesByID(idMovies); // Llama al método

    //____________________ FUNCTIONS BY MOVIEID ____________________________

    let idMovies = "64b28b5c3f8b9e6fdbc7febe";
    await getMovieFunctionsByID(idMovies);

})();
