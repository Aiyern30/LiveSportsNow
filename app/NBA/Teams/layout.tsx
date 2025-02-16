import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NBA - Teams",
  description: "Check out the latest NBA Teams.",
  icons: {
    icon: "/Logo.png",
  },
};

const TeamLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default TeamLayout;
