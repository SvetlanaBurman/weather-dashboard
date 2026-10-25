export function formatTemp(value: number): string {
  return `${Math.round(value)}°`;
}

export function formatTime(iso: string, timezone: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone === "auto" ? undefined : timezone,
  }).format(new Date(iso));
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ru-RU", { weekday: "short" }).format(new Date(iso));
}

export function weatherDescription(code: number): string {
  const map: Record<number, string> = {
    0: "Ясно", 1: "Преимущественно ясно", 2: "Переменная облачность", 3: "Пасмурно",
    45: "Туман", 48: "Изморозь", 51: "Слабая морось", 53: "Морось", 55: "Сильная морось",
    61: "Слабый дождь", 63: "Дождь", 65: "Сильный дождь",
    71: "Слабый снег", 73: "Снег", 75: "Сильный снег",
    80: "Ливень", 81: "Сильный ливень", 82: "Очень сильный ливень",
    95: "Гроза", 96: "Гроза с градом",
  };
  return map[code] ?? "Неизвестно";
}
