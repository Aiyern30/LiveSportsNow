import { TeamStatistics } from "@/type/NBA/gameTeams";

export const fetchGameStatistics = async (gameId: number): Promise<TeamStatistics[]> => {
  const url = `https://v1.basketball.api-sports.io/games/statistics/teams`;
  const headers = {
    "x-apisports-key": process.env.NEXT_PUBLIC_API_BASKETBALL_KEY || "", // Your API key
  };

  const params = new URLSearchParams({
    id: gameId.toString(), // Pass the game ID to fetch statistics
  });

  try {
    const response = await fetch(`${url}?${params}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Error fetching game statistics: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.response || !Array.isArray(data.response)) {
      throw new Error("Invalid response structure");
    }

    console.log("Fetched Team Statistics:", data.response);

    return data.response as TeamStatistics[];
  } catch (error) {
    console.error("Failed to fetch game statistics", error);
    throw new Error("Failed to fetch game statistics");
  }
};
