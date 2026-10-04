import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking-flow";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: "Choose a service, date and time at Look Good Salon. Try our frontend booking demo with sample availability and a WhatsApp follow-up.",
};

export default function BookPage() {
  return <BookingFlow />;
}
