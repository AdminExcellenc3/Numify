"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

const clients = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "contact@acme.com",
    phone: "+31 20 123 4567",
    address: "123 Business Street",
    city: "Amsterdam",
    country: "Netherlands",
    status: "active",
    invoiceCount: 12,
    totalBilled: 25600.50,
  },
  {
    id: "2",
    name: "TechStart Solutions",
    email: "info@techstart.com",
    phone: "+31 20 987 6543",
    address: "456 Innovation Avenue",
    city: "Rotterdam",
    country: "Netherlands",
    status: "inactive",
    invoiceCount: 8,
    totalBilled: 15750.75,
  },
  {
    id: "3",
    name: "Global Industries",
    email: "contact@globalind.com",
    phone: "+31 20 456 7890",
    address: "789 Enterprise Road",
    city: "The Hague",
    country: "Netherlands",
    status: "active",
    invoiceCount: 24,
    totalBilled: 47800.25,
  },
];

export function ClientList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Invoices</TableHead>
            <TableHead>Total Billed</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <p className="text-sm">{client.email}</p>
                  <p className="text-sm text-muted-foreground">{client.phone}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <p className="text-sm">{client.city}</p>
                  <p className="text-sm text-muted-foreground">{client.country}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={client.status === "active" ? "default" : "secondary"}
                >
                  {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{client.invoiceCount}</p>
                  <p className="text-sm text-muted-foreground">Total invoices</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    €{client.totalBilled.toLocaleString("nl-NL", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">Total amount</p>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}