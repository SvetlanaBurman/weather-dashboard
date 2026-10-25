import { fetchWeather } from "@/lib/weather-api";
import { SearchBar } from "@/components/search-bar";
import { CurrentWeatherCard } from "@/components/current-weather";
import { HourlyForecast } from "@/components/hourly-forecast";
import { WeeklyForecast } from "@/components/weekly-forecast";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lat?: string; lon?: string; name?: string }>;
}) {
  const params = await searchParams;
  const hasLocation = params.lat && params.lon && params.name;
  
  const weather = hasLocation
    ? await fetchWeather(Number(params.lat), Number(params.lon))
    : null;

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex justify-center">
        <SearchBar />
      </div>

      {!weather ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-lg text-muted dark:text-muted-dark">
            Введите название города, чтобы увидеть прогноз погоды
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 md:gap-6">
          <CurrentWeatherCard data={weather.current} cityName={params.name!} />
          <HourlyForecast items={weather.hourly} timezone={weather.timezone} />
          <WeeklyForecast items={weather.daily} />
        </div>
      )}
    </main>
  );
}
