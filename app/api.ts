// api.ts

import axios from "axios";
import { UserResponseProps } from "./App";

export async function submitResponse(data: UserResponseProps): Promise<any> {
  const api: string = process.env.NEXT_PUBLIC_MONGODB_API || "";

  try {
    const res = await axios.post(api + "/path", data);

    return res.data; // Assuming you want to return the response data
  } catch (error: any) {
    // Handle the error
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      console.error("Error message:", error.message);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
      }
    } else {
      // General error handling
      console.error("Error:", error.message);
    }

    // You can throw the error to be handled by the caller function or return a custom error object
    throw error;
    // Or return a custom error object
    // return { error: true, message: error.message };
  }
}
