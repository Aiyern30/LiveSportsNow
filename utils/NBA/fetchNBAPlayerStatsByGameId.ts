import { NBAPlayerStatsResponse, PlayerStats } from "@/type/NBA/gamePlayer";

export const fetchNBAPlayerStatsByGameId = async (
    gameId: string
  ): Promise<PlayerStats[]> => {
    const url = "https://v1.basketball.api-sports.io/games/statistics/players";
    const headers = {
      "x-apisports-key": process.env.NEXT_PUBLIC_API_BASKETBALL_KEY || "",
    };
  
    const params = new URLSearchParams({
      id: gameId, 
    });
  
    try {
      const response = await fetch(`${url}?${params}`, {
        method: "GET",
        headers: headers,
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching NBA player stats: ${response.statusText}`);
      }
  
      const data: NBAPlayerStatsResponse = await response.json();
  
      if (!data.response || !Array.isArray(data.response)) {
        throw new Error("Invalid response structure");
      }
  
      console.log("Fetched NBA Player Stats:", data.response);
  
      return data.response; 
    } catch (error) {
      console.error("Failed to fetch NBA player stats", error);
      throw new Error("Failed to fetch NBA player stats");
    }
  };
  