"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { geocodeCity } from "@/lib/geocoding";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const city = await geocodeCity(query);
      if (!city) {
        setError("Город не найден");
        return;
      }
      router.push(`/?lat=${city.latitude}&lon=${city.longitude}&name=${encodeURIComponent(city.name)}`);
    } catch {
      setError("Ошибка поиска");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите город..."
        className="w-full rounded-input border border-white/20 bg-white/70 px-4 py-3 pr-12 text-fg placeholder:text-muted backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-accent-start/50 dark:bg-white/5 dark:text-fg-dark"
      />
      <button
        type="submit"
        disabled={loading}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-accent-gradient p-2 text-white disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
      </button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </form>
  );
}
