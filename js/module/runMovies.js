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
        console.error("Error obtaining all movies...", error);
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
        console.error("Error obtaining the movies by id...", error);
        throw error;;
    } finally {
        await moviesInstance.close();
    }
};

//____________________ FUNCTIONS BY MOVIEID ____________________________

export const getMovieFunctionsByID =  async (idMovies) => {
    let moviesInstance = new movies();
    await moviesInstance.initialize();
    try{
        const movie = await moviesInstance.getMovieFunctionsByID(idMovies);
        console.log("Movies:", JSON.stringify(movie, null, 2));
        return movie;
    } catch (error){
        console.error("Error obtaining the functions by movie ID...", error);
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
//    let idMovies = "64b28b5c3f8b9e6fdbc7febe"; // insert the id you wanna find
//    await getMoviesByID(idMovies); // call the method

//____________________ FUNCTIONS BY MOVIEID ____________________________

 let idMovies = "64b28b5c3f8b9e6fdbc7febe";
 await getMovieFunctionsByID(idMovies);

})();