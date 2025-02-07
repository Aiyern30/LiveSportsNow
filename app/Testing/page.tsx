"use client";
import { NBAGame } from "@/type/NBA/game";
import { fetchNBAGames } from "@/utils/NBA/fetchNBAGames";
import { useEffect, useState } from "react";

const NBAStandings = () => {
  const [nbaGames, setNbaGames] = useState<NBAGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getNBAGames = async () => {
      try {
        const data = await fetchNBAGames();
        setNbaGames(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(`Failed to fetch NBA games: ${error.message}`);
        } else {
          setError("An unknown error occurred while fetching NBA games.");
        }
      } finally {
        setLoading(false);
      }
    };

    getNBAGames();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>NBA Games</h1>
      <ul>
        {nbaGames.map((game) => (
          <li key={game.id}>
            <p>
              <strong>{game.teams.home.name}</strong> vs{" "}
              <strong>{game.teams.away.name}</strong>
            </p>
            <p>
              Score: {game.scores.home.total} - {game.scores.away.total}
            </p>
            <p>Venue: {game.venue}</p>
            <p>Date: {new Date(game.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NBAStandings;
