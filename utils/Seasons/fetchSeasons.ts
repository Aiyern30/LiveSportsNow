import { SportType } from "@/type/SportType";

const API_BASE_URLS: Record<SportType, string> = {
  BASKETBALL: "https://v1.basketball.api-sports.io/seasons",
  BASEBALL: "https://v1.baseball.api-sports.io/seasons",
  FOOTBALL: "https://v3.football.api-sports.io/seasons",
  NFL: "https://v1.american-football.api-sports.io/seasons",
};

export const fetchSeasons = async (sportType: SportType): Promise<string[]> => {
  const url = API_BASE_URLS[sportType];

  if (!url) {
    throw new Error(`Invalid sport type: ${sportType}`);
  }

  const headers = {
    "x-apisports-key": process.env.NEXT_PUBLIC_API_SPORTS_KEY || "",
  };

  if (!headers["x-apisports-key"]) {
    throw new Error("API key is missing. Please check your environment variables.");
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error fetching seasons: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || [];
  } catch (error) {
    console.error(`Error fetching ${sportType} seasons:`, error);
    return [];
  }
};
