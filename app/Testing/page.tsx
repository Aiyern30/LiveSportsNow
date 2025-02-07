"use client";

import { fetchNBAGames } from "@/utils/NBA/fetchNBAGames";
import { useEffect, useState } from "react";
import Image from "next/image";
import { NBAGame } from "@/type/NBA/game";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
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
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">NBA Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                <div className="flex-1 flex flex-col items-center min-h-[100px]">
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
                <div className="flex-1 flex flex-col items-center min-h-[100px]">
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

              {/* Quarter Scores Table */}
              <div className="mt-4">
                <h3 className="font-semibold mb-2 text-center">
                  Quarter Scores
                </h3>
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="text-center">
                      <TableHead className="text-center">Team</TableHead>
                      <TableHead className="text-center">Q1</TableHead>
                      <TableHead className="text-center">Q2</TableHead>
                      <TableHead className="text-center">Q3</TableHead>
                      <TableHead className="text-center">Q4</TableHead>
                      {game.scores.home.over_time !== null && (
                        <TableHead className="text-center">OT</TableHead>
                      )}
                      <TableHead className="text-center">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Home Team Row */}
                    <TableRow className="text-center">
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <Image
                            src={game.teams.home.logo}
                            alt={game.teams.home.name}
                            width={25}
                            height={25}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {game.scores.home.quarter_1}
                      </TableCell>
                      <TableCell className="text-center">
                        {game.scores.home.quarter_2}
                      </TableCell>
                      <TableCell className="text-center">
                        {game.scores.home.quarter_3}
                      </TableCell>
                      <TableCell className="text-center">
                        {game.scores.home.quarter_4}
                      </TableCell>
                      {game.scores.home.over_time !== null && (
                        <TableCell className="text-center">
                          {game.scores.home.over_time}
                        </TableCell>
                      )}
                      <TableCell className="text-center font-bold">
                        {game.scores.home.total}
                      </TableCell>
                    </TableRow>

                    {/* Away Team Row */}
                    <TableRow className="text-center">
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <Image
                            src={game.teams.away.logo}
                            alt={game.teams.away.name}
                            width={25}
                            height={25}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {game.scores.away.quarter_1}
                      </TableCell>
                      <TableCell className="text-center">
                        {game.scores.away.quarter_2}
                      </TableCell>
                      <TableCell className="text-center">
                        {game.scores.away.quarter_3}
                      </TableCell>
                      <TableCell className="text-center">
                        {game.scores.away.quarter_4}
                      </TableCell>
                      {game.scores.away.over_time !== null && (
                        <TableCell className="text-center">
                          {game.scores.away.over_time}
                        </TableCell>
                      )}
                      <TableCell className="text-center font-bold">
                        {game.scores.away.total}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
