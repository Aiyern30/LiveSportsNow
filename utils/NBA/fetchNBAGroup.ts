import { NBAGroup } from "@/type/NBA/groups";

export const fetchNBAGroups = async (season: string): Promise<NBAGroup[]> => {
  const url = "https://v1.basketball.api-sports.io/teams";
  const headers = {
    "x-apisports-key": process.env.NEXT_PUBLIC_API_BASKETBALL_KEY || "",
  };

  if (!headers["x-apisports-key"]) {
    throw new Error("API key is missing. Please check your environment variables.");
  }

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
      throw new Error(`Error fetching NBA teams: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Handle API-specific errors
    if (data.errors) {
      if (data.errors.requests) {
        throw new Error(
          "You have reached the request limit for the day. Please upgrade your plan."
        );
      }
      if (data.errors.plan) {
        throw new Error(`API Plan Error: ${data.errors.plan}`);
      }
    }

    if (!data.response || !Array.isArray(data.response)) {
      throw new Error("Invalid response structure from API.");
    }

    return data.response as NBAGroup[];
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch NBA teams.");
  }
};
