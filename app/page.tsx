import { StatsCards } from "@/components/dashboard/stats-cards";
import { DashboardCharts } from "@/components/dashboard/charts";

export default function Home() {
  return (
    <div className="flex flex-col space-y-6">
      <StatsCards />
      <DashboardCharts />
    </div>
  );
}