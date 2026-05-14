import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Search, Filter, Plus, Upload, MoreHorizontal } from "lucide-react";
import { PARTS, categoryClasses, type Part } from "./data";

function statusBadge(status: Part["status"]) {
  switch (status) {
    case "In Stock":
      return <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"><span className="size-1.5 rounded-full bg-emerald-500 mr-1.5" />In Stock</Badge>;
    case "Low":
      return <Badge className="bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20"><span className="size-1.5 rounded-full bg-amber-500 mr-1.5" />Low</Badge>;
    case "Out":
      return <Badge className="bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/20"><span className="size-1.5 rounded-full bg-red-500 mr-1.5" />Out of Stock</Badge>;
  }
}

export function InventoryScreen() {
  const [query, setQuery] = useState("");
  const filtered = PARTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="px-8 py-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search parts…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 bg-secondary/50"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="size-4" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>MCU</DropdownMenuItem>
              <DropdownMenuItem>Motor</DropdownMenuItem>
              <DropdownMenuItem>Sensor</DropdownMenuItem>
              <DropdownMenuItem>Power</DropdownMenuItem>
              <DropdownMenuItem>Mechanical</DropdownMenuItem>
              <DropdownMenuItem>Passive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="size-4" /> Import CSV
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="size-4" /> Add Part
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Part Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">In-Hand Qty</TableHead>
                <TableHead className="text-right">Unit Cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{p.name}</span>
                      <span className="text-xs text-muted-foreground font-mono">SKU-{p.id.toUpperCase()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={categoryClasses(p.category)}>
                      {p.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{p.inHand}</TableCell>
                  <TableCell className="text-right tabular-nums">${p.unitCost.toFixed(2)}</TableCell>
                  <TableCell>{statusBadge(p.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {PARTS.length} parts
      </p>
    </div>
  );
}
