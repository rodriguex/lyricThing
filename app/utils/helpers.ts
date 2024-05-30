export function formatDate(date: Date) {
  const userLanguage = global?.window?.navigator?.language;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return new Intl.DateTimeFormat(userLanguage, {
    timeZone: timezone,
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}
