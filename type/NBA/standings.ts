export type Team = {
    id: number;
    name: string;
    logo: string;
  };
  
  export type Group = {
    name: string;
    points: number;
  };
  
  export type League = {
    id: number;
    name: string;
    type: string;
    season: string;
    logo: string;
  };
  
  export type Country = {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
  
  export type Games = {
    played: number;
    win: {
      total: number;
      percentage: string;
    };
    lose: {
      total: number;
      percentage: string;
    };
  };
  
  export type Points = {
    for: number;
    against: number;
  };
  
  export type Standing = {
    position: number;
    stage: string;
    group: Group;
    team: Team;
    league: League;
    country: Country;
    games: Games;
    points: Points;
    form: string | null;
    description: string;
  };
  
  