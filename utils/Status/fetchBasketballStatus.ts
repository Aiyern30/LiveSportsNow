import { APIStatusResponse } from "@/type/Status/status";

const API_BASE_URL = "https://v1.basketball.api-sports.io/status";
const headers = {
  "x-apisports-key": process.env.NEXT_PUBLIC_API_BASKETBALL_KEY || "",
};

export const fetchBasketballStatus = async (): Promise<APIStatusResponse> => {
  if (!headers["x-apisports-key"]) {
    throw new Error("API key is missing. Please check your environment variables.");
  }

  try {
    const response = await fetch(API_BASE_URL, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("You have reached the request limit for the day. Please upgrade your plan.");
      }
      throw new Error(`API request failed with status: ${response.status} - ${response.statusText}`);
    }

    const data: APIStatusResponse = await response.json();

    // Handle API-specific errors
    if (data.errors) {
      if (data.errors.requests) {
        throw new Error("You have reached the request limit for the day. Please upgrade your plan.");
      }
      if (data.errors.plan) {
        throw new Error(`API Plan Error: ${data.errors.plan}`);
      }
    }

    if (!data.response || !data.response.subscription || !data.response.requests) {
      throw new Error("Invalid API response. Check if the plan limit is reached.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching Basketball API status:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch Basketball API status.");
  }
};
