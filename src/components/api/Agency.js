import axios from "axios";
import { API_Base } from "./config";



// Base API
// const API = "https://081a-2407-d000-f-fc0a-4de6-c843-9542-504.ngrok-free.app";
const API = API_Base;



export const fetchAgencies = async () => {
    try {
        const response = await axios.get(`${API}/agency/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching agencies:", error);
        throw error;
    }
}


export const createAgency = async (agencyData) => {
    try {
        const response = await axios.post(
            `${API}/agency/create`,
            agencyData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating agency:", error);
        throw error;
    }
}

export const updateAgency = async (agencyData) => {
    try {
        const response = await axios.put(
            `${API}/agency/update`,
            agencyData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating agency:", error);
        throw error;
    }
}