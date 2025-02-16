import { APIStatusResponse } from "@/type/Status/status";

type SportType = "BASKETBALL" | "BASEBALL" | "FOOTBALL" | "NFL";

const API_BASE_URLS: Record<SportType, string> = {
  BASKETBALL: "https://v1.basketball.api-sports.io/status",
  BASEBALL: "https://v1.baseball.api-sports.io/status",
  FOOTBALL: "https://v3.football.api-sports.io/status",
  NFL:"https://v1.american-football.api-sports.io/status"
};

export const fetchSportsStatus = async (sportType: SportType): Promise<APIStatusResponse> => {
  const apiUrl = API_BASE_URLS[sportType];

  if (!apiUrl) {
    throw new Error(`Invalid sport type: ${sportType}`);
  }

  const headers = {
    "x-apisports-key": process.env.NEXT_PUBLIC_API_SPORTS_KEY || "",
  };

  if (!headers["x-apisports-key"]) {
    throw new Error("API key is missing. Please check your environment variables.");
  }

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error fetching Status: ${response.status} - ${response.statusText}`);
    }

    const data: APIStatusResponse = await response.json();

    // Handle API-specific errors
    if (data.errors) {
      if (data.errors.requests) {
        throw new Error(
          "You have reached the request limit for the day. Please upgrade your plan."
        );
      }
      if (data.errors.plan) {
        throw new Error(`API Plan Error: ${data.errors.plan}`);
      }
    }

    if (!data.response || typeof data.response !== "object") {
      throw new Error("Invalid response structure from API.");
    }
    

    return data;
  } catch (error) {
    console.error(`Error fetching ${sportType} API status:`, error);
    throw new Error(error instanceof Error ? error.message : `Failed to fetch ${sportType} API status.`);
  }
};
