import { Metadata } from "next";
import { ClientList } from "@/components/clients/client-list";
import { CreateClientButton } from "@/components/clients/create-client-button";

export const metadata: Metadata = {
  title: "Clients | Invoice Management System",
  description: "Manage your clients",
};

export default function ClientsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <CreateClientButton />
      </div>
      <ClientList />
    </div>
  );
}