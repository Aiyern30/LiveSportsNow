"use client";

import { useDeviceType } from "@/lib/useDevicesType";
import { useEffect, useState } from "react";
import DateCarousel from "@/components/DateCarousel";
import { format } from "date-fns";
import { DatePickerDemo } from "@/components/DatePickerDemo";
import ViewSelector from "@/components/ViewSelector";
import { useSeason } from "@/lib/context/SeasonContext";
import { ApiError } from "@/components/PlanError";
import { NFLGame } from "@/type/NFL/game";
import { fetchNFLGames } from "@/utils/NFL/fetchNFLGames";

const NBAStandings = () => {
  const { isMobile } = useDeviceType();
  const { selectedSeason } = useSeason();
  const [view, setView] = useState("list");
  console.log("View", view);

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

  const [nflGames, setNflGames] = useState<NFLGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [enabledDates, setEnabledDates] = useState<string[]>([]);

  useEffect(() => {
    const getnflGames = async () => {
      try {
        if (!selectedSeason) return;
        const data = await fetchNFLGames(selectedSeason);
        setNflGames(data);

        // Extract available dates from fetched games
        const availableDates = data.map((game) =>
          format(new Date(game.game.date.date), "yyyy-MM-dd")
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
          setError(error.message);
        } else {
          setError("An unknown error occurred while fetching NBA games.");
        }
      } finally {
        setLoading(false);
      }
    };

    getnflGames();
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
        {/* {view === "list" && <SkeletonScoreLists rowCount={5} />}
        {view === "grid" && <SkeletonScoreGrid rowCount={6} />}
        {view === "table" && <SkeletonScoreTable rowCount={5} />} */}
      </div>
    );
  }

  if (error) {
    return <ApiError message={error} />;
  }

  const filteredGames = nflGames.filter(
    (game) =>
      format(new Date(game.game.date.date), "yyyy-MM-dd") ===
      format(selectedDate, "yyyy-MM-dd")
  );
  console.log("filteredGames", filteredGames);

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
      {/* {view === "list" && <ScoreLists filteredGames={filteredGames} />}
      {view === "grid" && <ScoreGrid filteredGames={filteredGames} />}
      {view === "table" && <ScoreTable filteredGames={filteredGames} />} */}
    </div>
  );
};

export default NBAStandings;
