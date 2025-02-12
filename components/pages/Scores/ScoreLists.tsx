import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { NBAGame } from "@/type/NBA/game";
import { useDeviceType } from "@/lib/useDevicesType";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { fetchNBAPlayerStatsByGameId } from "@/utils/NBA/fetchNBAPlayerStatsByGameId";
import { PlayerStats } from "@/type/NBA/gamePlayer";

interface ListsProps {
  filteredGames: NBAGame[];
}

const ScoreLists: FC<ListsProps> = ({ filteredGames }) => {
  const { isMobile, isDesktop } = useDeviceType();
  const [nbaPlayer, setNbaPlayer] = useState<PlayerStats[]>([]);
  console.log("nbaPlayer", nbaPlayer);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const getNBAPlayerStats = async () => {
      if (selectedGameId) {
        try {
          const data = await fetchNBAPlayerStatsByGameId(selectedGameId);
          setNbaPlayer(data);
        } catch (error) {
          console.error("Error fetching player stats:", error);
        }
      }
    };
    if (dialogOpen) {
      getNBAPlayerStats();
    }
  }, [dialogOpen, selectedGameId]);

  const handleTopPlayersClick = (gameId: string) => {
    setSelectedGameId(gameId);
    setDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      {filteredGames.map((game) => (
        <div
          key={game.id}
          className="bg-gray-100 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between transition hover:shadow-md w-72 mx-auto sm:w-auto sm:mx-0"
        >
          <div className="flex flex-col sm:flex-row sm:items-center w-full">
            {/* Home & Away Teams */}
            <div className="flex items-center justify-center sm:justify-start w-1/2 sm:w-auto gap-2">
              {/* Home Team */}
              <div className="flex items-center space-x-2 w-36 justify-end">
                <Image
                  src={game.teams.home.logo}
                  alt={game.teams.home.name}
                  width={30}
                  height={30}
                  className="w-8 h-8"
                />
                {!isMobile && (
                  <span className="text-sm font-semibold w-28 truncate text-right">
                    {game.teams.home.name}
                  </span>
                )}
              </div>

              <span className="text-xs font-medium text-gray-600 w-10 text-center">
                VS
              </span>

              {/* Away Team */}
              <div className="flex items-center space-x-2 w-36 justify-start">
                {!isMobile && (
                  <span className="text-sm font-semibold w-28 truncate text-left">
                    {game.teams.away.name}
                  </span>
                )}
                <Image
                  src={game.teams.away.logo}
                  alt={game.teams.away.name}
                  width={30}
                  height={30}
                  className="w-8 h-8"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 my-2 sm:my-0 w-full sm:w-auto sm:mx-auto justify-center ">
              <span
                className={`text-lg font-bold ${
                  game.scores.home.total > game.scores.away.total
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {game.scores.home.total}
              </span>
              <span className="text-lg font-bold">-</span>
              <span
                className={`text-lg font-bold ${
                  game.scores.away.total > game.scores.home.total
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {game.scores.away.total}
              </span>
            </div>
          </div>

          {isDesktop && (
            <div className="flex items-center text-xs text-gray-700 space-x-5">
              <div className="flex flex-col space-y-1">
                {/* Display quarter scores */}
                <div className="flex space-x-2">
                  <span className="font-semibold">Q1:</span>
                  <span
                    className={`font-semibold ${
                      game.scores.home.quarter_1 > game.scores.away.quarter_1
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {game.scores.home.quarter_1}
                  </span>
                  <span>-</span>
                  <span
                    className={`font-semibold ${
                      game.scores.away.quarter_1 > game.scores.home.quarter_1
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {game.scores.away.quarter_1}
                  </span>
                </div>
                {/* Repeat for other quarters */}
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500 text-right w-32 ml-5">
            <Button
              variant={"default"}
              onClick={() => handleTopPlayersClick(game.id)}
            >
              Top Players
            </Button>
          </div>
        </div>
      ))}

      {dialogOpen && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Top Players for Game {selectedGameId}</DialogTitle>
              <DialogDescription>
                Here are the top players for this game. Review their stats.
              </DialogDescription>
            </DialogHeader>
            <div className="overflow-x-auto">
              <Table className="min-w-[500px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Player</TableHead>
                    <TableHead className="text-right">Minutes</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                    <TableHead className="text-right">Assists</TableHead>
                    <TableHead className="text-right">Rebounds</TableHead>
                    <TableHead className="text-right">Field Goals</TableHead>
                    <TableHead className="text-right">3P Goals</TableHead>
                    <TableHead className="text-right">FT Goals</TableHead>
                    <TableHead className="text-right">Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nbaPlayer.map((player) => (
                    <TableRow key={player.player.id}>
                      {/* Player Name */}
                      <TableCell className="font-medium">
                        {player.player.name}
                      </TableCell>
                      {/* Points */}
                      <TableCell className="text-right">
                        {player.minutes}
                      </TableCell>

                      {/* Points */}
                      <TableCell className="text-right">
                        {player.points}
                      </TableCell>

                      {/* Assists */}
                      <TableCell className="text-right">
                        {player.assists}
                      </TableCell>

                      {/* Rebounds */}
                      <TableCell className="text-right">
                        {player.rebounds.total}
                      </TableCell>

                      {/* Field Goals (total/attempts) */}
                      <TableCell className="text-right">
                        {player.field_goals.total} /{" "}
                        {player.field_goals.attempts}
                      </TableCell>

                      {/* Three-point Goals (total/attempts) */}
                      <TableCell className="text-right">
                        {player.threepoint_goals.total} /{" "}
                        {player.threepoint_goals.attempts}
                      </TableCell>

                      {/* Free Throws (total/attempts) */}
                      <TableCell className="text-right">
                        {player.freethrows_goals.total} /{" "}
                        {player.freethrows_goals.attempts}
                      </TableCell>

                      {/* Player Type */}
                      <TableCell className="text-right">
                        {player.type}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <DialogFooter>
              <Button type="button" onClick={() => setDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ScoreLists;
