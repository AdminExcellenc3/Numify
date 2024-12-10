"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function CreateClientButton() {
  return (
    <Button>
      <PlusCircle className="mr-2 h-4 w-4" />
      Add Client
    </Button>
  );
}