// api.ts

import { UserResponseProps } from "./App";

export async function submitResponse(data: UserResponseProps): Promise<void> {
  const api: string = process.env.NEXT_PUBLIC_MONGODB_API || "";
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("API Response:", result);
  } catch (error) {
    console.error("API Error:", error);
  }
}
