import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui";
import { AppSidebar } from "@/components/app-sidebar";
import TopHeader from "@/components/TopHeader";
import TopNav from "@/components/TopNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LiveSportsNow",
  description: "Stay updated with live sports scores and stats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />

          <main className="flex flex-col flex-1">
            <TopHeader />
            <TopNav />
            <div className="flex-1 px-4">{children}</div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
