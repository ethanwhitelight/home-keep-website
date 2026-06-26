// TODO(confirm): illustrative Utah County seasonal cadence pending review by
// someone who actually schedules these jobs locally.
export interface SeasonalTask {
  months: number[]; // 1-12
  serviceName: string; // must match a serviceName in src/data/tiers.ts
}

export const SEASONAL_TASKS: SeasonalTask[] = [
  { months: [3, 4], serviceName: "Sprinkler start-up & winterization" },
  { months: [10, 11], serviceName: "Sprinkler start-up & winterization" },
  { months: [4, 5, 9, 10], serviceName: "HVAC tune-ups (spring/fall)" },
  { months: [3, 4, 9, 10], serviceName: "Gutter cleaning" },
  { months: [11, 12, 1], serviceName: "Snow removal" },
  { months: [5, 6, 7], serviceName: "Lawn mowing & care" },
  { months: [3, 9], serviceName: "Pest control" },
  { months: [9, 10], serviceName: "Chimney sweep" },
  { months: [11], serviceName: "Holiday light install & removal" },
  { months: [4, 10], serviceName: "Dryer vent cleaning" },
  { months: [5, 9], serviceName: "Pressure washing" },
];

export function getRecommendedTasksForMonth(month: number): SeasonalTask[] {
  return SEASONAL_TASKS.filter((task) => task.months.includes(month));
}
