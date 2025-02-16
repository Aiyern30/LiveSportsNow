import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NBA - Scores",
  description: "Check out the latest NBA Scores.",
  icons: {
    icon: "/Logo.png",
  },
};

const ScoreLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ScoreLayout;
