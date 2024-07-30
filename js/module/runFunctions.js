import { ObjectId } from "mongodb";
import functions from "./casesManagement/managementFunctions.js";

//____________________ GETALL FUNCTIONS ____________________________


export const getAllFunctions =  async () => {
    let functionInstance = new functions();
    await functionInstance.initialize();
    try{
        const Function = await functionInstance.getAllFunctions();
        console.log("functions:", Function);
        return Function;
    } catch (error){
        console.error("Error obtaining all functions...", error);
        throw error;;
    } finally {
        await functionInstance.close();
    }
};

//____________________ FUNCTION HOUR BY MOVIEID ____________________________

export const getFunctionsBy___MovieID =  async (pelicula_id) => {
    let functionInstance = new functions();
    await functionInstance.initialize();
    try{
        const Function = await functionInstance.getFunctionsBy___MovieID(pelicula_id);
        console.log("Movie functions:",  JSON.stringify(Function, null, 2));
        return Function;
    } catch (error){
        console.error("Error obtaining specific movie function...", error);
        throw error;;
    } finally {
        await functionInstance.close();
    }
};
//_________________________________________________________________________________
(async() => {
//____________________ GETALL FUNCTIONS ____________________________

//    await getAllFunctions();

//____________________ FUNCTION HOUR BY MOVIEID ____________________________
    
    let pelicula_id = "64b28b5c3f8b9e6fdbc7febe" ;
    await getFunctionsBy___MovieID(pelicula_id);

})();
