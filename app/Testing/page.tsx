"use client";

import { fetchNBAGames } from "@/utils/NBA/fetchNBAGames";
import { useEffect, useState } from "react";
import Image from "next/image";
import { NBAGame } from "@/type/NBA/game";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui";

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

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">NBA Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nbaGames.map((game) => (
          <Card key={game.id} className="p-4 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-lg font-bold">
                {game.league.name} - {game.league.season}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {new Date(game.date).toLocaleString()}
              </p>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between items-center text-center">
                {/* Home Team */}
                <div className="flex flex-col items-center">
                  <Image
                    src={game.teams.home.logo}
                    alt={game.teams.home.name}
                    width={50}
                    height={50}
                  />
                  <p className="text-lg font-semibold">
                    {game.teams.home.name}
                  </p>
                  <p className="text-2xl font-bold">{game.scores.home.total}</p>
                </div>

                <p className="text-lg font-semibold">VS</p>

                {/* Away Team */}
                <div className="flex flex-col items-center">
                  <Image
                    src={game.teams.away.logo}
                    alt={game.teams.away.name}
                    width={50}
                    height={50}
                  />
                  <p className="text-lg font-semibold">
                    {game.teams.away.name}
                  </p>
                  <p className="text-2xl font-bold">{game.scores.away.total}</p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t pt-3 text-center">
              <p className="text-sm text-gray-600">
                Venue: <span className="font-semibold">{game.venue}</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                <Image
                  src={game.country.flag}
                  alt={game.country.name}
                  width={20}
                  height={15}
                />
                {game.country.name}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NBAStandings;
