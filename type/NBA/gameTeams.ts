  
  export interface TeamStatistics {
    game: {
      id: number;
    };
    team: {
      id: number;
    };
    field_goals: {
      total: number;
      attempts: number;
      percentage: number;
    };
    threepoint_goals: {
      total: number;
      attempts: number;
      percentage: number;
    };
    freethrows_goals: {
      total: number;
      attempts: number;
      percentage: number;
    };
    rebounds: {
      total: number;
      offence: number;
      defense: number;
    };
    assists: number;
    steals: number;
    blocks: number;
    turnovers: number;
    personal_fouls: number;
  }
  