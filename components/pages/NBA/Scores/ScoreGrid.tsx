"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { NBAGame } from "@/type/NBA/game";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  CardFooter,
  Button,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import ScoresDialog from "./ScoresDialog";
import { PlayerStats } from "@/type/NBA/gamePlayer";
import { fetchNBAPlayerStatsByGameId } from "@/utils/NBA/fetchNBAPlayerStatsByGameId";
import { fetchNBATeamStatsByGameId } from "@/utils/NBA/fetchNBATeamStatsByGameId";
import { TeamStatistics } from "@/type/NBA/gameTeamStatistics";
import { useRouter } from "next/navigation";

interface ScoreGrid {
  filteredGames: NBAGame[];
}

const ScoreGrid: FC<ScoreGrid> = ({ filteredGames }) => {
  const router = useRouter();

  const [dialogOpen, setDialogOpen] = useState(false);

  const [homePlayers, setHomePlayers] = useState<PlayerStats[]>([]);
  const [awayPlayers, setAwayPlayers] = useState<PlayerStats[]>([]);
  const [homeTeamStats, setHomeTeamStats] = useState<TeamStatistics[]>([]);
  const [awayTeamStats, setAwayTeamStats] = useState<TeamStatistics[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const selectedGame = filteredGames.find((game) => game.id === selectedGameId);

  useEffect(() => {
    const getNBAPlayerStats = async () => {
      if (selectedGameId) {
        try {
          const data = await fetchNBAPlayerStatsByGameId(selectedGameId);

          if (data.length > 0) {
            // Get the team IDs from the selected game
            const game = filteredGames.find(
              (game) => game.id === selectedGameId
            );
            if (!game) return;

            const homeTeamId = game.teams.home.id;
            const awayTeamId = game.teams.away.id;

            // Filter players by team
            setHomePlayers(
              data.filter((player) => player.team.id === homeTeamId)
            );
            setAwayPlayers(
              data.filter((player) => player.team.id === awayTeamId)
            );
          }
        } catch (error) {
          console.log("Error fetching player stats:", error);
        }
      }
    };
    const getNBATeamStats = async () => {
      if (selectedGameId) {
        try {
          const data = await fetchNBATeamStatsByGameId(selectedGameId);
          const game = filteredGames.find((game) => game.id === selectedGameId);
          if (!game) return;

          const homeTeamId = game.teams.home.id;
          const awayTeamId = game.teams.away.id;

          setHomeTeamStats(
            data.filter((teamStat) => teamStat.team.id === homeTeamId)
          );
          setAwayTeamStats(
            data.filter((teamStat) => teamStat.team.id === awayTeamId)
          );
        } catch (error) {
          console.log("Error fetching team stats:", error);
        }
      }
    };
    if (dialogOpen) {
      getNBAPlayerStats();
      getNBATeamStats();
    }
  }, [dialogOpen, selectedGameId, filteredGames]);

  const handleTopPlayersClick = (gameId: string) => {
    setSelectedGameId(gameId);
    setDialogOpen(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredGames.map((game) => (
        <Card key={game.id} className="p-4 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-lg font-bold">
              {game.league.name} - {game.league.season}
            </CardTitle>
            <p className="text-sm text-gray-500">
              {new Date(game.date).toLocaleString()}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-rows-3 grid-cols-3 text-center gap-2 items-center">
              {/* Row 1: Team Logos */}
              <div
                className="flex justify-center cursor-pointer"
                onClick={() =>
                  router.push(
                    `/Teams?${game.teams.home.id}+name=${game.teams.home.name}`
                  )
                }
              >
                <Image
                  src={game.teams.home.logo}
                  alt={game.teams.home.name}
                  width={50}
                  height={50}
                />
              </div>
              <p className="text-lg font-semibold row-span-2 flex items-center justify-center">
                VS
              </p>
              <div
                className="flex justify-center cursor-pointer"
                onClick={() =>
                  router.push(
                    `/Teams?${game.teams.away.id}+name=${game.teams.away.name}`
                  )
                }
              >
                <Image
                  src={game.teams.away.logo}
                  alt={game.teams.away.name}
                  width={50}
                  height={50}
                />
              </div>

              {/* Row 2: Team Names */}
              <p
                className="text-lg font-semibold hover:underline cursor-pointer"
                onClick={() =>
                  router.push(
                    `/Teams?${game.teams.home.id}+name=${game.teams.home.name}`
                  )
                }
              >
                {game.teams.home.name}
              </p>
              <p
                className="text-lg font-semibold hover:underline cursor-pointer"
                onClick={() =>
                  router.push(
                    `/Teams?${game.teams.away.id}+name=${game.teams.away.name}`
                  )
                }
              >
                {game.teams.away.name}
              </p>

              <p
                className={cn(
                  "text-2xl font-bold",
                  game.scores.home.total > game.scores.away.total &&
                    "text-green-500",
                  game.scores.home.total < game.scores.away.total &&
                    "text-red-500",
                  game.scores.home.total === game.scores.away.total &&
                    "text-orange-500"
                )}
              >
                {game.scores.home.total}
              </p>
              <div></div>
              <p
                className={cn(
                  "text-2xl font-bold",
                  game.scores.away.total > game.scores.home.total &&
                    "text-green-500",
                  game.scores.away.total < game.scores.home.total &&
                    "text-red-500",
                  game.scores.away.total === game.scores.home.total &&
                    "text-orange-500"
                )}
              >
                {game.scores.away.total}
              </p>
            </div>

            {/* Quarter Scores Table */}
            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-center">Quarter Scores</h3>
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="text-center">
                    <TableHead className="text-center">Team</TableHead>
                    <TableHead className="text-center">Q1</TableHead>
                    <TableHead className="text-center">Q2</TableHead>
                    <TableHead className="text-center">Q3</TableHead>
                    <TableHead className="text-center">Q4</TableHead>
                    {game.scores.home.over_time !== null && (
                      <TableHead className="text-center">OT</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Home Team Row */}
                  <TableRow className="text-center">
                    <TableCell
                      className="text-center cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/Teams?${game.teams.home.id}+name=${game.teams.home.name}`
                        )
                      }
                    >
                      <div className="flex justify-center">
                        <Image
                          src={game.teams.home.logo}
                          alt={game.teams.home.name}
                          width={25}
                          height={25}
                        />
                      </div>
                    </TableCell>
                    {(
                      Object.keys(game.scores.home) as Array<
                        keyof typeof game.scores.home
                      >
                    )
                      .filter(
                        (q) =>
                          q !== "total" && game.scores.home[q] !== undefined
                      )
                      .map((q, index) => (
                        <TableCell
                          key={index}
                          className={cn(
                            "text-center",
                            game.scores.home[q]! > game.scores.away[q]! &&
                              "text-green-500",
                            game.scores.home[q]! < game.scores.away[q]! &&
                              "text-red-500",
                            game.scores.home[q]! === game.scores.away[q]! &&
                              "text-orange-500"
                          )}
                        >
                          {game.scores.home[q]}
                        </TableCell>
                      ))}
                  </TableRow>

                  {/* Away Team Row */}
                  <TableRow
                    className="text-center cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/Teams?${game.teams.away.id}+name=${game.teams.away.name}`
                      )
                    }
                  >
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <Image
                          src={game.teams.away.logo}
                          alt={game.teams.away.name}
                          width={25}
                          height={25}
                        />
                      </div>
                    </TableCell>
                    {(
                      Object.keys(game.scores.away) as Array<
                        keyof typeof game.scores.away
                      >
                    )
                      .filter(
                        (q) =>
                          q !== "total" && game.scores.away[q] !== undefined
                      )
                      .map((q, index) => (
                        <TableCell
                          key={index}
                          className={cn(
                            "text-center",
                            game.scores.away[q]! > game.scores.home[q]! &&
                              "text-green-500",
                            game.scores.away[q]! < game.scores.home[q]! &&
                              "text-red-500",
                            game.scores.away[q]! === game.scores.home[q]! &&
                              "text-orange-500"
                          )}
                        >
                          {game.scores.away[q]}
                        </TableCell>
                      ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>

          <CardFooter className="border-t pt-3 text-center space-x-5">
            <p className="text-sm text-gray-600">
              Venue: <span className="font-semibold">{game.venue}</span>
            </p>
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <Image
                src={game.country.flag}
                alt={game.country.name}
                width={20}
                height={15}
              />
              {game.country.name}
            </p>
            <div className="text-xs text-gray-500 text-right w-32 ml-5">
              <Button
                variant={"default"}
                onClick={() => handleTopPlayersClick(game.id)}
              >
                Teams Stats
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}

      {dialogOpen && selectedGame && (
        <ScoresDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          homePlayers={homePlayers}
          awayPlayers={awayPlayers}
          homeTeamStats={homeTeamStats}
          awayTeamStats={awayTeamStats}
          homeScore={selectedGame?.scores.home.total ?? 0}
          awayScore={selectedGame?.scores.away.total ?? 0}
        />
      )}
    </div>
  );
};

export default ScoreGrid;
