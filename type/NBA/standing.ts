// types/StandingTypes.ts
export interface Team {
    id: number;
    name: string;
    logo: string;
  }
  
  export interface StandingsData {
    league: {
      id: number;
      name: string;
      season: string;
    };
    standings: {
      rank: number;
      team: Team;
      points: number;
      goals: number;
      conceded: number;
      goal_difference: number;
    }[];
  }
  