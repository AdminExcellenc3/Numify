import { Metadata } from "next";
import { CompanyForm } from "@/components/company/company-form";

export const metadata: Metadata = {
  title: "Company | Invoice Management System",
  description: "Manage your company information",
};

export default function CompanyPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Company Settings</h1>
        <p className="text-muted-foreground">
          Manage your company information and branding
        </p>
      </div>
      <CompanyForm />
    </div>
  );
}