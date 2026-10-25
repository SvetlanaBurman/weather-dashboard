import type { HourlyItem } from "@/lib/types";
import { formatTemp, formatTime } from "@/lib/utils";

export function HourlyForecast({ items, timezone }: { items: HourlyItem[]; timezone: string }) {
  return (
    <div className="rounded-card border border-white/20 bg-white/70 p-6 shadow-card backdrop-blur-md dark:border-white/10 dark:bg-white/5">
      <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted dark:text-muted-dark">Почасовой прогноз</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((item) => (
          <div key={item.time} className="flex min-w-[64px] flex-col items-center gap-2 text-center">
            <span className="text-xs text-muted dark:text-muted-dark">{formatTime(item.time, timezone)}</span>
            <span className="text-sm font-medium tabular-nums text-fg dark:text-fg-dark">{formatTemp(item.temperature)}</span>
            <span className="text-xs text-muted">{item.precipitationProbability}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
