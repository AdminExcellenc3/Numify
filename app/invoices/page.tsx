import { Metadata } from "next";
import { InvoiceList } from "@/components/invoices/invoice-list";
import { CreateInvoiceButton } from "@/components/invoices/create-invoice-button";

export const metadata: Metadata = {
  title: "Invoices | Invoice Management System",
  description: "Manage your invoices",
};

export default function InvoicesPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <CreateInvoiceButton />
      </div>
      <InvoiceList />
    </div>
  );
}