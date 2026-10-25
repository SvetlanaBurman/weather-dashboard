import type { DailyItem } from "@/lib/types";
import { formatDate, formatTemp, weatherDescription } from "@/lib/utils";

export function WeeklyForecast({ items }: { items: DailyItem[] }) {
  return (
    <div className="rounded-card border border-white/20 bg-white/70 p-6 shadow-card backdrop-blur-md dark:border-white/10 dark:bg-white/5">
      <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted dark:text-muted-dark">Прогноз на 7 дней</h3>
      <div className="divide-y divide-white/10">
        {items.map((item) => (
          <div key={item.date} className="flex items-center justify-between py-3 text-sm">
            <span className="w-12 font-medium text-fg dark:text-fg-dark">{formatDate(item.date)}</span>
            <span className="flex-1 text-muted dark:text-muted-dark">{weatherDescription(item.weatherCode)}</span>
            <span className="tabular-nums text-muted">{formatTemp(item.tempMin)}</span>
            <span className="ml-2 w-10 text-right tabular-nums font-medium text-fg dark:text-fg-dark">{formatTemp(item.tempMax)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
