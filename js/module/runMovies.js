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
        console.error("Error obteining all players", error);
        throw error;;
    } finally {
        await moviesInstance.close();
    }
};

(async() => {
//____________________ ALL MOVIES ____________________________

await getAllmovies();

})();