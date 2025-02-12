// TypeScript types based on the sample response

interface FieldGoals {
    total: number;
    attempts: number;
    percentage: number | null;
  }
  
  interface ThreePointGoals {
    total: number;
    attempts: number;
    percentage: number | null;
  }
  
  interface FreeThrowsGoals {
    total: number;
    attempts: number;
    percentage: number | null;
  }
  
  interface Rebounds {
    total: number;
  }
  
  export interface PlayerStats {
    game: {
      id: number;
    };
    team: {
      id: number;
    };
    player: {
      id: number;
      name: string;
    };
    type: string;
    minutes: string;
    field_goals: FieldGoals;
    threepoint_goals: ThreePointGoals;
    freethrows_goals: FreeThrowsGoals;
    rebounds: Rebounds;
    assists: number;
    points: number;
  }

  export interface NBAPlayerStatsResponse {
    get: string;
    parameters: {
      id: string; // Game ID
    };
    errors: unknown[];
    results: number;
    response: PlayerStats[];
  }
  
 