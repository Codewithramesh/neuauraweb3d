import { site } from "../content/site";

export interface Enquiry {
  name: string;
  email: string;
  organisation: string;
  interest: string;
  message: string;
}
export type EnquiryResult =
  { status: "demo"; message: string } | { status: "accepted"; message: string };
export async function submitEnquiry(enquiry: Enquiry): Promise<EnquiryResult> {
  if (!site.enquiryEndpoint)
    return {
      status: "demo",
      message:
        "Your enquiry is prepared, but has not been sent. This preview has no connected delivery service. Download a copy to keep your details.",
    };
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(site.enquiryEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
      signal: controller.signal,
    });
    if (!response.ok)
      throw new Error(
        "The enquiry service could not accept your request. Your details have not been confirmed as received. Please try again.",
      );
    const result = (await response.json()) as { accepted?: boolean };
    if (result.accepted !== true)
      throw new Error(
        "The service did not confirm receipt. Your details remain here so you can try again or download them.",
      );
    return {
      status: "accepted",
      message:
        "The configured enquiry service has confirmed receipt of your enquiry.",
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError")
      throw new Error(
        "The service timed out. Receipt is unconfirmed. You can retry or download your enquiry.",
      );
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}
export function downloadEnquiry(enquiry: Enquiry) {
  const content = `NEUAURA — Pilot enquiry\n\nName: ${enquiry.name}\nWork email: ${enquiry.email}\nOrganisation: ${enquiry.organisation}\nInterest: ${enquiry.interest}\n\n${enquiry.message}\n\nSaved locally. Downloading this file does not send the enquiry.\n`;
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/plain;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "neuaura-pilot-enquiry.txt";
  a.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
