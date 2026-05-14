import { Activity, Cpu, Wifi, Zap } from "lucide-react";

const TELEMETRY = [
  { label: "SYS", value: "ONLINE", icon: Activity, tone: "text-emerald-400" },
  { label: "MCU", value: "12 NODES", icon: Cpu, tone: "text-cyan-400" },
  { label: "NET", value: "47ms", icon: Wifi, tone: "text-cyan-400" },
  { label: "PWR", value: "NOMINAL", icon: Zap, tone: "text-amber-400" },
  { label: "BUILD", value: "v2.6.1-rc", icon: Cpu, tone: "text-muted-foreground" },
  { label: "UPTIME", value: "14d 03:42:11", icon: Activity, tone: "text-muted-foreground" },
];

export function SystemBar() {
  const items = [...TELEMETRY, ...TELEMETRY];
  return (
    <div className="border-b border-border bg-sidebar/60 overflow-hidden">
      <div className="flex">
        <div className="flex items-center gap-2 px-4 py-1.5 border-r border-border shrink-0 bg-background/40">
          <span className="size-1.5 rounded-full bg-emerald-400 pulse-dot" />
          <span className="font-mono-tech text-[11px] text-emerald-400">SYS://OK</span>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="ticker-track flex gap-8 py-1.5 whitespace-nowrap pl-8">
            {items.map((t, i) => {
              const Icon = t.icon;
              return (
                <div key={i} className="flex items-center gap-2 font-mono-tech text-[11px]">
                  <Icon className={`size-3 ${t.tone}`} />
                  <span className="text-muted-foreground">{t.label}</span>
                  <span className={t.tone}>{t.value}</span>
                  <span className="text-border">|</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
