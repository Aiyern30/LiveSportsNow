export type NFLTeamStatistics = {
    team: {
      id: number;
      name: string;
      logo: string;
    };
    statistics: {
      first_downs: {
        total: number;
        passing: number;
        rushing: number;
        from_penalties: number;
      };
      third_down_efficiency: string;
      fourth_down_efficiency: string;
      plays: {
        total: number;
      };
      yards: {
        total: number;
        yards_per_play: string;
        total_drives: string;
      };
      passing: {
        total: number;
        comp_att: string;
        yards_per_pass: string;
        interceptions_thrown: number;
        sacks_yards_lost: string;
      };
      rushings: {
        total: number;
        attempts: number;
        yards_per_rush: string;
      };
      red_zone: {
        made_att: string;
      };
      penalties: {
        total: string;
      };
      turnovers: {
        total: number;
        lost_fumbles: number;
        interceptions: number;
      };
      possession: {
        total: string;
      };
      interceptions: {
        total: number;
      };
      fumbles_recovered: {
        total: number;
      };
      sacks: {
        total: number;
      };
      safeties: {
        total: number;
      };
      int_touchdowns: {
        total: number;
      };
      points_against: {
        total: number;
      };
    };
  };
  