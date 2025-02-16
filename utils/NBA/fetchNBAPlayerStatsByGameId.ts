import { PlayerStats } from "@/type/NBA/gamePlayer";

export const fetchNBAPlayerStatsByGameId = async (
  gameId: string
): Promise<PlayerStats[]> => {
  const url = "https://v1.basketball.api-sports.io/games/statistics/players";
  const headers = {
    "x-apisports-key": process.env.NEXT_PUBLIC_API_SPORTS_KEY || "",
  };

  if (!headers["x-apisports-key"]) {
    throw new Error("API key is missing. Please check your environment variables.");
  }

  const params = new URLSearchParams({ id: gameId });

  try {
    const response = await fetch(`${url}?${params}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Error fetching NBA player stats: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Handle API-specific errors
    if (data.errors?.requests) {
      throw new Error("You have reached the API request limit for the day. Please upgrade your plan.");
    }

    if (!data.response || !Array.isArray(data.response)) {
      throw new Error("Invalid response structure from API.");
    }

    console.log("Fetched NBA Player Stats:", data.response);
    return data.response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch NBA player stats.");
  }
};
