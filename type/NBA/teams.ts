 type Country = {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
  
export type NBAGroup = {
    id: number;
    name: string;
    logo: string;
    national: boolean;
    country: Country;
  };
  