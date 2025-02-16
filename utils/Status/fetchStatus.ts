import { APIStatusResponse } from "@/type/Status/status";

type SportType = "BASKETBALL" | "BASEBALL" | "FOOTBALL" | "NFL";

const API_BASE_URLS: Record<SportType, string> = {
  BASKETBALL: "https://v1.basketball.api-sports.io/status",
  BASEBALL: "https://v1.baseball.api-sports.io/status",
  FOOTBALL: "https://v3.football.api-sports.io/status",
  NFL:" https://v1.american-football.api-sports.io"
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
      if (response.status === 429) {
        throw new Error("You have reached the request limit for the day. Please upgrade your plan.");
      }
      throw new Error(`API request failed with status: ${response.status} - ${response.statusText}`);
    }

    const data: APIStatusResponse = await response.json();

    if (!data.response || !data.response.subscription || !data.response.requests) {
      throw new Error("Invalid API response. Check if the plan limit is reached.");
    }

    return data;
  } catch (error) {
    console.error(`Error fetching ${sportType} API status:`, error);
    throw new Error(error instanceof Error ? error.message : `Failed to fetch ${sportType} API status.`);
  }
};
