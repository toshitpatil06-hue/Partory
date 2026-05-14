import { useEffect, useState } from "react";
import { SidebarNav } from "./components/sidebar-nav";
import { Topbar } from "./components/topbar";
import { DashboardScreen } from "./components/dashboard-screen";
import { InventoryScreen } from "./components/inventory-screen";
import { ProjectDetailScreen } from "./components/project-detail-screen";
import { SystemBar } from "./components/system-bar";

type Screen = "dashboard" | "projects" | "inventory" | "settings";

const META: Record<Screen, { title: string; subtitle: string }> = {
  dashboard: { title: "Dashboard", subtitle: "Your hardware engineering workspace at a glance" },
  projects: { title: "Autonomous Sumo Robot", subtitle: "Project · Bill of Materials" },
  inventory: { title: "Global Inventory", subtitle: "All hardware components across your workspace" },
  settings: { title: "Settings", subtitle: "Workspace preferences" },
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const meta = META[screen];

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div
        aria-hidden
        className="bg-grid fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          opacity: 0.18,
          WebkitMaskImage:
            "radial-gradient(ellipse at top, #000 0%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse at top, #000 0%, transparent 70%)",
        }}
      />
      <div className="relative z-30">
        <SidebarNav current={screen} onNavigate={setScreen} />
      </div>
      <div className="pl-60 relative z-10">
        <SystemBar />
        <Topbar
          title={meta.title}
          subtitle={meta.subtitle}
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        />
        {screen === "dashboard" && <DashboardScreen />}
        {screen === "inventory" && <InventoryScreen />}
        {screen === "projects" && <ProjectDetailScreen />}
        {screen === "settings" && (
          <div className="px-8 py-6 text-sm text-muted-foreground">Settings panel coming soon.</div>
        )}
      </div>
    </div>
  );
}
