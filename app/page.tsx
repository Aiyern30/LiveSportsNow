import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

const games = [
  {
    conference: "EAST - FIRST ROUND",
    gameInfo: "Game 4 - NYK leads 2-1",
    time: "1:00 PM ET",
    teams: ["Cavaliers", "Knicks"],
    colors: ["#071A2D", "#F58426"],
    seasonLeaders: [
      { name: "Donovan Mitchell", team: "CLE", ppg: 25.7, rpg: 4.7, apg: 8.7 },
      { name: "Jalen Brunson", team: "NYK", ppg: 22.7, rpg: 3.7, apg: 4.7 },
    ],
    broadcast: { national: "abc", radio: "WEPN", tv: "WTAM/WNZM" },
  },
  {
    conference: "WEST - FIRST ROUND",
    gameInfo: "Game 4 - SAC leads 2-1",
    time: "1:00 PM ET",
    teams: ["Kings", "Warriors"],
    colors: ["#5A2D81", "#FFC72C"],
    seasonLeaders: [
      { name: "De'Aaron Fox", team: "SAC", ppg: 25.7, rpg: 4.7, apg: 8.7 },
      { name: "Stephen Curry", team: "GSW", ppg: 22.7, rpg: 3.7, apg: 4.7 },
    ],
    broadcast: { national: "TNT", radio: "KGMZ-FM", tv: "KHTK" },
  },
  {
    conference: "WEST - FIRST ROUND",
    gameInfo: "Game 4 - BOS leads 2-1",
    time: "1:00 PM ET",
    teams: ["Celtics", "Hawks"],
    colors: ["#007A33", "#C8102E"],
    seasonLeaders: [
      { name: "Jayson Tatum", team: "BOS", ppg: 25.7, rpg: 4.7, apg: 8.7 },
      { name: "Dejounte Murray", team: "ATL", ppg: 22.7, rpg: 3.7, apg: 4.7 },
    ],
    broadcast: { national: "abc", radio: "WZGC", tv: "BSSE-ATL" },
  },
];

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {games.map((game, index) => (
        <Card key={index} className="">
          <CardHeader className="text-center p-6">
            <CardTitle className="text-lg font-bold">
              {game.conference}
            </CardTitle>
            <p>{game.gameInfo}</p>
            <p className="text-2xl font-bold">{game.time}</p>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-center">
              <p className="text-xl font-bold">{game.teams[0]}</p>
              <p className="text-xl font-bold">{game.teams[1]}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">SEASON LEADERS</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>PPG</TableHead>
                    <TableHead>RPG</TableHead>
                    <TableHead>APG</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {game.seasonLeaders.map((player, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        {player.name} ({player.team})
                      </TableCell>
                      <TableCell>{player.ppg}</TableCell>
                      <TableCell>{player.rpg}</TableCell>
                      <TableCell>{player.apg}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t border-gray-700 p-4">
            <div className="text-center">
              <p className="font-bold">NATIONAL</p>
              <p>{game.broadcast.national}</p>
            </div>
            <div className="text-center">
              <p className="font-bold">RADIO</p>
              <p>{game.broadcast.radio}</p>
            </div>
            <div className="text-center">
              <p className="font-bold">LOCAL TV</p>
              <p>{game.broadcast.tv}</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
