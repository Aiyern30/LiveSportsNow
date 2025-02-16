export interface NFLTeam {
    id: number;
    name: string;
    code: string | null;
    city: string | null;
    coach: string | null;
    owner: string | null;
    stadium: string | null;
    established: number | null;
    logo: string;
    country: {
      name: string;
      code: string;
      flag: string;
    };
  }
  