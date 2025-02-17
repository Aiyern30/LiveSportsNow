import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui";
import { NFLPlayerStatistics } from "@/type/NFL/gamePlayer";
import { NFLTeamStatistics } from "@/type/NFL/gameTeamStatistics";
import Image from "next/image";

interface DialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  homePlayers: NFLPlayerStatistics[];
  awayPlayers: NFLPlayerStatistics[];
  homeTeamStats: NFLTeamStatistics[];
  awayTeamStats: NFLTeamStatistics[];
}

const ScoresDialog = ({
  dialogOpen,
  setDialogOpen,
  homePlayers,
  awayPlayers,
  homeTeamStats,
  awayTeamStats,
}: DialogProps) => {
  const [homeDefaultOpen, setHomeDefaultOpen] = useState<string | undefined>(
    homePlayers.length > 0 && homePlayers[0].groups.length > 0
      ? `home-item-0-0`
      : undefined
  );

  const [awayDefaultOpen, setAwayDefaultOpen] = useState<string | undefined>(
    awayPlayers.length > 0 && awayPlayers[0].groups.length > 0
      ? `away-item-0-0`
      : undefined
  );

  useEffect(() => {
    if (dialogOpen) {
      setHomeDefaultOpen(
        homePlayers.length > 0 && homePlayers[0].groups.length > 0
          ? `home-item-0-0`
          : undefined
      );
      setAwayDefaultOpen(
        awayPlayers.length > 0 && awayPlayers[0].groups.length > 0
          ? `away-item-0-0`
          : undefined
      );
    }
  }, [dialogOpen, homePlayers, awayPlayers]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Top Players for Game</DialogTitle>
          <DialogDescription>
            Here are the top players for this game. Review their stats.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue={homeTeamStats[0]?.team.name || "Home"}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value={homeTeamStats[0]?.team.name || "Home"}>
              {homeTeamStats[0]?.team.name || "Home Team"}
            </TabsTrigger>
            <TabsTrigger value={awayTeamStats[0]?.team.name || "Away"}>
              {awayTeamStats[0]?.team.name || "Away Team"}
            </TabsTrigger>
          </TabsList>

          {/* Home Team Stats */}
          <TabsContent value={homeTeamStats[0]?.team.name || "Home"}>
            {homePlayers.length > 0 ? (
              <Accordion
                type="single"
                collapsible
                value={homeDefaultOpen}
                onValueChange={setHomeDefaultOpen}
              >
                {homePlayers.flatMap((player, pIndex) =>
                  player.groups.map((group, gIndex) => (
                    <AccordionItem
                      key={`home-${pIndex}-${gIndex}`}
                      value={`home-item-${pIndex}-${gIndex}`}
                    >
                      <AccordionTrigger>{group.name}</AccordionTrigger>
                      <AccordionContent>
                        {group.players.map((playerData, dIndex) => (
                          <div key={dIndex} className="pb-2 mb-2">
                            <div className="flex items-center gap-2">
                              <Image
                                src={playerData.player.image}
                                alt={playerData.player.name}
                                width={48}
                                height={48}
                                className="rounded-full"
                              />
                              <p className="font-semibold">
                                {playerData.player.name}
                              </p>
                            </div>
                            <ul className="mt-2 text-sm">
                              {playerData.statistics.map((stat, sIndex) => (
                                <li
                                  key={sIndex}
                                  className="flex justify-between"
                                >
                                  <span>{stat.name}:</span>
                                  <span className="font-medium">
                                    {stat.value}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                )}
              </Accordion>
            ) : (
              <p>No statistics available for the home team.</p>
            )}
          </TabsContent>

          {/* Away Team Stats */}
          <TabsContent value={awayTeamStats[0]?.team.name || "Away"}>
            {awayPlayers.length > 0 ? (
              <Accordion
                type="single"
                collapsible
                value={awayDefaultOpen}
                onValueChange={setAwayDefaultOpen}
              >
                {awayPlayers.flatMap((player, pIndex) =>
                  player.groups.map((group, gIndex) => (
                    <AccordionItem
                      key={`away-${pIndex}-${gIndex}`}
                      value={`away-item-${pIndex}-${gIndex}`}
                    >
                      <AccordionTrigger>{group.name}</AccordionTrigger>
                      <AccordionContent>
                        {group.players.map((playerData, dIndex) => (
                          <div key={dIndex} className="border-b pb-2 mb-2">
                            <div className="flex items-center gap-2">
                              <Image
                                src={playerData.player.image}
                                alt={playerData.player.name}
                                width={48}
                                height={48}
                                className="rounded-full"
                              />
                              <p className="font-semibold">
                                {playerData.player.name}
                              </p>
                            </div>
                            <ul className="mt-2 text-sm">
                              {playerData.statistics.map((stat, sIndex) => (
                                <li
                                  key={sIndex}
                                  className="flex justify-between"
                                >
                                  <span>{stat.name}:</span>
                                  <span className="font-medium">
                                    {stat.value}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                )}
              </Accordion>
            ) : (
              <p>No statistics available for the away team.</p>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button type="button" onClick={() => setDialogOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScoresDialog;
