import axios from "axios";
import { API_Base } from "./config";



// Base API
// const API = "https://081a-2407-d000-f-fc0a-4de6-c843-9542-504.ngrok-free.app";
const API = API_Base;


export const login = async (username , password) => {
    try {
        const response = await axios.post(
            `${API}/login`,
            {
                username: username,
                password: password
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}