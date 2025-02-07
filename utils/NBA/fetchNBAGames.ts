import { NBAGame } from "@/type/NBA/game";

export const fetchNBAGames = async (): Promise<NBAGame[]> => {
  const url = "https://v1.basketball.api-sports.io/games";
  const headers = {
    "x-apisports-key": process.env.NEXT_PUBLIC_API_BASKETBALL_KEY || "", 
  };

  // Adding league and season parameters
  const params = new URLSearchParams({
    league: "12", // NBA league ID
    season: "2023-2024",
    // date:"10/6/2023"
  });

  try {
    const response = await fetch(`${url}?${params}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Error fetching NBA games: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.response || !Array.isArray(data.response)) {
      throw new Error("Invalid response structure");
    }

    console.log("Fetched NBA Games:", data.response); // Debugging

    return data.response as NBAGame[];
  } catch (error) {
    console.error("Failed to fetch NBA games", error);
    throw new Error("Failed to fetch NBA games");
  }
};
