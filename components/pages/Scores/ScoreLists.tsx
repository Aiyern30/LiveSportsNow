"use client";

import React, { FC } from "react";
import Image from "next/image";
import { NBAGame } from "@/type/NBA/game";
import { useDeviceType } from "@/lib/useDevicesType";
import { format } from "date-fns";

interface ListsProps {
  filteredGames: NBAGame[];
}

const ScoreLists: FC<ListsProps> = ({ filteredGames }) => {
  const { isMobile, isDesktop } = useDeviceType();

  return (
    <div className="flex flex-col gap-4">
      {filteredGames.map((game) => (
        <div
          key={game.id}
          className="bg-gray-100 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer transition hover:shadow-md w-72 mx-auto sm:w-auto sm:mx-0"
        >
          {/* Top Section: Team Names & Scores */}
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

            {/* Score Section (Moves to second row on mobile) */}
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

          {/* Show quarter scores and time only for Desktop */}
          {isDesktop && (
            <div className="flex items-center text-xs text-gray-700 space-x-5">
              {/* Left: Q1 & Q2 */}
              <div className="flex flex-col space-y-1">
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
                <div className="flex space-x-2">
                  <span className="font-semibold">Q2:</span>
                  <span
                    className={`font-semibold ${
                      game.scores.home.quarter_2 > game.scores.away.quarter_2
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {game.scores.home.quarter_2}
                  </span>
                  <span>-</span>
                  <span
                    className={`font-semibold ${
                      game.scores.away.quarter_2 > game.scores.home.quarter_2
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {game.scores.away.quarter_2}
                  </span>
                </div>
              </div>

              {/* Right: Q3 & Q4 */}
              <div className="flex flex-col space-y-1">
                <div className="flex space-x-2">
                  <span className="font-semibold">Q3:</span>
                  <span
                    className={`font-semibold ${
                      game.scores.home.quarter_3 > game.scores.away.quarter_3
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {game.scores.home.quarter_3}
                  </span>
                  <span>-</span>
                  <span
                    className={`font-semibold ${
                      game.scores.away.quarter_3 > game.scores.home.quarter_3
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {game.scores.away.quarter_3}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <span className="font-semibold">Q4:</span>
                  <span
                    className={`font-semibold ${
                      game.scores.home.quarter_4 > game.scores.away.quarter_4
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {game.scores.home.quarter_4}
                  </span>
                  <span>-</span>
                  <span
                    className={`font-semibold ${
                      game.scores.away.quarter_4 > game.scores.home.quarter_4
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {game.scores.away.quarter_4}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Show time only for Desktop */}
          {isDesktop && (
            <div className="text-xs text-gray-500 text-right w-32">
              {format(new Date(game.date), "dd MMM yyyy, h:mm a")}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScoreLists;
