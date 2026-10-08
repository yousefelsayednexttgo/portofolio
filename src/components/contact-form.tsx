"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { contactOptions, copy, profile } from "@/data/portfolio";
import { emptyContact, validateContact, type ContactErrors, type ContactFields } from "@/lib/contact";
import { trackConversion } from "@/lib/analytics";

export function ContactForm({ enabled }: { enabled: boolean }) {
  const [fields, setFields] = useState<ContactFields>(emptyContact);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const started = useRef(false);

  function change(name: keyof ContactFields, value: string) {
    setFields(current => ({ ...current, [name]: value }));
    setErrors(current => ({ ...current, [name]: undefined }));
    if (status === "error") { setStatus("idle"); setFeedback(""); }
  }

  function focusError(nextErrors: ContactErrors) {
    const field = form.current?.querySelector<HTMLElement>('[name="' + Object.keys(nextErrors)[0] + '"]');
    const details = field?.closest("details");
    if (details) details.open = true;
    field?.focus();
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (status === "sending") return;
    const nextErrors = validateContact(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { focusError(nextErrors); return; }
    if (!enabled) {
      setStatus("error");
      setFeedback(profile.email || profile.whatsapp || profile.linkedin
        ? "Email delivery isn’t connected yet. Please use one of the contact links."
        : "Email delivery isn’t connected yet. This preview cannot send inquiries.");
      return;
    }
    setStatus("sending"); setFeedback("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fields) });
      const result = await response.json();
      if (!response.ok) {
        if (result.errors) { setErrors(result.errors); focusError(result.errors); }
        throw new Error(result.message || "Your inquiry couldn’t be sent. Please try again.");
      }
      trackConversion("inquiry_success", { placement: "contact-form" });
      setStatus("success");
      setFields(emptyContact);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Connection interrupted. Please try again.");
    }
  }

  const fieldProps = (name: keyof ContactFields) => ({
    id: "contact-" + name, name, value: fields[name],
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => change(name, event.target.value),
    "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? name + "-error" : undefined,
  });
  const errorFor = (name: keyof ContactFields) => errors[name] && <span id={name + "-error"} className="field-error">{errors[name]}</span>;

  if (status === "success") return <div className="form-success" role="status"><CheckCircle2 size={42} aria-hidden="true" /><h3>Your inquiry has been sent.</h3><p>Thanks for sharing your project. I’ll reply using the email address you provided so we can discuss the next step.</p><button className="button button-outline" onClick={() => { started.current = false; setStatus("idle"); }}>Send another inquiry</button></div>;

  return <form ref={form} className="contact-form" onSubmit={submit} noValidate onFocusCapture={() => {
    if (!started.current) { started.current = true; trackConversion("form_start", { placement: "contact-form" }); }
  }}>
    <div className="form-header"><p className="offer-label">YOUR PROJECT STARTS HERE</p><h3>{copy.contactCta}</h3><p>Four essentials. No need to know your budget yet.</p></div>
    {!enabled && <p className="form-setup-note">Preview only · inquiry delivery is not available yet.</p>}
    <div className="form-grid">
      <div className="field"><label htmlFor="contact-name">Name <span>*</span></label><input {...fieldProps("name")} autoComplete="name" placeholder="Your name" maxLength={100} required />{errorFor("name")}</div>
      <div className="field"><label htmlFor="contact-email">Email <span>*</span></label><input {...fieldProps("email")} type="email" autoComplete="email" placeholder="you@company.com" maxLength={254} required />{errorFor("email")}</div>
      <div className="field field-full"><label htmlFor="contact-service">Service needed <span>*</span></label><select {...fieldProps("service")} required><option value="">What would you like to improve?</option>{contactOptions.services.map(option => <option key={option}>{option}</option>)}</select>{errorFor("service")}</div>
      <div className="field field-full"><label htmlFor="contact-message">Tell me about your project <span>*</span></label><textarea {...fieldProps("message")} rows={3} placeholder="What’s your biggest priority? A sentence or two is enough." maxLength={5000} required />{errorFor("message")}</div>
    </div>
    <details className="form-optional"><summary>Add website or budget details <span>(optional)</span></summary><div className="form-grid">
      <div className="field"><label htmlFor="contact-website">Website (optional)</label><input {...fieldProps("website")} type="url" autoComplete="url" placeholder="https://yourstore.com" maxLength={500} />{errorFor("website")}</div>
      <div className="field"><label htmlFor="contact-company">Company (optional)</label><input {...fieldProps("company")} autoComplete="organization" placeholder="Your brand" maxLength={150} />{errorFor("company")}</div>
      <div className="field"><label htmlFor="contact-projectBudget">Project budget (optional)</label><select {...fieldProps("projectBudget")}><option value="">Not sure yet</option>{contactOptions.projectBudgets.map(option => <option key={option}>{option}</option>)}</select>{errorFor("projectBudget")}</div>
      <div className="field"><label htmlFor="contact-adBudget">Monthly ad budget (optional)</label><select {...fieldProps("adBudget")}><option value="">Not applicable or unsure</option>{contactOptions.adBudgets.map(option => <option key={option}>{option}</option>)}</select>{errorFor("adBudget")}</div>
    </div></details>
    <div className="honeypot" aria-hidden="true"><label htmlFor="contact-honeypot">Leave this field empty</label><input {...fieldProps("honeypot")} tabIndex={-1} autoComplete="off" /></div>
    {feedback && <p className="form-feedback" role="alert">{feedback}</p>}
    <button type="submit" className="button form-submit" disabled={status === "sending"}>{status === "sending" ? <><LoaderCircle size={17} className="spinner" aria-hidden="true" />Sending…</> : <>Send project inquiry<ArrowUpRight size={17} aria-hidden="true" /></>}</button>
    <p className="form-privacy">{copy.contact.note}</p>
    {profile.whatsapp && <a className="form-whatsapp" href={"https://wa.me/" + profile.whatsapp} data-cta="form-whatsapp" target="_blank" rel="noopener noreferrer">Prefer WhatsApp? Start a conversation</a>}
  </form>;
}

