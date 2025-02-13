import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { PlayerStats } from "@/type/NBA/gamePlayer";
import React from "react";

interface DialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  homePlayers: PlayerStats[];
  awayPlayers: PlayerStats[];
}

const ScoresDialog = ({
  dialogOpen,
  setDialogOpen,
  homePlayers,
  awayPlayers,
}: DialogProps) => {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Top Players for Game</DialogTitle>
          <DialogDescription>
            Here are the top players for this game. Review their stats.
          </DialogDescription>
        </DialogHeader>

        {/* Home Team Players */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-center">Home Team</h2>
          <div className="overflow-x-auto">
            <Table className="min-w-[500px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Player</TableHead>
                  <TableHead className="text-right">Minutes</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                  <TableHead className="text-right">Assists</TableHead>
                  <TableHead className="text-right">Rebounds</TableHead>
                  <TableHead className="text-right">Field Goals</TableHead>
                  <TableHead className="text-right">3P Goals</TableHead>
                  <TableHead className="text-right">FT Goals</TableHead>
                  <TableHead className="text-right">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {homePlayers.map((player) => (
                  <TableRow key={player.player.id}>
                    <TableCell className="font-medium">
                      {player.player.name}
                    </TableCell>
                    <TableCell className="text-right">
                      {player.minutes}
                    </TableCell>
                    <TableCell className="text-right">
                      {player.points}
                    </TableCell>
                    <TableCell className="text-right">
                      {player.assists}
                    </TableCell>
                    <TableCell className="text-right">
                      {player.rebounds.total}
                    </TableCell>
                    <TableCell className="text-right">
                      {player.field_goals.total} / {player.field_goals.attempts}
                    </TableCell>
                    <TableCell className="text-right">
                      {player.threepoint_goals.total} /{" "}
                      {player.threepoint_goals.attempts}
                    </TableCell>
                    <TableCell className="text-right">
                      {player.freethrows_goals.total} /{" "}
                      {player.freethrows_goals.attempts}
                    </TableCell>
                    <TableCell className="text-right">{player.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Away Team Players */}
        <div>
          <h2 className="text-lg font-bold text-center">Away Team</h2>
          <div className="overflow-x-auto">
            <Table className="min-w-[500px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Player</TableHead>
                  <TableHead className="text-right">Minutes</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                  <TableHead className="text-right">Assists</TableHead>
                  <TableHead className="text-right">Rebounds</TableHead>
                  <TableHead className="text-right">Field Goals</TableHead>
                  <TableHead className="text-right">3P Goals</TableHead>
                  <TableHead className="text-right">FT Goals</TableHead>
                  <TableHead className="text-right">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {awayPlayers.map((player) => (
                  <TableRow key={player.player.id}>
                    <TableCell className="font-medium">
                      {player.player.name}
                    </TableCell>
                    <TableCell className="text-right">
                      {player.minutes}
                    </TableCell>
                    <TableCell className="text-right">
                      {player.points}
                    </TableCell>
                    <TableCell className="text-right">
                      {player.assists}
                    </TableCell>
                    <TableCell className="text-right">
                      {player.rebounds.total}
                    </TableCell>
                    <TableCell className="text-right">
                      {player.field_goals.total} / {player.field_goals.attempts}
                    </TableCell>
                    <TableCell className="text-right">
                      {player.threepoint_goals.total} /{" "}
                      {player.threepoint_goals.attempts}
                    </TableCell>
                    <TableCell className="text-right">
                      {player.freethrows_goals.total} /{" "}
                      {player.freethrows_goals.attempts}
                    </TableCell>
                    <TableCell className="text-right">{player.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

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
