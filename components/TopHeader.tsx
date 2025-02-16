"use client";

import React from "react";
import {
  SidebarTrigger,
  Separator,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui";
import { useSeason } from "@/lib/context/SeasonContext";

const TopHeader = () => {
  const { seasons, selectedSeason, setSelectedSeason, isApiError } =
    useSeason();

  if (seasons.length === 0 || isApiError) {
    return (
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Select>
            <SelectTrigger disabled>
              <SelectValue placeholder="Error" />
            </SelectTrigger>
          </Select>
        </div>
      </header>
    );
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        <Select value={selectedSeason ?? ""} onValueChange={setSelectedSeason}>
          <SelectTrigger
            className={
              isApiError ? "border-red-500 bg-red-100 text-red-700" : ""
            }
          >
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
