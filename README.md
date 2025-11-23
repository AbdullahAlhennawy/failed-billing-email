# Failed Billing Email — React Email + Resend (Next.js)

This project is a simple, complete example of sending a **billing failure email** using:

- **Next.js** (API route for sending)
- **React Email** (email template)
- **Resend** (email delivery)
- A **PDF attachment** (invoice example)

The goal is to show how to go from **zero → sending a real email** with a clean, reproducible setup.

---

## 📁 Project structure

Important files in this repo:

- `emails/FailedBillingEmail.tsx`  
  React Email template used to generate the email HTML.

- `app/api/send-billing/route.ts`  
  Next.js API route that renders the email and sends it using Resend.

- `public/invoices/abdu-support-invoice.pdf`  
  Example attachment included in the project.

---

## 🧩 How I built this project

A quick breakdown of the main steps I completed:

### 1. Creating the email template  
I built the template using **React Email**, and I also used the **new.email** editor during development.  
The tool is genuinely great — fast preview, Tailwind-like styling, and easy iteration.

I ran into a small session issue where chat messages worked but template edits didn’t update.  
A simple page refresh solved it, and the editor synced correctly afterward.

### 2. Setting up the Next.js API route  
I created `app/api/send-billing/route.ts` which:

- Receives JSON from a POST request  
- Renders the React Email component to HTML  
- Reads the invoice PDF from the `public/` folder  
- Encodes it as base64  
- Sends everything through the Resend SDK

### 3. Preparing `.env.local`
I added:

RESEND_API_KEY=your_resend_key_here

The API key is only used server-side inside the API route.

### 4. Testing locally  
I started the dev server and used `curl` to POST to the API route.  
I verified:

- HTML email was generated correctly  
- Attachment was included  
- All props in the template rendered as expected  

---

## 🚀 Zero → Send Tutorial

### 1. Install dependencies
In the Terminal, run:
npm install

### 2. Add your Resend key

Create .env.local:
RESEND_API_KEY=your_resend_key_here

FROM_EMAIL="Billing <billing@yourdomain.com>"

<img width="941" height="146" alt="image" src="https://github.com/user-attachments/assets/173b1a5a-8d9e-4294-bd9b-fd22768ead0e" />

### 3. Start the development server
Terminal:
npm run dev

You should see that http://localhost:3000 is ready, here is what I got in the terminal

<img width="559" height="172" alt="image" src="https://github.com/user-attachments/assets/684bbdd8-5592-4f4b-a242-6226fbab0abb" />



### 4. Send the email (example request via cURL)
This example sends the email with the attachment in public/invoices/ (I hosted it in Google drive for the same of this assignment).

curl -X POST http://localhost:3000/api/send-billing \

  -H "Content-Type: application/json" \
  
  -d '{
    "to": "ONE-OF-YOUR-EMAIL-ADDRESSES-THAT-YOU-CAN-CHECK-THE-ONBOX-OF",
    
    "customerName": "Jonni",
    
    "planName": "Pro Abdu Plan",
    
    "amount": "$29",
    
    "invoicePath": "public/invoices/abdu-support-invoice.pdf",
    
    "repoUrl": "https://github.com/AbdullahAlhennawy/failed-billing-email"
  }'

### 5. Check your inbox

You should see:

- The full styled billing-failure email  
- The invoice PDF attachment  
- A link to the GitHub repo included in the email

## 🛠 Troubleshooting notes

These are real issues I hit while working on the project and how I resolved them:

• Attachment not loading

Make sure the file path is readable by the server.
Placing attachments under public/ simplifies everything.

• Template not updating in new.email

Refreshing the page restored sync.
Saved local backups to avoid losing changes.

• Email HTML not rendering as expected

Rendering through @react-email/render inside the API route solves this reliably.

### If you have any questions, feel free to contact me from here https://abdullahalhennawy.com/contact/
