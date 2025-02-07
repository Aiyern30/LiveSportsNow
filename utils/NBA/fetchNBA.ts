// utils/fetchNBA.ts

export const fetchNBAGames = async () => {
  const url = "https://v1.basketball.api-sports.io/games";
  const headers = {
    "x-apisports-key": process.env.NEXT_PUBLIC_API_BASKETBALL_KEY || "", 
  };

  // Adding league, season, and date parameters
  const params = new URLSearchParams({
    league: "12",  // NBA league ID
    season: "2023-2024", // Correct season format
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
    console.log("Fetched NBA Games:", data); // Log response for debugging
    return data;
  } catch (error) {
    console.error("Failed to fetch NBA games", error);
    throw new Error("Failed to fetch NBA games");
  }
};
