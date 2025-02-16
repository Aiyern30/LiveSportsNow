"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchSeasons } from "@/utils/Seasons/fetchSeasons";
import { SportType } from "@/type/SportType";

const DEFAULT_SEASON = "2023-2024";

// Mapping pathnames to sport types
const SPORT_TYPE_MAP: Record<string, SportType> = {
  "/NBA": "BASKETBALL",
  "/MLB": "BASEBALL",
  "/NFL": "NFL",
  "/Football": "FOOTBALL",
};

interface SeasonContextType {
  seasons: string[];
  selectedSeason: string;
  setSelectedSeason: (season: string) => void;
  isApiError: boolean;
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

export const SeasonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const sportType = SPORT_TYPE_MAP[pathname];
  console.log("sportType", sportType);

  const [seasons, setSeasons] = useState<string[]>([]);
  console.log("seasons", seasons);
  const [selectedSeason, setSelectedSeason] = useState<string>(DEFAULT_SEASON);
  const [isApiError, setIsApiError] = useState<boolean>(false);

  useEffect(() => {
    const getSeasons = async () => {
      if (!sportType) {
        console.warn(`Unknown sport type for pathname: ${pathname}`);
        return;
      }

      try {
        const fetchedSeasons = await fetchSeasons(sportType);
        setSeasons(fetchedSeasons);

        const savedSeason = localStorage.getItem("selectedSeason");
        setSelectedSeason(savedSeason || DEFAULT_SEASON);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setIsApiError(true);
          console.log("Error occurred:", error.message);
        } else {
          setIsApiError(true);
        }
      }
    };

    getSeasons();
  }, [pathname, sportType]);

  useEffect(() => {
    localStorage.setItem("selectedSeason", selectedSeason);
  }, [selectedSeason]);

  return (
    <SeasonContext.Provider
      value={{ seasons, selectedSeason, setSelectedSeason, isApiError }}
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
