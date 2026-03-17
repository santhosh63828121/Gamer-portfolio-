export interface Dungeon {
  id: number;
  name: string;
  subtitle: string;
  level: number;
  x: number; // percentage
  y: number; // percentage
  icon: string;
}

export const dungeons: Dungeon[] = [
  { id: 1, name: "THE ORIGIN SHRINE", subtitle: "About the Developer", level: 1, x: 15, y: 35, icon: "🏛️" },
  { id: 2, name: "THE SKILL FORGE", subtitle: "Skills & Abilities", level: 3, x: 35, y: 18, icon: "⚒️" },
  { id: 3, name: "THE RELIC VAULT", subtitle: "Projects", level: 5, x: 58, y: 42, icon: "🏰" },
  { id: 4, name: "THE CHRONICLE HALL", subtitle: "Experience", level: 7, x: 78, y: 20, icon: "📜" },
  { id: 5, name: "THE TROPHY SANCTUM", subtitle: "Achievements", level: 9, x: 42, y: 68, icon: "🏆" },
  { id: 6, name: "THE MESSENGER GUILD", subtitle: "Contact", level: 10, x: 75, y: 65, icon: "✉️" },
];

export const mapPaths: [number, number][] = [
  [1, 2], [2, 3], [3, 4], [2, 5], [5, 6], [3, 6],
];
