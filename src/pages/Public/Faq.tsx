import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqProps {
  heading?: string;
  items?: FaqItem[];
}
const Faq = ({
  heading = "Frequently asked questions",
  items = [
    {
      id: "faq-1",
      question: "Is PaisaHiPaisa free to use?",
      answer:
        "Yes, PaisaHiPaisa offers a lifetime free service with essential features. You can do unlimited transactions.",
    },
    {
      id: "faq-2",
      question: "How secure is my financial data?",
      answer:
        "Your data is protected with high-level encryption. We never share your personal or financial information with third parties.",
    },
    {
      id: "faq-3",
      question: "Can I access PaisaHiPaisa on my phone?",
      answer:
        "Yes, our app is fully responsive and works on all devices, including mobile, tablet, and desktop.",
    },
    {
      id: "faq-4",
      question: "What kind of transactions can I track?",
      answer:
        "You can track all of your lifetime transactions with advanced filters.",
    },
    {
      id: "faq-5",
      question: "Do I need to install any software?",
      answer:
        "No installation is required. PaisaHiPaisa is web-based, so you can use it directly through your browser.",
    },
    {
      id: "faq-6",
      question: "Can I export my data?",
      answer:
        "No as of now. The feature is on the way.",
    },
    {
      id: "faq-7",
      question: "Does PaisaHiPaisa support multiple currencies?",
      answer:
        "No, the transactions are in Bangladeshi Taka(BDT) only.",
    },
    {
      id: "faq-8",
      question: "How can I contact support?",
      answer:
        "You can reach our support team via the contact form on our website. We usually respond within 24 hours.",
    },
    {
      id: "faq-9",
      question: "Is there a limit on the number of transactions?",
      answer:
        "No, we don't support limits haha.",
    },
    {
      id: "faq-10",
      question: "Can I share my account with others?",
      answer:
        "For security reasons, sharing accounts is not recommended. However, business accounts allow multiple authorized users with different roles.",
    },
  ],
}: FaqProps) => {
  return (
    <section className="py-16">
      <div className="container w-80 mx-auto md:w-2xl">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
          {heading}
        </h1>
        <Accordion type="single" collapsible>
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};


export { Faq };
