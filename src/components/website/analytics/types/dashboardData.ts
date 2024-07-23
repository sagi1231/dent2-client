import { ChartData } from "chart.js";

export interface DashboardDataEntry {
  metric: string;
  label: string;
  data: ChartData<"bar">;
}
