export const bookingConfig = {
  advanceDays: 60,
  timeZone: "Asia/Kolkata",
  steps: ["Service", "Date", "Time", "Your details"],
  slots: ["11:00 AM", "11:30 AM", "12:00 PM", "2:00 PM", "4:30 PM", "6:00 PM"],
  confirmationNote: "Demo booking experience — final website will use real-time appointment availability.",
} as const;

export type CustomerDetails = { name: string; phone: string; note: string };
export type BookingConfirmation = CustomerDetails & { id: string; serviceName: string; date: string; time: string; price: number; duration: string };

export function getTodayInIndia() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: bookingConfig.timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}
export function addDays(iso: string, days: number) {
  const date = new Date(`${iso}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
export function monthStart(iso: string, offset = 0) {
  const date = new Date(`${iso}T12:00:00Z`);
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + offset);
  return date.toISOString().slice(0, 10);
}
export function calendarCells(firstDay: string): (string | null)[] {
  const date = new Date(`${firstDay}T12:00:00Z`);
  const leading = (date.getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  return [...Array<null>(leading).fill(null), ...Array.from({ length: days }, (_, index) => addDays(firstDay, index))];
}
export function formatBookingDate(iso: string, short = false) {
  return new Intl.DateTimeFormat("en-IN", { timeZone: bookingConfig.timeZone, weekday: short ? "short" : "long", day: "numeric", month: short ? "short" : "long", year: "numeric" }).format(new Date(`${iso}T12:00:00+05:30`));
}
export function isBookableDate(date: string, today: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !today) return false;
  const parsed = new Date(`${date}T12:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date && date >= today && date <= addDays(today, bookingConfig.advanceDays);
}
export function getDemoSlots(date: string) {
  const unavailableIndex = (Number(date.slice(-2)) % 3) + 2;
  return bookingConfig.slots.map((time, index) => ({ time, available: index !== 1 && index !== unavailableIndex }));
}
export function validateCustomer(details: CustomerDetails) {
  const errors: Partial<Record<keyof CustomerDetails, string>> = {};
  if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'’\-]{1,79}$/u.test(details.name.trim())) errors.name = "Enter your name using 2–80 characters.";
  const phone = details.phone.replace(/[\s()\-]/g, "");
  if (!/^(?:\+?91)?[6-9]\d{9}$/.test(phone)) errors.phone = "Enter a valid 10-digit Indian mobile number.";
  if (details.note.length > 400) errors.note = "Keep your note to 400 characters or fewer.";
  return errors;
}
export function createBookingMessage(booking: BookingConfirmation) {
  return ["Hello Look Good Salon! This is a demo appointment request.", `Booking ID: ${booking.id}`, `Service: ${booking.serviceName}`, `Date: ${formatBookingDate(booking.date)}`, `Time: ${booking.time} (IST)`, `Name: ${booking.name}`, `Phone: ${booking.phone}`, ...(booking.note ? [`Note: ${booking.note}`] : []), "Sample availability only; no appointment has been reserved."].join("\n");
}
