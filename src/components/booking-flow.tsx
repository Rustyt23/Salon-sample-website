"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, Check, CheckCheck, ChevronLeft, ChevronRight, Clock3, LoaderCircle, MapPin, MessageCircle, Scissors, Sparkles } from "lucide-react";
import { services, salon, formatPrice } from "@/data/salon";
import { addDays, bookingConfig, calendarCells, createBookingMessage, formatBookingDate, getDemoSlots, getTodayInIndia, isBookableDate, monthStart, validateCustomer, type BookingConfirmation, type CustomerDetails } from "@/data/booking";
import { SalonImage } from "./salon-image";

function subscribeClock(callback: () => void) {
  const interval = window.setInterval(callback, 60_000);
  return () => window.clearInterval(interval);
}
function subscribeLocation(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}
const emptySnapshot = () => "";
const searchSnapshot = () => window.location.search;
const titles = ["What feels like you?", "Make a little time.", "Find your moment.", "A few details, then you’re set."];
const descriptions = ["Choose your service. We’ll take care of the little details.", "Choose a day within the next two months.", "A little space in your day, just for you. Times are shown in IST.", "Tell us who we’re welcoming. Your details stay in this page only."];

export function BookingFlow() {
  const router = useRouter();
  const today = useSyncExternalStore(subscribeClock, getTodayInIndia, emptySnapshot);
  const search = useSyncExternalStore(subscribeLocation, searchSnapshot, emptySnapshot);
  const params = new URLSearchParams(search);
  const requestedService = params.get("service");
  const requestedLook = params.get("look")?.slice(0, 80) ?? "";
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const service = services.find((item) => item.id === (selectedServiceId ?? requestedService));
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [monthOffset, setMonthOffset] = useState(0);
  const [customer, setCustomer] = useState<CustomerDetails>({ name: "", phone: "", note: "" });
  const [noteEdited, setNoteEdited] = useState(false);
  const details = { ...customer, note: noteEdited ? customer.note : requestedLook ? `Style Studio: ${requestedLook}` : "" };
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const panelHeading = useRef<HTMLHeadingElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const submissionLock = useRef(false);
  useLayoutEffect(() => {
    if (!confirmation) return;
    panelHeading.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [confirmation]);
  const firstDay = today ? monthStart(today, monthOffset) : "";
  const lastDay = today ? addDays(today, bookingConfig.advanceDays) : "";
  const slots = getDemoSlots(selectedDate);
  const canContinue = step === 0 ? !!service : step === 1 ? isBookableDate(selectedDate, today) : step === 2 ? !!selectedTime && slots.some((slot) => slot.time === selectedTime && slot.available) : true;

  function focusPanel() {
    requestAnimationFrame(() => {
      panelHeading.current?.focus({ preventScroll: true });
      panelHeading.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    });
  }
  function changeStep(next: number) {
    setErrors({}); setStep(next); focusPanel();
  }
  function updateCustomer(field: keyof CustomerDetails, value: string) {
    if (field === "note") setNoteEdited(true);
    setCustomer((details) => ({ ...details, [field]: value }));
    setErrors((previous) => { const next = { ...previous }; delete next[field]; return next; });
  }
  function continueFlow(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!canContinue || submitting) return;
    changeStep(Math.min(step + 1, 3));
  }
  async function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionLock.current) return;
    if (!service) { changeStep(0); return; }
    if (!isBookableDate(selectedDate, today)) { changeStep(1); setErrors({ date: "Choose a current date from the sample calendar." }); return; }
    if (!slots.some((slot) => slot.time === selectedTime && slot.available)) { changeStep(2); return; }
    const validation = validateCustomer(details);
    if (Object.keys(validation).length) {
      setErrors(validation);
      requestAnimationFrame(() => form.current?.querySelector<HTMLInputElement>("[aria-invalid='true']")?.focus());
      return;
    }
    submissionLock.current = true; setSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 800));
    setConfirmation({ ...details, name: details.name.trim(), phone: details.phone.trim(), note: details.note.trim(), serviceName: service.name, date: selectedDate, time: selectedTime, price: service.price, duration: service.duration, id: `LG-DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}` });
    setSubmitting(false); submissionLock.current = false;
  }
  function startAgain() {
    setSelectedServiceId(""); setSelectedDate(""); setSelectedTime(""); setCustomer({ name: "", phone: "", note: "" }); setNoteEdited(true); setMonthOffset(0); setConfirmation(null); changeStep(0);
  }

  if (confirmation) return <section className="container booking-success" aria-live="polite"><div className="success-card">
    <span className="success-icon"><CheckCheck size={36} strokeWidth={1.4} aria-hidden="true" /></span><span className="demo-badge">DEMO REQUEST</span>
    <h1 ref={panelHeading} tabIndex={-1}>Your appointment<br /><em>preview.</em></h1><p className="success-intro">A little time for you, {confirmation.name.split(" ")[0]}.</p><p className="success-honesty">Preview complete. Nothing has been sent or reserved.</p>
    <div className="success-reference"><span>YOUR PREVIEW REFERENCE</span><strong>{confirmation.id}</strong></div>
    <dl className="success-details"><div><dt>Service</dt><dd>{confirmation.serviceName}</dd></div><div><dt>Date</dt><dd>{formatBookingDate(confirmation.date)}</dd></div><div><dt>Time</dt><dd>{confirmation.time} <span>(IST)</span></dd></div><div><dt>Duration</dt><dd>{confirmation.duration}</dd></div><div><dt>Price</dt><dd>From {formatPrice(confirmation.price)}</dd></div><div><dt>Guest</dt><dd>{confirmation.name}</dd></div><div><dt>Phone</dt><dd>{confirmation.phone}</dd></div>{confirmation.note && <div><dt>Your note</dt><dd>{confirmation.note}</dd></div>}</dl>
    <a className="button button-dark success-whatsapp" href={`https://wa.me/${salon.whatsappNumber}?text=${encodeURIComponent(createBookingMessage(confirmation))}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} aria-hidden="true" /> Continue on WhatsApp</a><p className="success-whatsapp-note">Opens a pre-filled message with your request details.</p>
    <p className="confirmation-demo-note">{bookingConfig.confirmationNote}</p><div className="success-links"><button type="button" className="text-link" onClick={startAgain}>Try another look</button><Link className="text-link" href="/">Back to the salon</Link></div>
  </div></section>;

  return <section className="container booking-experience"><div className="booking-intro"><div><p className="eyebrow"><Sparkles size={15} aria-hidden="true" /> A LITTLE TIME, JUST FOR YOU</p><h1>Your next <em>good day.</em></h1><p>Choose your service. Find your moment. Leave the rest to us.</p><p className="booking-inspiration">{requestedLook && selectedServiceId !== "" && <>Your inspiration: <strong>{requestedLook}</strong></>}</p></div><span className="demo-badge">BOOKING PREVIEW</span></div>
    <ol className="booking-progress" aria-label={`Booking progress: step ${step + 1} of 4`}>{bookingConfig.steps.map((label, index) => <li key={label} data-state={index < step ? "complete" : index === step ? "current" : "upcoming"} aria-current={index === step ? "step" : undefined}><span>{index < step ? <Check size={16} aria-hidden="true" /> : String(index + 1).padStart(2, "0")}</span><p>{label}</p></li>)}</ol>
    <div className="booking-layout"><div className="booking-panel">
      <div className="booking-panel-heading"><span className="eyebrow">STEP {String(step + 1).padStart(2, "0")} OF 04</span><h2 ref={panelHeading} tabIndex={-1}>{titles[step]}</h2><p>{descriptions[step]}</p></div>
      <div className="booking-step-content" key={step}>
        {step === 0 && <div className="booking-service-list" role="radiogroup" aria-label="Select a service">{services.map((item) => <label className={`booking-service-option ${service?.id === item.id ? "is-selected" : ""}`} key={item.id}><input type="radio" name="service" value={item.id} checked={service?.id === item.id} onChange={() => { setSelectedServiceId(item.id); setSelectedTime(""); }} /><span className="service-option-icon"><Scissors size={21} strokeWidth={1.3} aria-hidden="true" /></span><span className="service-option-copy"><strong>{item.name}</strong><span>{item.category} · {item.duration}</span></span><span className="service-option-price"><span>From</span>{formatPrice(item.price)}</span><span className="option-check"><Check size={13} aria-hidden="true" /></span></label>)}</div>}
        {step === 1 && <>{today ? <div className="booking-calendar"><div className="calendar-header"><button type="button" aria-label="Previous month" disabled={monthOffset === 0} onClick={() => setMonthOffset(monthOffset - 1)}><ChevronLeft size={21} /></button><h3>{new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${firstDay}T12:00:00Z`))}</h3><button type="button" aria-label="Next month" disabled={monthStart(firstDay, 1) > lastDay} onClick={() => setMonthOffset(monthOffset + 1)}><ChevronRight size={21} /></button></div><div className="calendar-weekdays" aria-hidden="true">{["M", "T", "W", "T", "F", "S", "S"].map((day, index) => <span key={index}>{day}</span>)}</div><div className="calendar-grid" role="group" aria-label="Choose an appointment date">{calendarCells(firstDay).map((date, index) => date ? <button type="button" key={date} disabled={!isBookableDate(date, today)} className={`calendar-day ${selectedDate === date ? "is-selected" : ""} ${date === today ? "is-today" : ""}`} aria-pressed={selectedDate === date} aria-label={formatBookingDate(date)} onClick={() => { if (date !== selectedDate) setSelectedTime(""); setSelectedDate(date); setErrors({}); }}>{Number(date.slice(-2))}</button> : <span key={`blank-${index}`} />)}</div><div className="calendar-legend"><span><i /> Today</span><span><i /> Selected date</span></div>{selectedDate && <p className="date-selection"><Check size={16} aria-hidden="true" /> {formatBookingDate(selectedDate)}</p>}</div> : <p className="booking-loading" role="status">Preparing your calendar…</p>}{errors.date && <p className="field-error" role="alert">{errors.date}</p>}</>}
        {step === 2 && <><div className="time-date-label"><CalendarDays size={18} aria-hidden="true" /><span>{selectedDate ? formatBookingDate(selectedDate) : "Choose a date"}</span><button type="button" onClick={() => changeStep(1)}>Change</button></div><div className="booking-time-slots" role="radiogroup" aria-label="Select an available time">{slots.map((slot) => <label className={`time-slot ${!slot.available ? "is-unavailable" : ""} ${selectedTime === slot.time ? "is-selected" : ""}`} key={slot.time}><input type="radio" name="time" value={slot.time} disabled={!slot.available} checked={selectedTime === slot.time} onChange={() => setSelectedTime(slot.time)} /><Clock3 size={18} strokeWidth={1.3} aria-hidden="true" /><strong>{slot.time}</strong><span>{slot.available ? selectedTime === slot.time ? "Selected" : "Available" : "Unavailable"}</span></label>)}</div><p className="booking-availability-note">Choose a time that works for you.</p></>}
        {step === 3 && <form id="booking-details" ref={form} noValidate onSubmit={submitRequest} aria-busy={submitting}><fieldset className="customer-fields" disabled={submitting}><legend className="sr-only">Customer details</legend><div className="form-field"><label htmlFor="customer-name">Your name <span>*</span></label><input id="customer-name" name="name" autoComplete="name" placeholder="Your full name" value={customer.name} maxLength={80} required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} onChange={(event) => updateCustomer("name", event.target.value)} />{errors.name && <p className="field-error" id="name-error" role="alert">{errors.name}</p>}</div><div className="form-field"><label htmlFor="customer-phone">Phone number <span>*</span></label><input id="customer-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Your 10-digit mobile number" value={customer.phone} maxLength={18} required aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : "phone-hint"} onChange={(event) => updateCustomer("phone", event.target.value)} /><p className={errors.phone ? "field-error" : "field-hint"} id={errors.phone ? "phone-error" : "phone-hint"} role={errors.phone ? "alert" : undefined}>{errors.phone || "An Indian mobile number, with or without +91."}</p></div><div className="form-field"><label htmlFor="customer-note">Anything we should know? <span className="optional-label">Optional</span></label><textarea id="customer-note" name="note" rows={3} placeholder="A style you love, an occasion, or a little preference…" value={details.note} maxLength={400} aria-invalid={!!errors.note} aria-describedby="note-hint" onChange={(event) => updateCustomer("note", event.target.value)} /><p className="field-hint note-counter" id="note-hint">{details.note.length} / 400 characters</p></div></fieldset><div className="details-demo-note"><CheckCheck size={21} strokeWidth={1.3} aria-hidden="true" /><p>A demo request, just for this preview. No appointment will be reserved and your details won’t be saved.</p></div></form>}
      </div>
      <div className="booking-flow-actions"><button type="button" className="button button-outline" disabled={submitting} onClick={() => step > 0 ? changeStep(step - 1) : router.push("/services")}>{step === 0 ? "Cancel" : "Back"}</button>{step < 3 ? <button key="continue" type="button" className="button button-dark" disabled={!canContinue} onClick={continueFlow}>Continue</button> : <button key="submit" type="submit" form="booking-details" className="button button-dark" disabled={submitting}>{submitting ? <><LoaderCircle className="loading-spinner" size={18} aria-hidden="true" /> Preparing request…</> : "Send Demo Request"}</button>}</div>
      <div className="booking-status" role="status">{submitting ? "Preparing your sample confirmation…" : step < 3 && !canContinue ? `Select ${step === 0 ? "a service" : step === 1 ? "a date" : "an available time"} to continue.` : ""}</div>
    </div><aside className="booking-summary" aria-label="Booking summary"><div className="booking-summary-photo"><SalonImage priority name={service?.image ?? "color"} alt={service?.alt ?? "Soft balayage inspiration for your next look"} sizes="(max-width: 850px) 90vw, 30vw" /><span>YOUR LITTLE RESET</span></div><div className="booking-summary-content"><p className="eyebrow">YOUR APPOINTMENT</p><h2>A little something<br /><em>to look forward to.</em></h2><dl className="booking-summary-details"><div><dt><Scissors size={17} aria-hidden="true" /> Service</dt><dd>{service?.name ?? "Choose your service"}{service && <span>{service.duration} · From {formatPrice(service.price)}</span>}</dd></div><div><dt><CalendarDays size={17} aria-hidden="true" /> Date</dt><dd>{selectedDate ? formatBookingDate(selectedDate, true) : "Choose your day"}</dd></div><div><dt><Clock3 size={17} aria-hidden="true" /> Time</dt><dd>{selectedTime ? `${selectedTime} · IST` : "Choose your moment"}</dd></div></dl><div className="summary-location"><MapPin size={17} aria-hidden="true" /><p>Old Agarwal Nagar, Indore.<a href={salon.mapsUrl} target="_blank" rel="noopener noreferrer">Get directions</a></p></div><p className="summary-sample-note">Preview availability · No payment required.</p></div></aside></div>
  </section>;
}
