import { handleError } from "@/Helpers/ErrorHandler";
import axios from "axios";

const api = "https://pethealthcaresystem.azurewebsites.net/api/pet";

export const petsOfCustomerAPI = async (
    username: string
) => {
    try {
        const data = await axios.get(api + `/user-pet/${username}`);
        return data;    
    } catch (error) {
        handleError(error)
    }
};

export const updatePetData = async (
    petId: number,
    petData: {
        name: string;
        species: string;
        breed: string;
        gender: boolean;
        imageURL: string;
    }
) => {
    try {
        const data = await axios.put(api + `/${petId}`, petData);
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const getPetById = async (petId: string) => {
    try {
      const data = await axios.get(api + `/${petId}`);
      return data;
    } catch (error) {
      handleError(error);
    }
  };
  