import { NBAGroup } from "@/type/NBA/groups";

export const fetchNBAGroups = async (season: string): Promise<NBAGroup[]> => {
    const url = "https://v1.basketball.api-sports.io/teams";
    const headers = {
      "x-apisports-key": process.env.NEXT_PUBLIC_API_BASKETBALL_KEY || "",
    };
  
    const params = new URLSearchParams({
        league: "12", // NBA league ID
        season: season,
      });
    
    try {
        const response = await fetch(`${url}?${params}`, {
            headers: headers,
      });
  
      if (!response.ok) throw new Error("Failed to fetch teams");
  
      const data = await response.json();
      return data.response as NBAGroup[];
    } catch (error) {
      console.error("Error fetching teams:", error);
      return []; 
    }
  };
  