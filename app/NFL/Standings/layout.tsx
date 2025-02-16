import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NFL - Standings",
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default HomeLayout;
