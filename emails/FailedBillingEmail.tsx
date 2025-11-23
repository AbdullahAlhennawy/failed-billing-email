// emails/FailedBillingEmail.tsx
import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

export interface Props {
  customerName?: string;
  companyName?: string;
  planName?: string;
  amount?: string | number;
  retryUrl?: string;
  supportUrl?: string;
  attachmentUrl?: string;
  invoiceNumber?: string;
}

const PaymentFailedEmail: React.FC<Props> = (props) => {
  const {
    customerName = "Jonni",
    companyName = "Abdu Inc.",
    planName = "Pro Abdu Plan",
    amount = "$29",
    retryUrl = "https://abdullahalhennawy.com/retry-payment/",
    supportUrl = "https://abdullahalhennawy.com/contact/",
    attachmentUrl = "/invoices/abdu-support-invoice-styled.pdf",
    invoiceNumber,
  } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Payment failed - Let's get you back on track</Preview>

        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] px-[32px] py-[40px] mx-auto max-w-[600px]">
            {/* Header */}
            <Section className="text-center mb-[40px]">
              <Heading className="text-[24px] font-bold text-gray-900 m-0 mb-[8px]">
                Payment Failed
              </Heading>
              <Text className="text-[14px] text-gray-600 m-0">
                Don't worry, it happens to the best of us!
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[40px]">
              <Text className="text-[16px] text-gray-800 mb-[8px] m-0">
                Hi {customerName},
              </Text>

              <Text className="text-[16px] text-gray-800 mb-[8px] m-0">
                <br />
                We tried to process your payment for <strong>{planName}</strong>{" "}
                ({amount}/month), but it didn't go through. This could be due to
                an expired card, insufficient funds, or your bank blocking the
                transaction.
              </Text>

              <Text className="text-[16px] text-gray-800 mb-[6px] m-0">
                <br />
                No worries though - your account is still active for the next 3
                days, giving you time to update your payment method.
              </Text>

              {/* Primary Action Button */}
              <Section className="text-center mb-[32px] mt-[6px]">
                <Button
                  href={retryUrl}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-[32px] py-[16px] rounded-[6px] text-[16px] font-semibold no-underline box-border inline-block"
                >
                  Retry Payment Now
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-[16px] m-0 text-center">
                Need help with your payment?
              </Text>

              {/* Secondary Action Button */}
              <Section className="text-center mb-[40px]">
                <Button
                  href={supportUrl}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-[24px] py-[12px] rounded-[6px] text-[14px] font-medium no-underline box-border inline-block"
                >
                  Contact Support
                </Button>
              </Section>
            </Section>

            {/* P.S. Section */}
            <Section className="border-t border-solid border-gray-200 pt-[28px] mb-[32px]">
              <Text className="text-[15px] text-gray-600 mb-[0px] m-0 italic leading-relaxed">
                P.S. {customerName} — didn't expect this from a SaaS cofounder! Why
                miss a payment? <span className="not-italic">😉</span> I'd have
                thought you'd happily pay us twice to support a fellow startup —
                we'll gladly accept the double-payment if you're feeling
                generous.
              </Text>
            </Section>

            {/* PDF Receipt Download Section */}
            <Section className="border-t border-solid border-gray-200 pt-[32px] mb-[32px]">
              <Text className="text-[14px] text-gray-700 m-0 mb-[16px] font-medium">
                Invoice Receipt
              </Text>

              {invoiceNumber ? (
                <Text className="text-[13px] text-gray-600 m-0 mb-[16px]">
                  <strong>Invoice:</strong> {invoiceNumber}
                </Text>
              ) : (
                <Text className="text-[13px] text-gray-600 m-0 mb-[16px]">
                  <strong>File:</strong> Abdu-support-invoice-15-Nov.pdf
                </Text>
              )}

              <Section>
                <Button
                  href={attachmentUrl}
                  className="bg-gray-700 hover:bg-gray-800 text-white px-[20px] py-[10px] rounded-[4px] text-[13px] font-medium no-underline box-border inline-block"
                >
                  Download PDF
                </Button>
              </Section>
            </Section>

            {/* Footer */}
            <Section className="border-t border-solid border-gray-200 pt-[24px] text-center">
              <Text className="text-[12px] text-gray-500 m-0 mb-[8px]">
                {companyName} • 123 Startup Street, Tech City, TC 12345
              </Text>
              <Text className="text-[12px] text-gray-400 m-0 mt-[8px]">
                © 2024 {companyName}. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

PaymentFailedEmail.PreviewProps = {
  customerName: "Jonni",
  companyName: "Abdu Inc.",
  planName: "Pro Abdu Plan",
  amount: "$29",
  retryUrl: "https://yoursaas.com/billing/retry",
  supportUrl: "https://abdullahalhennawy.com/contact/",
  attachmentUrl: "/invoices/abdu-support-invoice-styled.pdf",
};

export default PaymentFailedEmail;
