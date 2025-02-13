"use client";

import React, { useEffect, useState } from "react";
import {
  SidebarTrigger,
  Separator,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui";
import { fetchSeasons } from "@/utils/Seasons/fetchSeasons";

const DEFAULT_SEASON = "2023-2024";

const TopHeader = () => {
  const [seasons, setSeasons] = useState<string[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>(DEFAULT_SEASON);

  useEffect(() => {
    const getSeasons = async () => {
      const fetchedSeasons = await fetchSeasons();
      setSeasons(fetchedSeasons);

      const savedSeason = localStorage.getItem("selectedSeason");
      setSelectedSeason(savedSeason || DEFAULT_SEASON);
    };

    getSeasons();
  }, []);

  const handleSeasonChange = (season: string) => {
    setSelectedSeason(season);
    localStorage.setItem("selectedSeason", season);
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 ">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Select value={selectedSeason} onValueChange={handleSeasonChange}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a season" />
          </SelectTrigger>
          <SelectContent>
            {seasons.map((season) => (
              <SelectItem key={season} value={season.toString()}>
                {season}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};

export default TopHeader;
