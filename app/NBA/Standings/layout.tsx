import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NBA - Standings",
  description: "Check out the latest NBA standings.",
  icons: {
    icon: "/Logo.png",
  },
};

const StandingsLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default StandingsLayout;
