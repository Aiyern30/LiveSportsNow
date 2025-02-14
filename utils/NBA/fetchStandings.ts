import { ApiResponse, Standing } from "@/type/NBA/standings";

export async function fetchNBAStandings(season: string,): Promise<Standing[][]> {
    const params = new URLSearchParams({
      league: "12",
      season,
    });
  
    const url = `https://v1.basketball.api-sports.io/standings?${params.toString()}`;
    const headers = {
        "x-apisports-key": process.env.NEXT_PUBLIC_API_BASKETBALL_KEY || "",
      };
  
    const options = {
      method: "GET",
      headers,
    };
  
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error fetching NBA standings: ${response.statusText}`);
    }
  
    const data: ApiResponse = await response.json();
    return data.response;
  }