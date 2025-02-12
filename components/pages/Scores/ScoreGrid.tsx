"use client";

import React, { FC } from "react";
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
} from "@/components/ui";
import { cn } from "@/lib/utils";

interface ScoreGrid {
  filteredGames: NBAGame[];
}

const ScoreGrid: FC<ScoreGrid> = ({ filteredGames }) => {
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
              <div className="flex justify-center">
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
              <div className="flex justify-center">
                <Image
                  src={game.teams.away.logo}
                  alt={game.teams.away.name}
                  width={50}
                  height={50}
                />
              </div>

              {/* Row 2: Team Names */}
              <p className="text-lg font-semibold">{game.teams.home.name}</p>
              <p className="text-lg font-semibold">{game.teams.away.name}</p>

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
                    <TableCell className="text-center">
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
                  <TableRow className="text-center">
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
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ScoreGrid;
