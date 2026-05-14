import { LayoutDashboard, FolderKanban, Boxes, Settings, Cpu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Screen = "dashboard" | "projects" | "inventory" | "settings";

interface SidebarNavProps {
  current: Screen;
  onNavigate: (s: Screen) => void;
}

const items: { id: Screen; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "inventory", label: "Global Inventory", icon: Boxes },
  { id: "settings", label: "Settings", icon: Settings },
];

export function SidebarNav({ current, onNavigate }: SidebarNavProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 border-r border-border bg-sidebar flex flex-col">
      <div className="px-5 py-5 flex items-center gap-3 border-b border-border">
        <div className="relative size-9 rounded-md bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_-4px_rgba(34,211,238,0.6)]">
          <Cpu className="size-4 text-white" />
          <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-emerald-400 pulse-dot ring-2 ring-sidebar" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="tracking-tight">BuildStack</span>
          <span className="font-mono-tech text-[10px] text-cyan-400/80">v2.6.1 · ONLINE</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="px-3 py-2 font-mono-tech text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">// Workspace</p>
        {items.map((item) => {
          const Icon = item.icon;
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group relative w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all ${
                active
                  ? "bg-gradient-to-r from-cyan-500/15 to-transparent text-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              )}
              <Icon className={`size-4 ${active ? "text-cyan-400" : ""}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <button className="w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-sidebar-accent/60 transition-colors">
          <Avatar className="size-8">
            <AvatarImage src="https://i.pravatar.cc/64?img=12" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm">Alex Rivera</span>
            <span className="text-xs text-muted-foreground">ME @ Cal Poly</span>
          </div>
        </button>
      </div>
    </aside>
  );
}
