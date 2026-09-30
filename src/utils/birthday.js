const timeZone = 'Asia/Tashkent'
const formatter = new Intl.DateTimeFormat('en-GB', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' })

export function getBirthdayState(birthDate, now = new Date()) {
  const [, month, day] = birthDate.split('-').map(Number)
  const parts = Object.fromEntries(formatter.formatToParts(now).filter(part => part.type !== 'literal').map(part => [part.type, Number(part.value)]))
  const today = parts.month === month && parts.day === day
  const year = parts.month > month || (parts.month === month && parts.day > day) ? parts.year + 1 : parts.year
  // Tashkent is UTC+5 with no daylight saving time. Midnight there is 19:00 UTC on the prior day.
  const target = Date.UTC(year, month - 1, day, -5)
  const seconds = Math.max(0, Math.floor((target - now.getTime()) / 1000))
  return {
    today,
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  }
}
