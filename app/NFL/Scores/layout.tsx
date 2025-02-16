import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NFL - Scores",
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default HomeLayout;
