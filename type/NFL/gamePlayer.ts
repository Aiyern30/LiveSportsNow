export type NFLPlayerStatistics = {
    team: {
      id: number;
      name: string;
      logo: string;
    };
    groups: [
      {
        name: string;
        players: [
          {
            player: {
              id: number;
              name: string;
              image: string;
            };
            statistics: [
              {
                name: string;
                value: string;
              }
            ];
          }
        ];
      }
    ];
  };
  