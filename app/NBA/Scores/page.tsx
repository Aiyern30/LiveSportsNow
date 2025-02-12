"use client";
import { useDeviceType } from "@/lib/useDevicesType";
import { fetchNBAGames } from "@/utils/NBA/fetchNBAGames";
import { useEffect, useState } from "react";
import { NBAGame } from "@/type/NBA/game";
import { Card, CardHeader, CardContent, Skeleton } from "@/components/ui";
import DateCarousel from "@/components/DateCarousel";
import { format } from "date-fns";
import { DatePickerDemo } from "@/components/DatePickerDemo";
import ViewSelector from "@/components/ViewSelector";
import ScoreLists from "@/components/pages/Scores/ScoreLists";
import ScoreGrid from "@/components/pages/Scores/ScoreGrid";

const NBAStandings = () => {
  const { isMobile, isDesktop } = useDeviceType();
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
        {view === "list" ? (
          <div className="flex flex-col gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer transition hover:shadow-md w-72 mx-auto sm:w-auto sm:mx-0"
              >
                {/* Home & Away Teams */}
                <div className="flex flex-col sm:flex-row sm:items-center w-full">
                  <div className="flex items-center justify-center sm:justify-start w-1/2 sm:w-auto gap-2">
                    {/* Home Team */}
                    <div className="flex items-center space-x-2 w-36 justify-end">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      {!isMobile && <Skeleton className="h-4 w-24" />}
                    </div>

                    <span className="text-xs font-medium text-gray-600 w-10 text-center">
                      VS
                    </span>

                    {/* Away Team */}
                    <div className="flex items-center space-x-2 w-36 justify-start">
                      {!isMobile && <Skeleton className="h-4 w-24" />}
                      <Skeleton className="w-8 h-8 rounded-full" />
                    </div>
                  </div>

                  {/* Score Section */}
                  <div className="flex items-center space-x-2 my-2 sm:my-0 w-full sm:w-auto sm:mx-auto justify-center">
                    <Skeleton className="h-6 w-8" />
                    <span className="text-lg font-bold">-</span>
                    <Skeleton className="h-6 w-8" />
                  </div>
                </div>

                {/* Quarter Scores & Time (Desktop Only) */}
                {isDesktop && (
                  <div className="flex items-center text-xs text-gray-700 space-x-5">
                    {/* Left: Q1 & Q2 */}
                    <div className="flex flex-col space-y-1">
                      <div className="flex space-x-2">
                        <span className="font-semibold">Q1:</span>
                        <Skeleton className="h-4 w-6" />
                        <span>-</span>
                        <Skeleton className="h-4 w-6" />
                      </div>
                      <div className="flex space-x-2">
                        <span className="font-semibold">Q2:</span>
                        <Skeleton className="h-4 w-6" />
                        <span>-</span>
                        <Skeleton className="h-4 w-6" />
                      </div>
                    </div>

                    {/* Right: Q3 & Q4 */}
                    <div className="flex flex-col space-y-1">
                      <div className="flex space-x-2">
                        <span className="font-semibold">Q3:</span>
                        <Skeleton className="h-4 w-6" />
                        <span>-</span>
                        <Skeleton className="h-4 w-6" />
                      </div>
                      <div className="flex space-x-2">
                        <span className="font-semibold">Q4:</span>
                        <Skeleton className="h-4 w-6" />
                        <span>-</span>
                        <Skeleton className="h-4 w-6" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Game Time (Desktop Only) */}
                {isDesktop && <Skeleton className="h-4 w-32" />}
              </div>
            ))}
          </div>
        ) : (
          // Existing grid loading skeleton
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
        )}
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
        <div className="lg:mx-auto">NBA Games</div>
        <ViewSelector onViewChange={handleViewChange} />
      </h1>
      {view === "list" && <ScoreLists filteredGames={nbaGames} />}

      {view === "grid" && <ScoreGrid filteredGames={filteredGames} />}
    </div>
  );
};

export default NBAStandings;
