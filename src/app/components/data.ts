export type Category = "MCU" | "Motor" | "Sensor" | "Power" | "Mechanical" | "Passive";

export interface Part {
  id: string;
  name: string;
  category: Category;
  inHand: number;
  unitCost: number;
  status: "In Stock" | "Low" | "Out";
}

export interface BomItem {
  partId: string;
  needed: number;
}

export interface Project {
  id: string;
  name: string;
  status: "In Progress" | "Planning" | "Complete";
  budget: number;
  spent: number;
  bom: BomItem[];
}

export const PARTS: Part[] = [
  { id: "p1", name: "Arduino Uno R3", category: "MCU", inHand: 12, unitCost: 24.0, status: "In Stock" },
  { id: "p2", name: "NEMA 17 Stepper Motor", category: "Motor", inHand: 2, unitCost: 14.5, status: "Low" },
  { id: "p3", name: "ESP32 DevKit V1", category: "MCU", inHand: 8, unitCost: 9.99, status: "In Stock" },
  { id: "p4", name: "HC-SR04 Ultrasonic Sensor", category: "Sensor", inHand: 1, unitCost: 3.25, status: "Low" },
  { id: "p5", name: "MPU-6050 IMU", category: "Sensor", inHand: 6, unitCost: 5.5, status: "In Stock" },
  { id: "p6", name: "TB6612FNG Motor Driver", category: "Motor", inHand: 0, unitCost: 4.95, status: "Out" },
  { id: "p7", name: "LiPo 3S 2200mAh", category: "Power", inHand: 3, unitCost: 22.0, status: "Low" },
  { id: "p8", name: "Buck Converter 5V 3A", category: "Power", inHand: 14, unitCost: 2.4, status: "In Stock" },
  { id: "p9", name: "Aluminum 2020 Extrusion (1m)", category: "Mechanical", inHand: 9, unitCost: 8.0, status: "In Stock" },
  { id: "p10", name: "M3x10 Socket Cap Screws (100pk)", category: "Mechanical", inHand: 4, unitCost: 6.5, status: "In Stock" },
  { id: "p11", name: "10kΩ Resistor (100pk)", category: "Passive", inHand: 22, unitCost: 1.2, status: "In Stock" },
  { id: "p12", name: "0.1µF Ceramic Capacitor (50pk)", category: "Passive", inHand: 18, unitCost: 1.8, status: "In Stock" },
];

export const PROJECTS: Project[] = [
  {
    id: "proj1",
    name: "Autonomous Sumo Robot",
    status: "In Progress",
    budget: 450,
    spent: 312.4,
    bom: [
      { partId: "p1", needed: 1 },
      { partId: "p2", needed: 4 },
      { partId: "p4", needed: 3 },
      { partId: "p5", needed: 1 },
      { partId: "p6", needed: 2 },
      { partId: "p7", needed: 1 },
      { partId: "p9", needed: 2 },
      { partId: "p10", needed: 1 },
    ],
  },
  {
    id: "proj2",
    name: "Quadcopter Mk II",
    status: "Planning",
    budget: 800,
    spent: 120,
    bom: [
      { partId: "p3", needed: 1 },
      { partId: "p7", needed: 2 },
    ],
  },
  {
    id: "proj3",
    name: "Smart Greenhouse Controller",
    status: "Complete",
    budget: 220,
    spent: 198.5,
    bom: [{ partId: "p3", needed: 1 }],
  },
];

export const ACTIVITY = [
  { id: 1, who: "You", what: "Allocated 2× NEMA 17 to", target: "Sumo Robot", time: "8m ago" },
  { id: 2, who: "Priya S.", what: "Imported 47 parts via CSV", target: "Inventory", time: "1h ago" },
  { id: 3, who: "You", what: "Created BOM for", target: "Quadcopter Mk II", time: "3h ago" },
  { id: 4, who: "Marcus L.", what: "Updated unit cost on", target: "ESP32 DevKit V1", time: "Yesterday" },
  { id: 5, who: "You", what: "Marked complete:", target: "Smart Greenhouse Controller", time: "2 days ago" },
  { id: 6, who: "System", what: "Low stock alert on", target: "TB6612FNG Motor Driver", time: "2 days ago" },
];

export function getPart(id: string) {
  return PARTS.find((p) => p.id === id)!;
}

export function categoryClasses(c: Category): string {
  switch (c) {
    case "MCU":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "Motor":
      return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "Sensor":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "Power":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "Mechanical":
      return "bg-slate-500/10 text-slate-300 border-slate-500/20";
    case "Passive":
      return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
  }
}
