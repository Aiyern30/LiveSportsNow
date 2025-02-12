import React, { FC } from "react";
import Image from "next/image";
import { NBAGame } from "@/type/NBA/game";
import { useDeviceType } from "@/lib/useDevicesType";
import { format } from "date-fns";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui";

interface TableProps {
  filteredGames: NBAGame[];
}

const ScoreTable: FC<TableProps> = ({ filteredGames }) => {
  const { isMobile } = useDeviceType();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Home Team</TableHead>
          <TableHead></TableHead>
          <TableHead>Away Team</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Q1</TableHead>
          <TableHead>Q2</TableHead>
          <TableHead>Q3</TableHead>
          <TableHead>Q4</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredGames.map((game) => (
          <TableRow key={game.id} className="hover:bg-gray-50">
            <TableCell>
              {format(new Date(game.date), "dd MMM yyyy, h:mm a")}
            </TableCell>
            <TableCell className="p-2 align-middle">
              <div className="flex items-center space-x-2">
                <Image
                  src={game.teams.home.logo}
                  alt={game.teams.home.name}
                  width={30}
                  height={30}
                  className="w-8 h-8"
                />
                {!isMobile && <span>{game.teams.home.name}</span>}
              </div>
            </TableCell>

            <TableCell className="p-2 align-middle text-center">VS</TableCell>

            <TableCell className="p-2 align-middle">
              <div className="flex items-center space-x-2">
                {!isMobile && <span>{game.teams.away.name}</span>}
                <Image
                  src={game.teams.away.logo}
                  alt={game.teams.away.name}
                  width={30}
                  height={30}
                  className="w-8 h-8"
                />
              </div>
            </TableCell>

            <TableCell>
              <span
                className={`font-bold ${
                  game.scores.home.total > game.scores.away.total
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {game.scores.home.total}
              </span>
              <span className="mx-2">-</span>
              <span
                className={`font-bold ${
                  game.scores.away.total > game.scores.home.total
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {game.scores.away.total}
              </span>
            </TableCell>
            <TableCell>
              {game.scores.home.quarter_1} - {game.scores.away.quarter_1}
            </TableCell>
            <TableCell>
              {game.scores.home.quarter_2} - {game.scores.away.quarter_2}
            </TableCell>
            <TableCell>
              {game.scores.home.quarter_3} - {game.scores.away.quarter_3}
            </TableCell>
            <TableCell>
              {game.scores.home.quarter_4} - {game.scores.away.quarter_4}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScoreTable;
