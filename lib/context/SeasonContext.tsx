"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchSeasons } from "@/utils/Seasons/fetchSeasons";
import { SportType } from "@/type/SportType";

// Mapping pathnames to sport types
const SPORT_TYPE_MAP: Record<string, SportType> = {
  "/NBA": "BASKETBALL",
  "/MLB": "BASEBALL",
  "/NFL": "NFL",
  "/Football": "FOOTBALL",
};

// Default season formats for different sports
const DEFAULT_SEASON_MAP: Record<SportType, string> = {
  BASKETBALL: "2023-2024",
  BASEBALL: "2023",
  NFL: "2023",
  FOOTBALL: "2023",
};

interface SeasonContextType {
  seasons: string[];
  selectedSeason: string | null;
  setSelectedSeason: (season: string) => void;
  isApiError: boolean;
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

export const SeasonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const normalizedPathname = pathname.replace(/\/$/, "");
  const sportType = SPORT_TYPE_MAP[normalizedPathname];

  const defaultSeason = sportType ? DEFAULT_SEASON_MAP[sportType] : null;

  const [seasons, setSeasons] = useState<string[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [isApiError, setIsApiError] = useState<boolean>(false);

  useEffect(() => {
    if (!sportType) return;

    console.log(`Fetching seasons for sportType: ${sportType}`);

    fetchSeasons(sportType)
      .then((fetchedSeasons) => {
        console.log("Fetched Seasons from API:", fetchedSeasons);

        if (fetchedSeasons.length > 0) {
          setSeasons(fetchedSeasons);
          localStorage.setItem(
            `seasons_${sportType}`,
            JSON.stringify(fetchedSeasons)
          );
        } else {
          console.warn("Fetched seasons are empty!");
        }
      })
      .catch((error) => {
        setIsApiError(true);
        console.error("Error fetching seasons:", error);
      });

    setSelectedSeason(defaultSeason);
  }, [defaultSeason, sportType]);

  const handleSetSelectedSeason = (season: string) => {
    if (season !== selectedSeason) {
      setSelectedSeason(season);
      localStorage.setItem(`selectedSeason_${sportType}`, season);
    }
  };

  return (
    <SeasonContext.Provider
      value={{
        seasons,
        selectedSeason,
        setSelectedSeason: handleSetSelectedSeason,
        isApiError,
      }}
    >
      {children}
    </SeasonContext.Provider>
  );
};

export const useSeason = (): SeasonContextType => {
  const context = useContext(SeasonContext);
  if (!context) {
    throw new Error("useSeason must be used within a SeasonProvider");
  }
  return context;
};
