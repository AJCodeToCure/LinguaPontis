import axios from "axios";
import { API_Base } from "./config";



// Base API
// const API = "https://081a-2407-d000-f-fc0a-4de6-c843-9542-504.ngrok-free.app";
const API = API_Base;



export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(
      `${API}/event/create`,
      eventData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};


export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API}/events`);
    return response.data.events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}


