import { NBAGame } from "@/type/NBA/game";

export const fetchNBAGames = async (season: string): Promise<NBAGame[]> => {
  const url = "https://v1.basketball.api-sports.io/games";
  const headers = {
    "x-apisports-key": process.env.NEXT_PUBLIC_API_BASKETBALL_KEY || "",
  };

  const params = new URLSearchParams({
    league: "12", // NBA league ID
    season: season,
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

    if (data.errors && data.errors.plan) {
      throw new Error(data.errors.plan); 
    }

    if (!data.response || !Array.isArray(data.response)) {
      throw new Error("Invalid response structure");
    }

    return data.response as NBAGame[];
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch NBA games");
  }
};
