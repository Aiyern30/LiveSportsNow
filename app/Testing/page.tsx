// NBAStandings.tsx

"use client";
import { StandingsData } from "@/type/NBA/standing";
import { fetchNBAGames } from "@/utils/NBA/fetchNBA";
import { useEffect, useState } from "react";

const NBAStandings = () => {
  const [nbaStandings, setNbaStandings] = useState<StandingsData | null>(null);
  console.log(nbaStandings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getNBAStandings = async () => {
      try {
        const data = await fetchNBAGames();
        setNbaStandings(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(`Failed to fetch NBA standings: ${error.message}`);
        } else {
          setError("An unknown error occurred while fetching NBA standings.");
        }
      } finally {
        setLoading(false);
      }
    };

    getNBAStandings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>NBA Standings</h1>
      {/* Displaying standings here */}
    </div>
  );
};

export default NBAStandings;
