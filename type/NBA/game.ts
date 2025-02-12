export interface NBAGame {
    id: string;
    date: string;
    time: string;
    timestamp: number;
    timezone: string;
    stage: string | null;
    week: string | null;
    venue: string;
    status: {
      long: string;
      short: string;
      timer: string | null;
    };
    league: {
      id: number;
      name: string;
      type: string;
      season: string;
      logo: string;
    };
    country: {
      id: number;
      name: string;
      code: string;
      flag: string;
    };
    teams: {
      home: {
        id: number;
        name: string;
        logo: string;
      };
      away: {
        id: number;
        name: string;
        logo: string;
      };
    };
    scores: {
      home: {
        quarter_1: number;
        quarter_2: number;
        quarter_3: number;
        quarter_4: number;
        over_time: number | null;
        total: number;
      };
      away: {
        quarter_1: number;
        quarter_2: number;
        quarter_3: number;
        quarter_4: number;
        over_time: number | null;
        total: number;
      };
    };
  }
  