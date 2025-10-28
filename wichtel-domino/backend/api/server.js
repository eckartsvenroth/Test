import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Personenliste und feste PINs
const players = [
  { name: "Anneliese", pin: "4831" },
  { name: "Gerhard", pin: "7094" },
  { name: "Anca", pin: "1528" },
  { name: "Carsten", pin: "3649" },
  { name: "Nang", pin: "8260" },
  { name: "Ecki", pin: "5917" },
  { name: "Nook", pin: "2376" },
  { name: "Gam", pin: "4052" }
];

// Zufällige Wichtel-Zuordnung (niemand zieht sich selbst)
function shuffle(arr) {
  let shuffled = [...arr];
  do {
    shuffled.sort(() => Math.random() - 0.5);
  } while (shuffled.some((x, i) => x.name === arr[i].name));
  return shuffled;
}
const assignments = shuffle(players);

// API-Endpoint: Wichtel abrufen
app.post("/api/draw", (req, res) => {
  const { pin } = req.body;
  const player = players.find(p => p.pin === pin);
  if (!player) {
    return res.status(403).json({ error: "Ungültige PIN" });
  }

  const index = players.indexOf(player);
  const target = assignments[index];
  res.json({ name: player.name, wichtel: target.name });
});

// Export für Vercel
export default app;
