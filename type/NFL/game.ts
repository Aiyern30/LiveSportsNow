export interface NFLGame {
    game: {
      id: number;
      stage: string;
      week: string;
      date: {
        timezone: string;
        date: string;
        time: string;
        timestamp: number;
      };
      venue: {
        name: string;
        city: string;
      };
      status: {
        short: string;
        long: string;
        timer: string | null;
      };
    };
    league: {
      id: number;
      name: string;
      season: string;
      logo: string;
      country: {
        name: string;
        code: string;
        flag: string;
      };
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
        overtime: number | null;
        total: number;
      };
      away: {
        quarter_1: number;
        quarter_2: number;
        quarter_3: number;
        quarter_4: number;
        overtime: number | null;
        total: number;
      };
    };
  }
  