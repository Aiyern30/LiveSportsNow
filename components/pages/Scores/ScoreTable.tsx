"use client";

import { useEffect, useState, type FC } from "react";
import Image from "next/image";
import type { NBAGame } from "@/type/NBA/game";
import { useDeviceType } from "@/lib/useDevicesType";
import clsx from "clsx";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Button,
} from "@/components/ui";
import { PlayerStats } from "@/type/NBA/gamePlayer";
import { fetchNBAPlayerStatsByGameId } from "@/utils/NBA/fetchNBAPlayerStatsByGameId";
import ScoresDialog from "./ScoresDialog";
import { TeamStatistics } from "@/type/NBA/gameTeams";
import { fetchNBATeamStatsByGameId } from "@/utils/NBA/fetchNBATeamStatsByGameId";

interface TableProps {
  filteredGames: NBAGame[];
}

const ScoreTable: FC<TableProps> = ({ filteredGames }) => {
  const { isMobile } = useDeviceType();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [homePlayers, setHomePlayers] = useState<PlayerStats[]>([]);
  const [awayPlayers, setAwayPlayers] = useState<PlayerStats[]>([]);
  const [homeTeamStats, setHomeTeamStats] = useState<TeamStatistics[]>([]);
  const [awayTeamStats, setAwayTeamStats] = useState<TeamStatistics[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

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
          console.error("Error fetching player stats:", error);
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
          console.error("Error fetching team stats:", error);
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
    <div className="w-full overflow-x-auto">
      <div className="w-full">
        <Table className="w-full border border-gray-300 min-w-[800px] ">
          {/* Table Header */}
          <TableHeader className="bg-gray-100 border-b border-gray-300">
            <TableRow>
              <TableHead className="border border-gray-300">
                Home Team
              </TableHead>
              <TableHead className="border border-gray-300">
                Away Team
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                Score
              </TableHead>
              <TableHead className="border border-gray-300 sm:table-cell text-center w-16">
                Q1
              </TableHead>
              <TableHead className="border border-gray-300 sm:table-cell text-center w-16">
                Q2
              </TableHead>
              <TableHead className="border border-gray-300 sm:table-cell text-center w-16">
                Q3
              </TableHead>
              <TableHead className="border border-gray-300 sm:table-cell text-center w-16">
                Q4
              </TableHead>
              <TableHead className="border border-gray-300 sm:table-cell text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {filteredGames.map((game) => (
              <TableRow
                key={game.id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                {/* Home Team */}
                <TableCell className="border border-gray-300 p-3">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={
                        game.teams.home.logo ||
                        "https://wilsonsports.co.za/wp-content/uploads/2021/07/NBA-DRV-PLUS-BASKETBALL-SIZE-6-WTB9200XB06.png"
                      }
                      alt={game.teams.home.name}
                      width={30}
                      height={30}
                      className="w-8 h-8"
                    />
                    {!isMobile && <span>{game.teams.home.name}</span>}
                  </div>
                </TableCell>

                {/* Away Team */}
                <TableCell className="border border-gray-300 p-3">
                  <div className="flex items-center space-x-2">
                    {!isMobile && <span>{game.teams.away.name}</span>}
                    <Image
                      src={
                        game.teams.away.logo ||
                        "https://wilsonsports.co.za/wp-content/uploads/2021/07/NBA-DRV-PLUS-BASKETBALL-SIZE-6-WTB9200XB06.png"
                      }
                      alt={game.teams.away.name}
                      width={30}
                      height={30}
                      className="w-8 h-8"
                    />
                  </div>
                </TableCell>

                {/* Total Score */}
                <TableCell className="border border-gray-300 text-center font-bold">
                  <span
                    className={clsx(
                      game.scores.home.total > game.scores.away.total
                        ? "text-green-500"
                        : "text-red-500"
                    )}
                  >
                    {game.scores.home.total}
                  </span>
                  <span className="mx-2">-</span>
                  <span
                    className={clsx(
                      game.scores.away.total > game.scores.home.total
                        ? "text-green-500"
                        : "text-red-500"
                    )}
                  >
                    {game.scores.away.total}
                  </span>
                </TableCell>

                <TableCell className="border border-gray-300">
                  {game.scores.home.quarter_1} - {game.scores.away.quarter_1}
                </TableCell>
                <TableCell className="border border-gray-300">
                  {game.scores.home.quarter_2} - {game.scores.away.quarter_2}
                </TableCell>
                <TableCell className="border border-gray-300">
                  {game.scores.home.quarter_3} - {game.scores.away.quarter_3}
                </TableCell>
                <TableCell className="border border-gray-300">
                  {game.scores.home.quarter_4} - {game.scores.away.quarter_4}
                </TableCell>
                <TableCell className="border border-gray-300 text-center">
                  <Button
                    variant={"default"}
                    onClick={() => handleTopPlayersClick(game.id)}
                  >
                    Top Players
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {dialogOpen && (
          <ScoresDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            homePlayers={homePlayers}
            awayPlayers={awayPlayers}
            homeTeamStats={homeTeamStats}
            awayTeamStats={awayTeamStats}
          />
        )}
      </div>
    </div>
  );
};

export default ScoreTable;
