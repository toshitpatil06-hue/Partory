import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Plus, Search, Calendar, Cpu } from "lucide-react";
import { PROJECTS, PARTS, getPart, categoryClasses } from "./data";

export function ProjectDetailScreen() {
  const project = PROJECTS[0];
  const budgetPct = Math.round((project.spent / project.budget) * 100);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const bomRows = project.bom.map((b) => ({ part: getPart(b.partId), needed: b.needed }));
  const candidates = PARTS.filter(
    (p) =>
      !project.bom.find((b) => b.partId === p.id) &&
      p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="px-8 py-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-md bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                <Cpu className="size-5 text-white" />
              </div>
              <div>
                <h2 className="tracking-tight">{project.name}</h2>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
                  <Calendar className="size-3" /> Started Apr 2, 2026 · Due May 28, 2026
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-500/15 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20">
              <span className="size-1.5 rounded-full bg-blue-400 mr-1.5" />
              {project.status}
            </Badge>
            <Button variant="outline" size="sm">Share</Button>
            <Button size="sm">Edit Project</Button>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Budget</span>
              <span className="text-sm tabular-nums">
                ${project.spent.toFixed(2)} <span className="text-muted-foreground">/ ${project.budget.toFixed(2)}</span>
              </span>
            </div>
            <Progress value={budgetPct} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{budgetPct}% used</span>
              <span className="tabular-nums">${(project.budget - project.spent).toFixed(2)} remaining</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bom">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bom">Bill of Materials</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground">
              Overview of {project.name}.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bom" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="tracking-tight">Bill of Materials</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {bomRows.length} parts allocated · {bomRows.reduce((s, r) => s + r.needed, 0)} units total
              </p>
            </div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="size-4" /> Add Part to BOM
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-0">
                <div className="p-2 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Search global inventory…"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="pl-8 h-8 bg-secondary/50"
                    />
                  </div>
                </div>
                <div className="max-h-72 overflow-auto py-1">
                  {candidates.length === 0 && (
                    <p className="px-3 py-6 text-center text-sm text-muted-foreground">No matches</p>
                  )}
                  {candidates.map((p) => (
                    <button
                      key={p.id}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-accent text-left"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm truncate">{p.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {p.inHand} in stock · ${p.unitCost.toFixed(2)}
                        </span>
                      </div>
                      <Badge variant="outline" className={categoryClasses(p.category)}>
                        {p.category}
                      </Badge>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Part</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Needed</TableHead>
                    <TableHead className="text-right">Global Stock</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bomRows.map(({ part, needed }) => {
                    const covered = Math.min(needed, part.inHand);
                    const pct = Math.round((covered / needed) * 100);
                    const short = needed > part.inHand;
                    return (
                      <TableRow key={part.id}>
                        <TableCell>{part.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={categoryClasses(part.category)}>
                            {part.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{needed}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          <span className={short ? "text-red-400" : "text-foreground"}>{part.inHand}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={pct} className="h-1.5 w-20" />
                            <span className={`text-xs tabular-nums ${short ? "text-red-400" : "text-muted-foreground"}`}>
                              {pct}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          ${(part.unitCost * needed).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground">
              Timeline view coming soon.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
