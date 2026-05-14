import { Sun, Moon, Bell, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface TopbarProps {
  title: string;
  subtitle?: string;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export function Topbar({ title, subtitle, theme, onToggleTheme }: TopbarProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-cyan-400/80">
              ◆ {title}
            </span>
            <span className="font-mono-tech text-[10px] text-muted-foreground/70">
              [ {new Date().toISOString().slice(0, 19).replace("T", " ")} UTC ]
            </span>
          </div>
          <h1 className="tracking-tight mt-0.5">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search…" className="pl-9 w-64 bg-secondary/50" />
          </div>
          <Button variant="ghost" size="icon" onClick={onToggleTheme}>
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
