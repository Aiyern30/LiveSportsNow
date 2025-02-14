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
import { NBAGroup } from "@/type/NBA/groups";
import { useSeason } from "@/lib/context/SeasonContext";

const TopNav = () => {
  const { selectedSeason } = useSeason();
  const pathname = usePathname();
  const { isMobile } = useDeviceType();
  const [teams, setTeams] = useState<NBAGroup[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await fetchNBAGroups(selectedSeason);
        setTeams(data);
      } catch (error) {
        console.log("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [selectedSeason]);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  // On team click, navigate to /NBA/Teams/[id]
  const handleTeamClick = (id: string) => {
    router.push(`/NBA/Teams/${id}`);
  };

  return (
    <>
      {!isMobile && (
        <div className="flex flex-col">
          <div className="flex h-16 items-center px-4 bg-white shadow-md ">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-4 ">
                <NavigationMenuItem>
                  <Link href="/NBA" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                  <div
                    className={`w-full h-[3px] bg-red-500 mt-1 ${
                      isActive("/NBA") ? "visible" : "invisible"
                    }`}
                  ></div>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/NBA/Scores" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Scores
                    </NavigationMenuLink>
                  </Link>
                  <div
                    className={`w-full h-[3px] bg-red-500 mt-1 ${
                      isActive("/NBA/Scores") ? "visible" : "invisible"
                    }`}
                  ></div>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/NBA/Schedule" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Schedule
                    </NavigationMenuLink>
                  </Link>
                  <div
                    className={`w-full h-[3px] bg-red-500 mt-1 ${
                      isActive("/NBA/Schedule") ? "visible" : "invisible"
                    }`}
                  ></div>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/NBA/Standings" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Standings
                    </NavigationMenuLink>
                  </Link>
                  <div
                    className={`w-full h-[3px] bg-red-500 mt-1 ${
                      isActive("/NBA/Standings") ? "visible" : "invisible"
                    }`}
                  ></div>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/NBA/Stats" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Stats
                    </NavigationMenuLink>
                  </Link>
                  <div
                    className={`w-full h-[3px] bg-red-500 mt-1 ${
                      isActive("/NBA/Stats") ? "visible" : "invisible"
                    }`}
                  ></div>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="navigationMenuTriggerStyle">
                    Teams
                  </NavigationMenuTrigger>
                  <div
                    className={`w-full h-[3px] bg-red-500 mt-1 ${
                      isActive("/NBA/Teams") ? "visible" : "invisible"
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
      )}
    </>
  );
};

export default TopNav;
