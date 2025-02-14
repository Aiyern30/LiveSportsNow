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
  const [selectedCategory, setSelectedCategory] = useState("Conference"); // Track which main tab is active

  useEffect(() => {
    if (selectedSeason) {
      fetchNBAStandings(selectedSeason)
        .then(setStandings)
        .catch((error) => console.error(error));
    }
  }, [selectedSeason]);

  // Handle switching between Conference and Division tabs
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedGroup(
      category === "Conference" ? "Western Conference" : "Central"
    ); // Reset to default for each category
  };

  const getFilteredStandings = () => {
    if (standings.length === 0) return [];
    return standings[0].filter((team) => team.group.name === selectedGroup);
  };

  return (
    <div>
      <h1>NBA Standings ({selectedSeason})</h1>

      {/* Main category selection */}
      <Tabs
        defaultValue="Conference"
        value={selectedCategory}
        onValueChange={handleCategoryChange}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="Conference">Conference</TabsTrigger>
          <TabsTrigger value="Division">Division</TabsTrigger>
        </TabsList>

        {/* Conference Standings */}
        <TabsContent value="Conference">
          <Tabs
            defaultValue="Western Conference"
            value={selectedGroup}
            onValueChange={setSelectedGroup}
            className="w-[400px]"
          >
            <TabsList>
              <TabsTrigger value="Western Conference">Western</TabsTrigger>
              <TabsTrigger value="Eastern Conference">Eastern</TabsTrigger>
            </TabsList>
          </Tabs>

          <ul>
            {getFilteredStandings().map((team, index) => (
              <li key={index}>
                {team.team.name} - Position: {team.position}
              </li>
            ))}
          </ul>
        </TabsContent>

        {/* Division Standings */}
        <TabsContent value="Division">
          <Tabs
            defaultValue="Central"
            value={selectedGroup}
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
            {getFilteredStandings().map((team, index) => (
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
