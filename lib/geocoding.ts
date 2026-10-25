import type { GeoLocation } from "./types";

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";

export async function geocodeCity(name: string): Promise<GeoLocation | null> {
  if (name.trim().length < 2) return null;

  const params = new URLSearchParams({
    name: name.trim(),
    count: "1",
    language: "ru",
    format: "json",
  });

  const res = await fetch(`${GEO_URL}?${params}`, { next: { revalidate: 86400 } });
  if (!res.ok) return null;

  const data = await res.json();
  const result = data.results?.[0];
  if (!result) return null;

  return {
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country ?? "",
    admin1: result.admin1,
    timezone: result.timezone ?? "auto",
  };
}
