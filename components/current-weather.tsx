import { Droplets, Wind } from "lucide-react";
import type { CurrentWeather } from "@/lib/types";
import { formatTemp, weatherDescription } from "@/lib/utils";

export function CurrentWeatherCard({ data, cityName }: { data: CurrentWeather; cityName: string }) {
  return (
    <div className="rounded-card border border-white/20 bg-white/70 p-6 shadow-card backdrop-blur-md md:p-8 dark:border-white/10 dark:bg-white/5">
      <h2 className="text-3xl font-semibold tracking-tight text-fg dark:text-fg-dark">{cityName}</h2>
      <p className="mt-1 text-sm text-muted dark:text-muted-dark">{weatherDescription(data.weatherCode)}</p>

      <div className="mt-6 flex items-end gap-2">
        <span className="text-7xl font-light tabular-nums text-fg dark:text-fg-dark">
          {formatTemp(data.temperature)}
        </span>
      </div>

      <div className="mt-6 flex gap-6 text-sm text-muted dark:text-muted-dark">
        <span className="flex items-center gap-1"><Droplets className="h-4 w-4" />{data.humidity}%</span>
        <span className="flex items-center gap-1"><Wind className="h-4 w-4" />{data.windSpeed} км/ч</span>
      </div>
    </div>
  );
}
