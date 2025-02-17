import { TeamStatistics } from "@/type/NBA/gameTeamStatistics";

export const fetchNBATeamStatsByGameId = async (
  gameId: string
): Promise<TeamStatistics[]> => {
  const url = "https://v1.basketball.api-sports.io/games/statistics/teams";
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
      throw new Error(`Error fetching NBA Team stats: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors?.requests) {
      throw new Error("You have reached the API request limit for the day. Please upgrade your plan.");
    }

    if (!data.response || !Array.isArray(data.response)) {
      throw new Error("Invalid response structure from API.");
    }

    console.log("Fetched NBA Team Stats:", data.response);

    return data.response as TeamStatistics[];
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch NBA Team stats.");
  }
};
