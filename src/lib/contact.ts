import { contactOptions } from "@/data/portfolio";

export type ContactFields = { name: string; email: string; company: string; website: string; service: string; adBudget: string; projectBudget: string; message: string; honeypot: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;
export const emptyContact: ContactFields = { name: "", email: "", company: "", website: "", service: "", adBudget: "", projectBudget: "", message: "", honeypot: "" };
export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  if (fields.name.trim().length < 2 || fields.name.length > 100) errors.name = "Please enter your name (2–100 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || fields.email.length > 254) errors.email = "Please enter a valid email address.";
  if (fields.company.length > 150) errors.company = "Please use 150 characters or fewer.";
  if (fields.website) {
    try { const url = new URL(fields.website); if (!["https:", "http:"].includes(url.protocol) || !url.hostname.includes(".") || fields.website.length > 500) throw new Error(); }
    catch { errors.website = "Please enter a full website URL, such as https://yourstore.com."; }
  }
  if (!contactOptions.services.includes(fields.service)) errors.service = "Please select a service.";
  if (fields.adBudget && !contactOptions.adBudgets.includes(fields.adBudget)) errors.adBudget = "Please select a valid budget.";
  if (fields.projectBudget && !contactOptions.projectBudgets.includes(fields.projectBudget)) errors.projectBudget = "Please select a valid budget.";
  if (fields.message.trim().length < 20 || fields.message.length > 5000) errors.message = "Tell me about your project in 20–5,000 characters.";
  return errors;
}
