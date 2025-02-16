import { APIStatusResponse } from "@/type/Status/status";

const API_BASE_URL = "https://v1.basketball.api-sports.io/status";
const headers = {
    "x-apisports-key": process.env.NEXT_PUBLIC_API_BASKETBALL_KEY || "",
  };
export const fetchBasketballStatus = async (): Promise<APIStatusResponse> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "GET",
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data: APIStatusResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Basketball API status:", error);
    throw error;
  }
};