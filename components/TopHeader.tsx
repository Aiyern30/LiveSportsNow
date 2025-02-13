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

const TopHeader = () => {
  const [seasons, setSeasons] = useState<string[]>([]);

  useEffect(() => {
    const getSeasons = async () => {
      const fetchedSeasons = await fetchSeasons();
      setSeasons(fetchedSeasons);
    };

    getSeasons();
  }, []);
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 ">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Select>
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
