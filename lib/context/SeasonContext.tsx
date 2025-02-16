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
  BASKETBALL: "2023-2024", // NBA Format
  BASEBALL: "2023", // MLB Format
  NFL: "2023", // NFL Format
  FOOTBALL: "2023", // Soccer/FIFA Format
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
  const sportType = SPORT_TYPE_MAP[pathname];

  console.log("Current Pathname:", pathname);
  console.log("Mapped SportType:", sportType);

  const defaultSeason = sportType ? DEFAULT_SEASON_MAP[sportType] : null;
  console.log("Default Season:", defaultSeason);

  const [seasons, setSeasons] = useState<string[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(
    defaultSeason
  );
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

        // Use saved season if available, otherwise fallback to dynamic default
        setSelectedSeason(savedSeason || defaultSeason);
      } catch (error: unknown) {
        setIsApiError(true);
        console.error("Error fetching seasons:", error);
      }
    };

    getSeasons();
  }, [defaultSeason, pathname, sportType]);

  useEffect(() => {
    if (selectedSeason) {
      localStorage.setItem("selectedSeason", selectedSeason);
    }
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
