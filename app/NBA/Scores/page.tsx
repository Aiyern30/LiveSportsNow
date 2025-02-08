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
import { cn } from "@/lib/utils";
import DateCarousel from "@/components/DateCarousel";
import { format } from "date-fns";

const NBAStandings = () => {
  const [nbaGames, setNbaGames] = useState<NBAGame[]>([]);
  console.log("nbaGames", nbaGames);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState(new Date()); // Manage selected date
  const [enabledDates, setEnabledDates] = useState<string[]>([]); // Store enabled dates

  useEffect(() => {
    const getNBAGames = async () => {
      try {
        const data = await fetchNBAGames();
        setNbaGames(data);

        // Extract available dates from fetched games
        const availableDates = data.map((game) =>
          format(new Date(game.date), "yyyy-MM-dd")
        );
        const uniqueAvailableDates = Array.from(new Set(availableDates)); // Remove duplicates
        setEnabledDates(uniqueAvailableDates);

        // Set the default selected date to the latest available date
        const latestDate = uniqueAvailableDates.sort().pop();
        if (latestDate) {
          setSelectedDate(new Date(latestDate)); // Set to latest available date
        }
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

  // 🔹 FILTER NBA GAMES BASED ON SELECTED DATE
  const filteredGames = nbaGames.filter(
    (game) =>
      format(new Date(game.date), "yyyy-MM-dd") ===
      format(selectedDate, "yyyy-MM-dd")
  );

  return (
    <div className="mx-auto p-4">
      <DateCarousel
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        enabledDates={enabledDates} // Pass enabledDates instead of disabledDates
      />

      <h1 className="text-2xl font-bold text-center my-6">NBA Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
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
              <div className="grid grid-rows-3 grid-cols-3 text-center gap-2 items-center">
                {/* Row 1: Team Logos */}
                <div className="flex justify-center">
                  <Image
                    src={game.teams.home.logo}
                    alt={game.teams.home.name}
                    width={50}
                    height={50}
                  />
                </div>
                <p className="text-lg font-semibold row-span-2 flex items-center justify-center">
                  VS
                </p>
                <div className="flex justify-center">
                  <Image
                    src={game.teams.away.logo}
                    alt={game.teams.away.name}
                    width={50}
                    height={50}
                  />
                </div>

                {/* Row 2: Team Names */}
                <p className="text-lg font-semibold">{game.teams.home.name}</p>
                <p className="text-lg font-semibold">{game.teams.away.name}</p>

                {/* Row 3: Total Scores (Comparison Applied) */}
                <p
                  className={cn(
                    "text-2xl font-bold",
                    game.scores.home.total > game.scores.away.total &&
                      "text-green-500",
                    game.scores.home.total < game.scores.away.total &&
                      "text-red-500",
                    game.scores.home.total === game.scores.away.total &&
                      "text-orange-500"
                  )}
                >
                  {game.scores.home.total}
                </p>
                <div></div>
                <p
                  className={cn(
                    "text-2xl font-bold",
                    game.scores.away.total > game.scores.home.total &&
                      "text-green-500",
                    game.scores.away.total < game.scores.home.total &&
                      "text-red-500",
                    game.scores.away.total === game.scores.home.total &&
                      "text-orange-500"
                  )}
                >
                  {game.scores.away.total}
                </p>
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
                      {(
                        Object.keys(game.scores.home) as Array<
                          keyof typeof game.scores.home
                        >
                      )
                        .filter(
                          (q) =>
                            q !== "total" && game.scores.home[q] !== undefined
                        )
                        .map((q, index) => (
                          <TableCell
                            key={index}
                            className={cn(
                              "text-center",
                              game.scores.home[q]! > game.scores.away[q]! &&
                                "text-green-500",
                              game.scores.home[q]! < game.scores.away[q]! &&
                                "text-red-500",
                              game.scores.home[q]! === game.scores.away[q]! &&
                                "text-orange-500"
                            )}
                          >
                            {game.scores.home[q]}
                          </TableCell>
                        ))}
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
                      {(
                        Object.keys(game.scores.away) as Array<
                          keyof typeof game.scores.away
                        >
                      )
                        .filter(
                          (q) =>
                            q !== "total" && game.scores.away[q] !== undefined
                        )
                        .map((q, index) => (
                          <TableCell
                            key={index}
                            className={cn(
                              "text-center",
                              game.scores.away[q]! > game.scores.home[q]! &&
                                "text-green-500",
                              game.scores.away[q]! < game.scores.home[q]! &&
                                "text-red-500",
                              game.scores.away[q]! === game.scores.home[q]! &&
                                "text-orange-500"
                            )}
                          >
                            {game.scores.away[q]}
                          </TableCell>
                        ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>

            <CardFooter className="border-t pt-3 text-center space-x-5">
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
