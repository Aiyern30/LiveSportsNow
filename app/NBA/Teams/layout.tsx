import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NBA - Teams",
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default HomeLayout;
