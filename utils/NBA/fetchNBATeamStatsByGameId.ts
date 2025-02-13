import {  TeamStatistics } from "@/type/NBA/gameTeams";

export const fetchNBATeamStatsByGameId = async (
    gameId: string
  ): Promise<[TeamStatistics]> => {
    const url = "https://v1.basketball.api-sports.io/games/statistics/teams";
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
        throw new Error(`Error fetching NBA Team stats: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (!data.response || !Array.isArray(data.response)) {
        throw new Error("Invalid response structure");
      }
  
      console.log("Fetched NBA Team Stats:", data.response);
  
      return data.response; 
    } catch (error) {
      console.error("Failed to fetch NBA Team stats", error);
      throw new Error("Failed to fetch NBA Team stats");
    }
  };
  