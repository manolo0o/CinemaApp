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
        console.error("Error obtaining all movies...", error);
        throw error;;
    } finally {
        await functionInstance.close();
    }
};
//_________________________________________________________________________________
(async() => {
//____________________ GETALL FUNCTIONS ____________________________

    await getAllFunctions();

})();
