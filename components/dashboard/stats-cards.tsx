"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Totale Omzet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€45.231,89</div>
          <p className="text-xs text-muted-foreground">
            +20,1% t.o.v. vorige maand
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Facturen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2350</div>
          <p className="text-xs text-muted-foreground">
            +180,1% t.o.v. vorige maand
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Actieve Klanten</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12.234</div>
          <p className="text-xs text-muted-foreground">
            +19% t.o.v. vorige maand
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Openstaand Bedrag</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€12.234</div>
          <p className="text-xs text-muted-foreground">
            +201 sinds laatste uur
          </p>
        </CardContent>
      </Card>
    </div>
  );
}