export interface APIStatusResponse {
    results: number;
    paging: {
      current: number;
      total: number;
    };
    response: {
      account: {
        firstname: string;
        lastname: string;
        email: string;
      };
      subscription: {
        plan: string;
        end: string; 
        active: boolean;
      };
      requests: {
        current: number;
        limit_day: number;
      };
    };
  }
  