// import axios from "axios";
import { FormData } from "./types";
//TODO: create a .env file to put this url
// const API_URL = "https://api.example.com/send-email";

export const sendForm = async (email: string, formData: FormData) => {
  console.log({
    email: email,
    formData: formData,
  });
  try {
    // const response = await axios.post(API_URL, { to: email, formData });
    console.log("ok");
    // return response.data;
  } catch (error) {
    console.error("Error sending form data:", error);
    throw error;
  }
};
