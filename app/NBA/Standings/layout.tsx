import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NBA - Standings",
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default HomeLayout;
