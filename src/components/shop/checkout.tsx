"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Banknote, Check, CheckCircle2, CreditCard, LockKeyhole, Smartphone } from "lucide-react";
import { calculateTotals, orderWhatsAppUrl, type CartItem, type CustomerDetails } from "@/data/shop";
import { useCart } from "./cart-provider";
import { CartLines, EmptyCart, Totals, WhatsAppOrder } from "./cart-ui";

const steps = ["Cart", "Customer Details", "Delivery Address", "Payment Method", "Confirmation"];
const payments = [{ name: "UPI", icon: Smartphone, description: "Simulate a UPI order" }, { name: "Card", icon: CreditCard, description: "Simulate a card order" }, { name: "Cash on Delivery", icon: Banknote, description: "Simulate payment on arrival" }];
type Order = { id: string; items: CartItem[]; customer: CustomerDetails; payment: string; totals: ReturnType<typeof calculateTotals> };
type FieldName = keyof CustomerDetails;
type Errors = Partial<Record<FieldName, string>>;
const emptyDetails: CustomerDetails = { name: "", phone: "", email: "", address: "", city: "", state: "", pincode: "" };

export function validateCustomer(customer: CustomerDetails, stage: number): Errors {
  const errors: Errors = {};
  if (stage === 1) {
    if (customer.name.trim().length < 2) errors.name = "Enter your full name.";
    const phone = customer.phone.replace(/[\s()-]/g, "").replace(/^\+91/, "");
    if (!/^[6-9]\d{9}$/.test(phone)) errors.phone = "Enter a 10-digit Indian mobile number.";
    if (customer.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) errors.email = "Enter a valid email, or leave this optional field empty.";
  }
  if (stage === 2) {
    if (customer.address.trim().length < 6) errors.address = "Enter a street address with building or house details.";
    if (customer.city.trim().length < 2) errors.city = "Enter your city.";
    if (customer.state.trim().length < 2) errors.state = "Enter your state.";
    if (!/^[1-9]\d{5}$/.test(customer.pincode.trim())) errors.pincode = "Enter a 6-digit Indian PIN code.";
  }
  return errors;
}
export function Checkout() {
  const { items, totals, ready, clear } = useCart();
  const [stage, setStage] = useState(0);
  const [customer, setCustomer] = useState<CustomerDetails>(emptyDetails);
  const [payment, setPayment] = useState("UPI");
  const [errors, setErrors] = useState<Errors>({});
  const [order, setOrder] = useState<Order | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const submitted = useRef(false);
  function changeStage(next: number) {
    setStage(next); setErrors({});
    requestAnimationFrame(() => { heading.current?.focus({ preventScroll: true }); heading.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); });
  }
  function showErrors(nextErrors: Errors) {
    setErrors(nextErrors);
    requestAnimationFrame(() => document.getElementById(`checkout-${Object.keys(nextErrors)[0]}`)?.focus());
  }
  function next() {
    const nextErrors = validateCustomer(customer, stage);
    if (Object.keys(nextErrors).length) { showErrors(nextErrors); return; }
    changeStage(stage + 1);
  }
  function placeOrder() {
    if (submitted.current || !items.length) return;
    for (const step of [1, 2]) {
      const nextErrors = validateCustomer(customer, step);
      if (Object.keys(nextErrors).length) { setStage(step); showErrors(nextErrors); return; }
    }
    submitted.current = true;
    const id = `LG-DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    setOrder({ id, items: items.map((item) => ({ ...item })), totals: { ...totals }, customer: { ...customer }, payment });
    clear(); changeStage(4);
  }
  function field(name: FieldName, label: string, options: { type?: string; autoComplete?: string; placeholder?: string; inputMode?: "tel" | "numeric" | "email" | "text"; maxLength?: number } = {}) {
    return <div className={`checkout-field ${name === "address" ? "field-wide" : ""}`}><label htmlFor={`checkout-${name}`}>{label}</label><input id={`checkout-${name}`} name={name} type={options.type ?? "text"} autoComplete={options.autoComplete} placeholder={options.placeholder} inputMode={options.inputMode} maxLength={options.maxLength ?? 150} value={customer[name]} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `error-${name}` : undefined} required={name !== "email"} onChange={(event) => { setCustomer({ ...customer, [name]: event.target.value }); if (errors[name]) setErrors({ ...errors, [name]: undefined }); }} />{errors[name] && <span id={`error-${name}`} className="checkout-error">{errors[name]}</span>}</div>;
  }
  return <div className="container shop-page checkout-page"><div className="shop-page-heading"><p className="eyebrow">THE LOOK GOOD SHOP</p><h1>{order ? <>A well-chosen <em>care edit.</em></> : <>Your everyday <em>ritual awaits.</em></>}</h1><p className="checkout-demo-notice"><LockKeyhole size={15} aria-hidden="true" />Demo checkout — no payment is collected, no real order is sent, and no delivery is arranged. Use illustrative details.</p></div>
    <ol className="checkout-steps" aria-label="Checkout progress">{steps.map((label, index) => <li key={label} aria-current={stage === index ? "step" : undefined} className={stage > index ? "complete" : ""}><span>{stage > index ? <Check size={13} aria-hidden="true" /> : `0${index + 1}`}</span>{label}</li>)}</ol>
    {order ? <div className="checkout-success"><div className="success-intro"><CheckCircle2 size={48} strokeWidth={1} aria-hidden="true" /><p className="eyebrow">YOUR DEMO IS COMPLETE</p><h2 ref={heading} tabIndex={-1}>Order Placed Successfully</h2><p>This is an illustrative confirmation. No payment was taken.</p><span className="order-id">Sample order ID: <strong>{order.id}</strong></span></div><div className="checkout-success-grid"><section><h3>Your order</h3><CartLines items={order.items} editable={false} /><Totals totals={order.totals} /></section><section className="confirmation-details"><h3>Customer & delivery details</h3><p>{order.customer.name}<br />{order.customer.phone}{order.customer.email && <><br />{order.customer.email}</>}</p><p>{order.customer.address}<br />{order.customer.city}, {order.customer.state} {order.customer.pincode}</p><h3>Demo payment choice</h3><p>{order.payment} · simulated only</p><WhatsAppOrder items={order.items} href={orderWhatsAppUrl(order.items, order.customer, order.payment, order.id)} /><p className="shop-fineprint">Opens a prefilled message using the salon’s demo contact. Nothing is sent automatically.</p><Link href="/shop" className="text-link">Back to the collection <ArrowRight size={15} aria-hidden="true" /></Link></section></div></div> : !ready ? <p className="cart-loading" role="status">Loading your bag…</p> : !items.length ? <EmptyCart /> : <div className="checkout-layout"><section className="checkout-panel"><p className="eyebrow">STEP 0{stage + 1} OF 04</p><h2 ref={heading} tabIndex={-1}>{stage === 0 ? "Your care edit" : stage === 1 ? "A little about you" : stage === 2 ? "Where it would arrive" : "Choose a payment method"}</h2>
      {stage === 0 ? <><CartLines items={items} /><p className="shop-fineprint">Review your quantities before continuing. All products are part of our fictional Luma Ritual collection.</p><button className="button button-dark checkout-continue" type="button" onClick={next}>Customer details <ArrowRight size={16} aria-hidden="true" /></button><Link href="/cart" className="text-link">Back to your bag</Link></> : <form noValidate onSubmit={(event) => { event.preventDefault(); if (stage === 3) placeOrder(); else next(); }}>
        {stage === 1 && <div className="checkout-fields">{field("name", "Full name", { autoComplete: "name", placeholder: "Your name" })}{field("phone", "Mobile number", { type: "tel", autoComplete: "tel", placeholder: "10-digit mobile number", inputMode: "tel", maxLength: 20 })}{field("email", "Email (optional)", { type: "email", autoComplete: "email", placeholder: "you@example.com", inputMode: "email" })}</div>}
        {stage === 2 && <div className="checkout-fields">{field("address", "Street address", { autoComplete: "street-address", placeholder: "House / building, street and area" })}{field("city", "City", { autoComplete: "address-level2", placeholder: "Indore" })}{field("state", "State", { autoComplete: "address-level1", placeholder: "Madhya Pradesh" })}{field("pincode", "PIN code", { autoComplete: "postal-code", placeholder: "452001", inputMode: "numeric", maxLength: 6 })}</div>}
        {stage === 3 && <><p className="payment-note">Simulated choices only. No card, bank or UPI credentials are collected.</p><fieldset className="payment-options"><legend className="sr-only">Demo payment method</legend>{payments.map(({ name, icon: Icon, description }) => <label key={name} className={payment === name ? "selected" : ""}><input type="radio" name="payment" value={name} checked={payment === name} onChange={() => setPayment(name)} /><Icon size={23} strokeWidth={1.4} aria-hidden="true" /><span><strong>{name}</strong><small>{description}</small></span></label>)}</fieldset><div className="checkout-delivery-review"><p><strong>{customer.name}</strong> · {customer.phone}</p><p>{customer.address}, {customer.city}, {customer.state} {customer.pincode}</p><button type="button" className="text-link" onClick={() => changeStage(1)}>Edit customer details</button><button type="button" className="text-link" onClick={() => changeStage(2)}>Edit delivery address</button></div></>}
        <div className="checkout-controls"><button type="button" className="checkout-back" onClick={() => changeStage(stage - 1)}><ArrowLeft size={16} aria-hidden="true" />Back</button><button className="button button-dark" type="submit">{stage === 3 ? "Place Demo Order" : "Continue"}<ArrowRight size={16} aria-hidden="true" /></button></div><p className="shop-fineprint">Your details stay in this browser session. The cart alone is saved on this device.</p>
      </form>}
    </section><aside className="order-summary"><p className="eyebrow">YOUR BAG · {items.reduce((sum, item) => sum + item.quantity, 0)} {items.reduce((sum, item) => sum + item.quantity, 0) === 1 ? "ITEM" : "ITEMS"}</p><h2>Order summary</h2><ul className="checkout-summary-items">{items.map(({ product, quantity }) => <li key={product.id}><span>{product.name}</span><span>× {quantity}</span></li>)}</ul><Totals totals={totals} /><p className="shop-fineprint">Illustrative delivery ₹99; complimentary from ₹1,499. No real delivery is arranged.</p><WhatsAppOrder items={items} href={orderWhatsAppUrl(items, stage > 1 ? customer : undefined, stage === 3 ? payment : undefined)} /></aside></div>}
  </div>;
}
