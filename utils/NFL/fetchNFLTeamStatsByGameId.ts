import { NFLTeamStatistics } from "@/type/NFL/gameTeamStatistics";

export const fetchNFLTeamStatsByGameId = async (
  gameId: string
): Promise<NFLTeamStatistics[]> => {
  const url = "https://v1.american-football.api-sports.io/games/statistics/teams";
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
      throw new Error(`Error fetching NFL Team stats: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors?.requests) {
      throw new Error("You have reached the API request limit for the day. Please upgrade your plan.");
    }

    if (!data.response || !Array.isArray(data.response)) {
      throw new Error("Invalid response structure from API.");
    }

    console.log("Fetched NFL Team Stats:", data.response);

    return data.response as NFLTeamStatistics[];
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch NFL Team stats.");
  }
};
