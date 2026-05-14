import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { ArrowUpRight, FolderKanban, Boxes, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";
import { PARTS, PROJECTS, ACTIVITY, getPart, categoryClasses } from "./data";

interface LowStockRow {
  partId: string;
  needed: number;
  inHand: number;
  projects: string[];
}

function computeLowStock(): LowStockRow[] {
  const totals = new Map<string, { needed: number; projects: string[] }>();
  for (const proj of PROJECTS) {
    if (proj.status === "Complete") continue;
    for (const item of proj.bom) {
      const t = totals.get(item.partId) ?? { needed: 0, projects: [] };
      t.needed += item.needed;
      if (!t.projects.includes(proj.name)) t.projects.push(proj.name);
      totals.set(item.partId, t);
    }
  }
  const rows: LowStockRow[] = [];
  for (const [partId, { needed, projects }] of totals) {
    const part = getPart(partId);
    if (needed > part.inHand) rows.push({ partId, needed, inHand: part.inHand, projects });
  }
  return rows.sort((a, b) => b.needed - b.inHand - (a.needed - a.inHand));
}

export function DashboardScreen() {
  const activeProjects = PROJECTS.filter((p) => p.status !== "Complete").length;
  const totalParts = PARTS.reduce((s, p) => s + p.inHand, 0);
  const totalBudget = PROJECTS.reduce((s, p) => s + p.budget, 0);
  const totalSpent = PROJECTS.reduce((s, p) => s + p.spent, 0);
  const budgetPct = Math.round((totalSpent / totalBudget) * 100);
  const lowStock = computeLowStock();

  return (
    <div className="px-8 py-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          icon={<FolderKanban className="size-4" />}
          label="Total Active Projects"
          value={activeProjects.toString()}
          delta="+1 this week"
          tone="emerald"
        />
        <SummaryCard
          icon={<Boxes className="size-4" />}
          label="Total Parts in Inventory"
          value={totalParts.toLocaleString()}
          delta="47 added recently"
          tone="blue"
        />
        <SummaryCard
          icon={<DollarSign className="size-4" />}
          label="Budget Used"
          value={`$${totalSpent.toFixed(0)} / $${totalBudget}`}
          delta={`${budgetPct}% of total`}
          tone="amber"
          progress={budgetPct}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-orange-500" />
              <CardTitle>Low Stock Alerts</CardTitle>
              <Badge variant="outline" className="ml-1 border-orange-500/30 bg-orange-500/10 text-orange-400 font-mono-tech">
                {String(lowStock.length).padStart(2, "0")} ALERTS
              </Badge>
            </div>
            <button className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              View all <ArrowUpRight className="size-3" />
            </button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Part</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Needed</TableHead>
                  <TableHead className="text-right">In-Hand</TableHead>
                  <TableHead className="text-right">Shortage</TableHead>
                  <TableHead>Used By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStock.map((row) => {
                  const part = getPart(row.partId);
                  const shortage = row.needed - row.inHand;
                  return (
                    <TableRow key={row.partId}>
                      <TableCell>{part.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={categoryClasses(part.category)}>
                          {part.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{row.needed}</TableCell>
                      <TableCell className="text-right tabular-nums">{row.inHand}</TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/20">
                          −{shortage}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {row.projects.join(", ")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ACTIVITY.map((a) => (
              <div key={a.id} className="flex gap-3">
                <div className="mt-1.5 size-2 rounded-full bg-emerald-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-snug">
                    <span className="text-foreground">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.what}</span>{" "}
                    <span className="text-foreground">{a.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  delta,
  tone,
  progress,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta: string;
  tone: "emerald" | "blue" | "amber";
  progress?: number;
}) {
  const toneClasses = {
    emerald: "bg-emerald-500/10 text-emerald-400",
    blue: "bg-blue-500/10 text-blue-400",
    amber: "bg-amber-500/10 text-amber-400",
  }[tone];
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <CardContent className="pt-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            ▸ {label}
          </span>
          <div className={`size-8 rounded-md flex items-center justify-center ${toneClasses}`}>{icon}</div>
        </div>
        <div className="font-mono-tech text-2xl tracking-tight tabular-nums">{value}</div>
        {progress !== undefined ? (
          <Progress value={progress} className="h-1.5" />
        ) : (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp className="size-3 text-emerald-500" />
            {delta}
          </div>
        )}
        {progress !== undefined && <p className="text-xs text-muted-foreground">{delta}</p>}
      </CardContent>
    </Card>
  );
}
