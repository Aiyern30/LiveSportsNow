"use client";

import { NFLTeam } from "@/type/NFL/teams";
import { fetchNFLTeams } from "@/utils/NFL/fetchNFLGroup";
import React, { useEffect, useState } from "react";

const NFLTeams = () => {
  const [teams, setTeams] = useState<NFLTeam[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTeams = async () => {
      try {
        const nflTeams = await fetchNFLTeams("2023");
        setTeams(nflTeams);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    };

    getTeams();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold">NFL Teams</h1>
      <ul>
        {teams.map((team) => (
          <li key={team.id} className="p-2 border-b">
            {team.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NFLTeams;
