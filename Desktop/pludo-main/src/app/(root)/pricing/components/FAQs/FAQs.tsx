import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "./data";

export function FAQs() {
  return (
    <Accordion type="single" collapsible className="w-full lg:max-w-5xl bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-lg  border-white/30  ">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
