"use client";

import { useSeason } from "@/lib/context/SeasonContext";
import { Standing } from "@/type/NBA/standings";
import { fetchNBAStandings } from "@/utils/NBA/fetchStandings";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/";

const Standings = () => {
  const { selectedSeason } = useSeason();
  const [standings, setStandings] = useState<Standing[][]>([]);
  const [selectedGroup, setSelectedGroup] = useState("Western Conference");

  useEffect(() => {
    if (selectedSeason) {
      fetchNBAStandings(selectedSeason)
        .then(setStandings)
        .catch((error) => console.error(error));
    }
  }, [selectedSeason]);

  const getFilteredStandings = (category: string) => {
    if (standings.length === 0) return [];

    if (category === "League") {
      return standings[0].slice().sort((a, b) => a.position - b.position);
    }

    return standings[0].filter((team) => team.group.name === selectedGroup);
  };

  return (
    <div>
      <h1>NBA Standings ({selectedSeason})</h1>

      <Tabs defaultValue="League" className="w-full">
        <TabsList>
          <TabsTrigger value="Conference">Conference</TabsTrigger>
          <TabsTrigger value="Division">Division</TabsTrigger>
        </TabsList>

        <TabsContent value="Conference">
          <Tabs
            defaultValue={selectedGroup}
            onValueChange={setSelectedGroup}
            className="w-[400px]"
          >
            <TabsList>
              <TabsTrigger value="Western Conference">Western</TabsTrigger>
              <TabsTrigger value="Eastern Conference">Eastern</TabsTrigger>
            </TabsList>
          </Tabs>

          <ul>
            {getFilteredStandings("Conference").map((team, index) => (
              <li key={index}>
                {team.team.name} - Position: {team.position}
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="Division">
          <Tabs
            defaultValue={selectedGroup}
            onValueChange={setSelectedGroup}
            className="w-[400px]"
          >
            <TabsList>
              <TabsTrigger value="Central">Central</TabsTrigger>
              <TabsTrigger value="Atlantic">Atlantic</TabsTrigger>
              <TabsTrigger value="Southeast">Southeast</TabsTrigger>
            </TabsList>
          </Tabs>

          <ul>
            {getFilteredStandings("Division").map((team, index) => (
              <li key={index}>
                {team.team.name} - Position: {team.position}
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Standings;
