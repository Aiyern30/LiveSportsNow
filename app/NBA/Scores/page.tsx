"use client";
import { useDeviceType } from "@/lib/useDevicesType";
import { fetchNBAGames } from "@/utils/NBA/fetchNBAGames";
import { useEffect, useState } from "react";
import { NBAGame } from "@/type/NBA/game";
import DateCarousel from "@/components/DateCarousel";
import { format } from "date-fns";
import { DatePickerDemo } from "@/components/DatePickerDemo";
import ViewSelector from "@/components/ViewSelector";
import ScoreLists from "@/components/pages/Scores/ScoreLists";
import ScoreGrid from "@/components/pages/Scores/ScoreGrid";
import ScoreTable from "@/components/pages/Scores/ScoreTable";
import SkeletonScoreTable from "@/components/pages/Scores/Skeleton/SkeletonScoreTable";
import SkeletonScoreGrid from "@/components/pages/Scores/Skeleton/SkeletonScoreGrid";
import SkeletonScoreLists from "@/components/pages/Scores/Skeleton/SkeletonScoreList";
import { useSeason } from "@/lib/context/SeasonContext";

const NBAStandings = () => {
  const { isMobile } = useDeviceType();
  const { selectedSeason } = useSeason();
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [enabledDates, setEnabledDates] = useState<string[]>([]);

  useEffect(() => {
    const getNBAGames = async () => {
      try {
        const data = await fetchNBAGames(selectedSeason);
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
  }, [selectedSeason]);

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
        {view === "list" && <SkeletonScoreLists rowCount={5} />}
        {view === "grid" && <SkeletonScoreGrid rowCount={6} />}
        {view === "table" && <SkeletonScoreTable rowCount={5} />}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 bg-red-100 border border-red-300 p-6 rounded-md my-6">
        <h2 className="text-xl font-semibold">Error fetching NBA games</h2>
        <p>{error}</p>
        <div className="mt-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Retry
          </button>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-700">
            If you&apos;re on a free plan, try selecting a season from 2021 to
            2023.
          </p>
        </div>
      </div>
    );
  }

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
      {view === "list" && <ScoreLists filteredGames={filteredGames} />}
      {view === "grid" && <ScoreGrid filteredGames={filteredGames} />}
      {view === "table" && <ScoreTable filteredGames={filteredGames} />}
    </div>
  );
};

export default NBAStandings;
