import {  Standing } from "@/type/NBA/standings";

export async function fetchNBAStandings(season: string): Promise<Standing[][]> {
  const params = new URLSearchParams({
    league: "12",
    season,
  });

  const url = `https://v1.basketball.api-sports.io/standings?${params.toString()}`;
  const headers = {
    "x-apisports-key": process.env.NEXT_PUBLIC_API_BASKETBALL_KEY || "",
  };

  if (!headers["x-apisports-key"]) {
    throw new Error("API key is missing. Please check your environment variables.");
  }

  const options = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error fetching NBA standings: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors?.requests) {
      throw new Error("You have reached the API request limit for the day. Please upgrade your plan.");
    }

    if (!data.response || !Array.isArray(data.response)) {
      throw new Error("Invalid response structure from API.");
    }

    return data.response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch NBA standings.");
  }
}
