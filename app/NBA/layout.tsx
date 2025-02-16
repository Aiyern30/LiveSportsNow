// /app/Home/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NBA - Home",
  description: "Check out the latest NBA info.",
  icons: {
    icon: "/Logo.png",
  },
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default HomeLayout;
