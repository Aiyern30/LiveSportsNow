"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchSeasons } from "@/utils/Seasons/fetchSeasons";

const DEFAULT_SEASON = "2023-2024";

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
  const [seasons, setSeasons] = useState<string[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>(DEFAULT_SEASON);
  const [isApiError, setIsApiError] = useState<boolean>(false);

  useEffect(() => {
    const getSeasons = async () => {
      try {
        const fetchedSeasons = await fetchSeasons();
        setSeasons(fetchedSeasons);

        const savedSeason = localStorage.getItem("selectedSeason");
        setSelectedSeason(savedSeason || DEFAULT_SEASON);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setIsApiError(true);
          console.log("Error occurred:", error.message); // Log the error message
        } else {
          setIsApiError(true);
        }
      }
    };

    getSeasons();
  }, []);

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
