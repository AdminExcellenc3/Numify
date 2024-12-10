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
import { formatCurrency } from "@/lib/utils";

const invoices = [
  {
    id: "INV-001",
    date: "2024-01-15",
    dueDate: "2024-02-15",
    client: "Acme Corp",
    amount: 2500.00,
    status: "paid",
  },
  {
    id: "INV-002",
    date: "2024-01-20",
    dueDate: "2024-02-20",
    client: "TechStart Inc",
    amount: 1750.50,
    status: "pending",
  },
  {
    id: "INV-003",
    date: "2024-01-25",
    dueDate: "2024-02-25",
    client: "Global Solutions",
    amount: 3200.75,
    status: "overdue",
  },
];

export function InvoiceList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(invoice.amount)}
              </TableCell>
              <TableCell>
                <InvoiceStatus status={invoice.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function InvoiceStatus({ status }: { status: string }) {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    overdue: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <Badge variant="secondary" className={statusStyles[status as keyof typeof statusStyles]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}