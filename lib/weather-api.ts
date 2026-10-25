import type { WeatherData } from "./types";

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: "temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m",
    hourly: "temperature_2m,weather_code,precipitation_probability",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
    timezone: "auto",
    forecast_days: "7",
  });

  const res = await fetch(`${FORECAST_URL}?${params}`, { next: { revalidate: 1800 } });
  if (!res.ok) throw new Error("Не удалось получить данные о погоде");

  const data = await res.json();

  return {
    timezone: data.timezone,
    current: {
      temperature: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
      humidity: data.current.relative_humidity_2m,
      time: data.current.time,
    },
    hourly: data.hourly.time.slice(0, 24).map((t: string, i: number) => ({
      time: t,
      temperature: data.hourly.temperature_2m[i],
      weatherCode: data.hourly.weather_code[i],
      precipitationProbability: data.hourly.precipitation_probability[i] ?? 0,
    })),
    daily: data.daily.time.map((t: string, i: number) => ({
      date: t,
      tempMax: data.daily.temperature_2m_max[i],
      tempMin: data.daily.temperature_2m_min[i],
      weatherCode: data.daily.weather_code[i],
      precipitationSum: data.daily.precipitation_sum[i],
    })),
  };
}
