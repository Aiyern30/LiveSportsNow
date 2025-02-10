"use client";
import { useDeviceType } from "@/lib/useDevicesType";
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
  Skeleton,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import DateCarousel from "@/components/DateCarousel";
import { format } from "date-fns";
import { DatePickerDemo } from "@/components/DatePickerDemo";
import ViewSelector from "@/components/ViewSelector";

const NBAStandings = () => {
  const { isMobile, isDesktop, isTablet } = useDeviceType();
  const [view, setView] = useState("list");

  useEffect(() => {
    const savedView = localStorage.getItem("viewPreference");
    if (savedView) {
      setView(savedView);
    }
  }, []);

  const handleViewChange = (newView: string) => {
    setView(newView);
    localStorage.setItem("viewPreference", newView);
  };
  const [nbaGames, setNbaGames] = useState<NBAGame[]>([]);
  console.log("nbaGames", nbaGames);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [enabledDates, setEnabledDates] = useState<string[]>([]);

  useEffect(() => {
    const getNBAGames = async () => {
      try {
        const data = await fetchNBAGames();
        setNbaGames(data);

        // Extract available dates from fetched games
        const availableDates = data.map((game) =>
          format(new Date(game.date), "yyyy-MM-dd")
        );
        const uniqueAvailableDates = Array.from(new Set(availableDates));
        setEnabledDates(uniqueAvailableDates);

        const latestDate = uniqueAvailableDates
          .map((date) => new Date(date))
          .sort((a, b) => b.getTime() - a.getTime())
          .shift();

        if (latestDate) {
          setSelectedDate(latestDate);
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

  if (loading) {
    return (
      <div className="mx-auto p-4">
        {isMobile ? (
          <div className="flex justify-center items-center h-20">
            <DatePickerDemo
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        ) : (
          <DateCarousel
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            enabledDates={enabledDates}
          />
        )}
        <h1 className="text-2xl font-bold my-6 flex justify-between items-center w-full">
          <div className="mx-auto">NBA Games</div>
          <ViewSelector onViewChange={handleViewChange} />
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Skeleton Cards */}
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="p-4 shadow-lg">
              <CardHeader className="text-center">
                <Skeleton className="h-6 w-3/4 mx-auto" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-rows-3 grid-cols-3 text-center gap-2 items-center">
                  <Skeleton className="h-12 w-12 mx-auto" />
                  <Skeleton className="h-4 w-1/4 mx-auto" />
                  <Skeleton className="h-12 w-12 mx-auto" />
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                  <Skeleton className="h-6 w-1/2 mx-auto" />
                  <Skeleton className="h-6 w-1/2 mx-auto" />
                </div>
                <Skeleton className="h-8 mt-4 w-1/2 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div className="text-center text-red-500">{error}</div>;

  const filteredGames = nbaGames.filter(
    (game) =>
      format(new Date(game.date), "yyyy-MM-dd") ===
      format(selectedDate, "yyyy-MM-dd")
  );

  return (
    <div className="mx-auto p-4">
      {isMobile ? (
        <div className="flex justify-center items-center h-20">
          <DatePickerDemo
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
      ) : (
        <DateCarousel
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          enabledDates={enabledDates}
        />
      )}
      <h1 className="text-2xl font-bold my-6 flex justify-between items-center w-full">
        <div className="mx-auto">NBA Games</div>
        <ViewSelector onViewChange={handleViewChange} />
      </h1>
      {view === "list" && (
        <div className="flex flex-col gap-4">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-gray-100 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer transition hover:shadow-md"
            >
              {/* Top Section: Team Names & Scores */}
              <div className="flex items-center space-x-3 min-w-[500px]">
                {/* Home Team */}
                <div className="flex items-center space-x-2 w-48 justify-end">
                  <Image
                    src={game.teams.home.logo}
                    alt={game.teams.home.name}
                    width={30}
                    height={30}
                    className="w-8 h-8"
                  />
                  {!isMobile && (
                    <span className="text-sm font-semibold w-28 truncate text-right">
                      {game.teams.home.name}
                    </span>
                  )}
                </div>

                <span className="text-xs font-medium text-gray-600 w-10 text-center">
                  VS
                </span>

                {/* Away Team */}
                <div className="flex items-center space-x-2 w-48 justify-start">
                  {!isMobile && (
                    <span className="text-sm font-semibold w-28 truncate text-left">
                      {game.teams.away.name}
                    </span>
                  )}

                  <Image
                    src={game.teams.away.logo}
                    alt={game.teams.away.name}
                    width={30}
                    height={30}
                    className="w-8 h-8"
                  />
                </div>
              </div>

              {/* Middle Section: Total Score */}
              <div className="flex items-center space-x-2 my-2 sm:my-0">
                <span
                  className={`text-lg font-bold ${
                    game.scores.home.total > game.scores.away.total
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {game.scores.home.total}
                </span>
                <span className="text-lg font-bold">-</span>
                <span
                  className={`text-lg font-bold ${
                    game.scores.away.total > game.scores.home.total
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {game.scores.away.total}
                </span>
              </div>

              {/* Only show quarter scores and time for Desktop */}
              {(isDesktop || isTablet) && (
                <div className="flex items-center text-xs text-gray-700 space-x-5">
                  {/* Left: Q1 & Q2 */}
                  <div className="flex flex-col space-y-1">
                    <div className="flex space-x-2">
                      <span className="font-semibold">Q1:</span>
                      <span
                        className={`font-semibold ${
                          game.scores.home.quarter_1 >
                          game.scores.away.quarter_1
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {game.scores.home.quarter_1}
                      </span>
                      <span>-</span>
                      <span
                        className={`font-semibold ${
                          game.scores.away.quarter_1 >
                          game.scores.home.quarter_1
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {game.scores.away.quarter_1}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <span className="font-semibold">Q2:</span>
                      <span
                        className={`font-semibold ${
                          game.scores.home.quarter_2 >
                          game.scores.away.quarter_2
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {game.scores.home.quarter_2}
                      </span>
                      <span>-</span>
                      <span
                        className={`font-semibold ${
                          game.scores.away.quarter_2 >
                          game.scores.home.quarter_2
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {game.scores.away.quarter_2}
                      </span>
                    </div>
                  </div>

                  {/* Right: Q3 & Q4 */}
                  <div className="flex flex-col space-y-1">
                    <div className="flex space-x-2">
                      <span className="font-semibold">Q3:</span>
                      <span
                        className={`font-semibold ${
                          game.scores.home.quarter_3 >
                          game.scores.away.quarter_3
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {game.scores.home.quarter_3}
                      </span>
                      <span>-</span>
                      <span
                        className={`font-semibold ${
                          game.scores.away.quarter_3 >
                          game.scores.home.quarter_3
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {game.scores.away.quarter_3}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <span className="font-semibold">Q4:</span>
                      <span
                        className={`font-semibold ${
                          game.scores.home.quarter_4 >
                          game.scores.away.quarter_4
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {game.scores.home.quarter_4}
                      </span>
                      <span>-</span>
                      <span
                        className={`font-semibold ${
                          game.scores.away.quarter_4 >
                          game.scores.home.quarter_4
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {game.scores.away.quarter_4}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Show time only for Desktop */}
              {isDesktop && (
                <div className="text-xs text-gray-500 text-right w-32">
                  {format(new Date(game.date), "dd MMM yyyy, h:mm a")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {view === "grid" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
                  <p className="text-lg font-semibold">
                    {game.teams.home.name}
                  </p>
                  <p className="text-lg font-semibold">
                    {game.teams.away.name}
                  </p>

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
      )}
    </div>
  );
};

export default NBAStandings;
