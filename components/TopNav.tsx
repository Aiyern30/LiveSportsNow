"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui";
import Image from "next/image";
import { useDeviceType } from "@/lib/useDevicesType";
import { fetchNBAGroups } from "@/utils/NBA/fetchNBAGroup";
import { NBAGroup } from "@/type/NBA/teams";
import { useSeason } from "@/lib/context/SeasonContext";
import { NFLTeam } from "@/type/NFL/teams";
import { fetchNFLTeams } from "@/utils/NFL/fetchNFLGroup";

const TopNav = () => {
  const { selectedSeason } = useSeason();
  const router = useRouter();
  const { isMobile } = useDeviceType();
  const pathname = usePathname();

  const [teams, setTeams] = useState<Array<NBAGroup | NFLTeam>>([]);
  const [mounted, setMounted] = useState(false);
  const [currentSport, setCurrentSport] = useState<"NBA" | "NFL">("NBA");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const sportFromPath = pathname?.split("/")[1] || "NBA";
    setCurrentSport(sportFromPath === "NFL" ? "NFL" : "NBA");
  }, [pathname, mounted]);

  useEffect(() => {
    if (!mounted || !selectedSeason) return;

    const fetchTeams = async () => {
      try {
        let storedData = null;
        let storedSport = null;

        // Ensure localStorage is accessed only in the client
        if (typeof window !== "undefined") {
          storedData = localStorage.getItem("teamsData");
          storedSport = localStorage.getItem("currentSport");
        }

        // Load cached data if it's for the correct sport
        if (storedData && storedSport === currentSport) {
          setTeams(JSON.parse(storedData));
          return;
        }

        let data;
        if (currentSport === "NBA") {
          data = await fetchNBAGroups(selectedSeason);
        } else if (currentSport === "NFL") {
          data = await fetchNFLTeams(selectedSeason);
        }

        setTeams(data || []);

        // Store fetched data in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("teamsData", JSON.stringify(data || []));
          localStorage.setItem("currentSport", currentSport);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [selectedSeason, currentSport, mounted]);

  if (!mounted) return null;

  const isActive = (path: string) => {
    const segments = pathname.split("/").filter(Boolean);
    const targetSegments = path.split("/").filter(Boolean);
    return targetSegments.length === 1
      ? segments.length === 1 && segments[0] === targetSegments[0]
      : pathname.startsWith(path);
  };

  const handleTeamClick = (id: string) => {
    router.push(`/${currentSport}/Teams/${id}`);
  };

  return (
    !isMobile && (
      <div className="flex flex-col">
        <div className="flex h-16 items-center px-4 bg-white shadow-md">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              {[
                { name: "Home", path: `/${currentSport}` },
                { name: "Scores", path: `/${currentSport}/Scores` },
                { name: "Standings", path: `/${currentSport}/Standings` },
              ].map(({ name, path }) => (
                <NavigationMenuItem key={name}>
                  <Link href={path} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {name}
                    </NavigationMenuLink>
                  </Link>
                  <div
                    className={`w-full h-[3px] bg-red-500 mt-1 ${
                      isActive(path) ? "visible" : "invisible"
                    }`}
                  ></div>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <NavigationMenuTrigger className="navigationMenuTriggerStyle">
                  Teams
                </NavigationMenuTrigger>
                <div
                  className={`w-full h-[3px] bg-red-500 mt-1 ${
                    isActive(`/${currentSport}/Teams`) ? "visible" : "invisible"
                  }`}
                ></div>
                <NavigationMenuContent className="max-h-96 overflow-y-auto">
                  <ul className="grid w-full gap-4 p-4 md:w-[500px] md:grid-cols-2 lg:w-[800px] lg:grid-cols-3 xl:w-[1000px] xl:grid-cols-3">
                    {teams.map((team) => (
                      <li
                        key={team.id}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => handleTeamClick(team.id.toString())}
                      >
                        <Image
                          src={team.logo}
                          alt={team.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <span className="text-lg font-medium text-gray-700">
                          {team.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenu>
        </div>
      </div>
    )
  );
};

export default TopNav;
