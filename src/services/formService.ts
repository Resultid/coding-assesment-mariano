import axios from "axios";

//TODO: create a .env file to put this url
const API_URL = "https://api.example.com/send-email";

interface FormData {
  [key: string]: string;
}

export const sendForm = async (email: string, formData: FormData) => {
  try {
    const response = await axios.post(API_URL, { to: email, formData });
    return response.data;
  } catch (error) {
    console.error("Error sending form data:", error);
    throw error;
  }
};
