// One date style across the site, e.g. "12 June 2026". Publication dates are
// UTC midnights, so format in UTC to keep the day independent of the build host.
const formatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date) {
  return formatter.format(date);
}
