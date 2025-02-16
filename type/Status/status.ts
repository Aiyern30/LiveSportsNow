export interface APIStatusResponse {
    results: number;
    paging: {
      current: number;
      total: number;
    };
    response?: {  // 👈 Make response optional in case of an error
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
    errors?: { // 👈 Add optional `errors` field
      requests?: string;
      plan?: string;
      message?: string;
    };
  }
  