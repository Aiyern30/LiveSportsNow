export const fetchSeasons = async (): Promise<string[]> => {
    const url = "https://v1.basketball.api-sports.io/seasons";
    const headers = {
      "x-apisports-key": process.env.NEXT_PUBLIC_API_SPORTS_KEY || "", 
    };  
    try {
        const response = await fetch(`${url}`, {
            method: "GET",
        headers: headers
      });
  
      const data = await response.json();
      return data.response || []; 
    } catch (error) {
      console.log("Error fetching seasons:", error);
      return [];
    }
  };
  
