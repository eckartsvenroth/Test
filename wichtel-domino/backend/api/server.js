export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

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

  const assignments = [
    "Gerhard","Nook","Ecki","Anneliese","Carsten","Gam","Anca","Nang"
  ];

  // Body parsen (wichtig auf Vercel!)
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try {
      const { pin } = JSON.parse(body || '{}');
      const player = players.find(p => p.pin === pin);
      if (!player) return res.status(403).json({ error: "Ungültige PIN" });

      const index = players.indexOf(player);
      const target = assignments[index];
      res.status(200).json({ name: player.name, wichtel: target });
    } catch (err) {
      res.status(400).json({ error: "Bad Request" });
    }
  });
}
