import axios from "axios";

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(
      "https://081a-2407-d000-f-fc0a-4de6-c843-9542-504.ngrok-free.app/event/create",
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