import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function RecentInvoices() {
  return (
    <div className="space-y-8">
      {[
        {
          client: "Olivia Martin",
          email: "olivia.martin@email.com",
          amount: "+€1,999.00",
        },
        {
          client: "Jackson Lee",
          email: "jackson.lee@email.com",
          amount: "+€39.00",
        },
        {
          client: "Isabella Nguyen",
          email: "isabella.nguyen@email.com",
          amount: "+€299.00",
        },
        {
          client: "William Kim",
          email: "will@email.com",
          amount: "+€99.00",
        },
        {
          client: "Sofia Davis",
          email: "sofia.davis@email.com",
          amount: "+€39.00",
        },
      ].map((invoice) => (
        <div key={invoice.email} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {invoice.client
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{invoice.client}</p>
            <p className="text-sm text-muted-foreground">{invoice.email}</p>
          </div>
          <div className="ml-auto font-medium">{invoice.amount}</div>
        </div>
      ))}
    </div>
  );
}