// app/api/send-failed-billing/route.ts
// Author: Abdullah Alhennawy — Resend / React Email example
import { Resend } from "resend";
import FailedBillingEmail from "@/emails/FailedBillingEmail"; // should be a server-safe React function component
import fs from "fs";
import path from "path";
import { renderToStaticMarkup } from "react-dom/server";

type RequestBody = {
  to?: string;
  customerName?: string;
  amount?: string | number;
  retryUrl?: string;
  invoiceNumber?: string;
  attachPath?: string;
};

function resolveAttachmentPath(attachPath?: string) {
  if (attachPath && path.isAbsolute(attachPath)) return attachPath;
  if (attachPath) return path.resolve(process.cwd(), attachPath);

  // Try common locations (project attachments or sandbox)
  const candidates = [
    path.resolve(process.cwd(), "attachments/abdu-support-invoice.pdf"),
    path.resolve(process.cwd(), "public/invoices/abdu-support-invoice-styled.pdf"),
    "/mnt/data/abdu-support-invoice.pdf",
    "/mnt/data/abdu-support-invoice-styled.pdf",
  ];

  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

export async function POST(request: Request) {
  try {
    // Lazy-read the API key so build doesn't fail at import time.
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Missing RESEND_API_KEY on server" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    const body: RequestBody = await request.json().catch(() => ({}));
    const { to, customerName, amount, retryUrl, invoiceNumber, attachPath } = body ?? {};

    if (!to || typeof to !== "string") {
      return new Response(JSON.stringify({ error: "Missing or invalid 'to' address" }), { status: 400 });
    }
    if (!customerName || !amount) {
      return new Response(JSON.stringify({ error: "Missing customerName or amount" }), { status: 400 });
    }

    // Prepare attachment if available
    let attachments:
      | { filename: string; content: string; type?: string }[]
      | undefined = undefined;

    const resolved = resolveAttachmentPath(attachPath);
    if (resolved) {
      if (!fs.existsSync(resolved)) {
        return new Response(JSON.stringify({ error: `Attachment not found: ${resolved}` }), { status: 400 });
      }

      const buffer = fs.readFileSync(resolved);
      const base64 = buffer.toString("base64");
      const filename = path.basename(resolved);
      const ext = path.extname(filename).toLowerCase();
      let mime: string | undefined;
      if (ext === ".pdf") mime = "application/pdf";
      if (ext === ".png") mime = "image/png";
      if (ext === ".jpg" || ext === ".jpeg") mime = "image/jpeg";

      attachments = [{ filename, content: base64, type: mime }];
    }

    // Create the React element (call the component) and render to HTML string
    const reactElement = FailedBillingEmail({
      customerName,
      amount,
      retryUrl,
      invoiceNumber,
    });

    const html = renderToStaticMarkup(reactElement);

    const resp = await resend.emails.send({
      from: process.env.FROM_EMAIL || "Billing <billing@example.com>",
      to,
      subject: `Payment failed — $${amount}`,
      html, // send rendered HTML instead of `react:`
      attachments: attachments ?? undefined,
    });

    return new Response(JSON.stringify({ success: true, data: resp }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("send-failed-billing error:", err);
    return new Response(
      JSON.stringify({ error: "Internal error sending email", details: err?.message ?? String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
