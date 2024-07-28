import { ObjectId } from "mongodb";
import movies from "./casesManagement/managementMovies.js"

//____________________ ALL MOVIES ____________________________

export const getAllmovies =  async () => {
    let moviesInstance = new movies();
    await moviesInstance.initialize();
    try{
        const movie = await moviesInstance.getAllmovies();
        console.log("Movies:", movie);
        return movie;
    } catch (error){
        console.error("Error obtaining all players", error);
        throw error;;
    } finally {
        await moviesInstance.close();
    }
};

//____________________ MOVIES BY ID ____________________________

export const getMoviesByID =  async (idMovies) => {
    let moviesInstance = new movies();
    await moviesInstance.initialize();
    try{
        const movie = await moviesInstance.getMoviesByID(idMovies);
        console.log("Movies:", movie);
        return movie;
    } catch (error){
        console.error("Error obtaining all players", error);
        throw error;;
    } finally {
        await moviesInstance.close();
    }
};

(async() => {
//____________________ ALL MOVIES ____________________________

//await getAllmovies();

//____________________ MOVIES BY ID ____________________________

// Parameter to find the movie
    let idMovies = "64b28b5c3f8b9e6fdbc7febe"; // insert the id you wanna find
    await getMoviesByID(idMovies); // call the method

})();