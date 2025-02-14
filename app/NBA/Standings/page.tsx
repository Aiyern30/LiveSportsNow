"use client";
import Image from "next/image";
import { useSeason } from "@/lib/context/SeasonContext";
import { Standing } from "@/type/NBA/standings";
import { fetchNBAStandings } from "@/utils/NBA/fetchStandings";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/";
import { useRouter } from "next/navigation";

const Standings = () => {
  const router = useRouter();

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        NBA Standings ({selectedSeason})
      </h1>

      {/* Main category selection */}
      <Tabs
        defaultValue="Conference"
        value={selectedCategory}
        onValueChange={handleCategoryChange}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="Conference">Conference</TabsTrigger>
          <TabsTrigger value="Division">Division</TabsTrigger>
        </TabsList>

        {/* Conference Standings */}
        <TabsContent value="Conference">
          <Tabs
            defaultValue="Western Conference"
            value={selectedGroup}
            onValueChange={setSelectedGroup}
            className="w-[400px] mb-4"
          >
            <TabsList>
              <TabsTrigger value="Western Conference">Western</TabsTrigger>
              <TabsTrigger value="Eastern Conference">Eastern</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Table */}
          <Table className="border border-gray-200">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="w-[200px]">Team</TableHead>
                <TableHead>Played</TableHead>
                <TableHead>Wins</TableHead>
                <TableHead>Losses</TableHead>
                <TableHead>Win%</TableHead>
                <TableHead>Pts For</TableHead>
                <TableHead>Pts Against</TableHead>
                <TableHead>Group Pts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getFilteredStandings().map((team, index) => (
                <TableRow key={index}>
                  <TableCell
                    className="flex items-center gap-3 cursor-pointer hover:underline"
                    onClick={() =>
                      router.push(
                        `/Teams?${team.team.id}+name=${team.team.name}`
                      )
                    }
                  >
                    <Avatar className="w-10 h-10">
                      <div className="relative w-full h-full">
                        <Image
                          src={team.team.logo}
                          alt={team.team.name}
                          layout="fill"
                          objectFit="cover" // Ensures the image covers the container without distortion
                          className="rounded-full"
                        />
                      </div>
                      <AvatarFallback>{team.team.name[0]}</AvatarFallback>
                    </Avatar>
                    {team.team.name}
                  </TableCell>
                  <TableCell>{team.games.played}</TableCell>
                  <TableCell>{team.games.win.total}</TableCell>
                  <TableCell>{team.games.lose.total}</TableCell>
                  <TableCell>{team.games.win.percentage}</TableCell>
                  <TableCell>{team.points.for}</TableCell>
                  <TableCell>{team.points.against}</TableCell>
                  <TableCell>{team.group.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Division Standings */}
        <TabsContent value="Division">
          <Tabs
            defaultValue="Central"
            value={selectedGroup}
            onValueChange={setSelectedGroup}
            className="w-[600px] mb-4"
          >
            <TabsList className="grid grid-cols-6">
              {/* Eastern Conference */}
              <TabsTrigger value="Atlantic">Atlantic</TabsTrigger>
              <TabsTrigger value="Central">Central</TabsTrigger>
              <TabsTrigger value="Southeast">Southeast</TabsTrigger>
              {/* Western Conference */}
              <TabsTrigger value="Northwest">Northwest</TabsTrigger>
              <TabsTrigger value="Pacific">Pacific</TabsTrigger>
              <TabsTrigger value="Southwest">Southwest</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Table */}
          <Table className="border border-gray-200">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="w-[200px]">Team</TableHead>
                <TableHead>Played</TableHead>
                <TableHead>Wins</TableHead>
                <TableHead>Losses</TableHead>
                <TableHead>Win%</TableHead>
                <TableHead>Pts For</TableHead>
                <TableHead>Pts Against</TableHead>
                <TableHead>Group Pts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getFilteredStandings().map((team, index) => (
                <TableRow key={index}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={team.team.logo} alt={team.team.name} />
                      <AvatarFallback>{team.team.name[0]}</AvatarFallback>
                    </Avatar>
                    {team.team.name}
                  </TableCell>
                  <TableCell>{team.games.played}</TableCell>
                  <TableCell>{team.games.win.total}</TableCell>
                  <TableCell>{team.games.lose.total}</TableCell>
                  <TableCell>{team.games.win.percentage}</TableCell>
                  <TableCell>{team.points.for}</TableCell>
                  <TableCell>{team.points.against}</TableCell>
                  <TableCell>{team.group.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Standings;
