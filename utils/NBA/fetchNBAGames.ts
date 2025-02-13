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

    // Handle errors in the API response
    if (data.errors && data.errors.plan) {
      throw new Error(data.errors.plan);
    }

    if (!data.response || !Array.isArray(data.response)) {
      throw new Error("Invalid response structure");
    }

    console.log(`Fetched NBA Games for ${season}:`, data.response);

    return data.response as NBAGame[];
  } catch (error) {
    console.error(`Failed to fetch NBA games for ${season}`, error);
    throw new Error("Failed to fetch NBA games");
  }
};
