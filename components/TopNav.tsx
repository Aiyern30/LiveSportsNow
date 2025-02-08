import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui";

const TopNav = () => {
  return (
    <div className="flex h-16 items-center px-4 bg-white shadow-md">
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-6">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/"
                className="text-lg font-semibold hover:text-blue-600"
              >
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/score"
                className="text-lg font-semibold hover:text-blue-600"
              >
                Score
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/schedule"
                className="text-lg font-semibold hover:text-blue-600"
              >
                Schedule
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/standings"
                className="text-lg font-semibold hover:text-blue-600"
              >
                Standings
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/stats"
                className="text-lg font-semibold hover:text-blue-600"
              >
                Stats
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-lg font-semibold">
              Teams
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-48">
              <NavigationMenuLink asChild>
                <Link href="/teams/golden-state">Golden State Warriors</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/teams/lakers">Los Angeles Lakers</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/teams/bulls">Chicago Bulls</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/teams/celtics">Boston Celtics</Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default TopNav;
