"use client";

import * as React from "react";
import {
  FaBasketballBall,
  FaFootballBall,
  FaFutbol,
  FaMedal,
} from "react-icons/fa";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "./ui";
import { NavMain } from "./nav-main";
// import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
// import { TeamSwitcher } from "./team-switcher";
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://avatars.githubusercontent.com/u/30559529",
  },
  // teams: [
  //   {
  //     name: "Acme Inc",
  //     logo: GalleryVerticalEnd,
  //     plan: "Enterprise",
  //   },
  //   {
  //     name: "Acme Corp.",
  //     logo: AudioWaveform,
  //     plan: "Startup",
  //   },
  //   {
  //     name: "Evil Corp.",
  //     logo: Command,
  //     plan: "Free",
  //   },
  // ],
  navMain: [
    {
      title: "NBA",
      url: "#",
      icon: FaBasketballBall, // Basketball icon for NBA
      isActive: true,
      items: [
        {
          title: "Home",
          url: "/NBA",
        },
        {
          title: "Scores",
          url: "/NBA/Scores",
        },
        {
          title: "Schedule",
          url: "/NBA/Schedule",
        },
        {
          title: "Standings",
          url: "/NBA/Standings",
        },
        {
          title: "Stats",
          url: "/NBA/Stats",
        },
        {
          title: "Teams",
          url: "/NBA/Teams",
        },
      ],
    },
    {
      title: "NFL",
      url: "#",
      icon: FaFootballBall, // Football icon for NFL
      items: [
        {
          title: "Home",
          url: "/NFL",
        },
        {
          title: "Scores",
          url: "/NFL/Scores",
        },
        {
          title: "Schedule",
          url: "/NFL/Schedule",
        },
        {
          title: "Standings",
          url: "/NFL/Standings",
        },
        {
          title: "Stats",
          url: "/NFL/Stats",
        },
        {
          title: "Teams",
          url: "/NFL/Teams",
        },
      ],
    },
    {
      title: "Soccer",
      url: "#",
      icon: FaFutbol, // Soccer icon for Soccer league
      items: [
        {
          title: "Home",
          url: "/Soccer",
        },
        {
          title: "Scores",
          url: "/Soccer/Scores",
        },
        {
          title: "Schedule",
          url: "/Soccer/Schedule",
        },
        {
          title: "Standings",
          url: "/Soccer/Standings",
        },
        {
          title: "Stats",
          url: "/Soccer/Stats",
        },
        {
          title: "Teams",
          url: "/Soccer/Teams",
        },
      ],
    },
    {
      title: "Olympics",
      url: "#",
      icon: FaMedal, // Medal icon for Olympics
      items: [
        {
          title: "Home",
          url: "#",
        },
        {
          title: "Scores",
          url: "#",
        },
        {
          title: "Schedule",
          url: "#",
        },
        {
          title: "Standings",
          url: "#",
        },
        {
          title: "Stats",
          url: "#",
        },
        {
          title: "Teams",
          url: "#",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
