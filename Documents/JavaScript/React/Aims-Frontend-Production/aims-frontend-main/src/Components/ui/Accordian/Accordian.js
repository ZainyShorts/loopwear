"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from 'lucide-react';

import { cn } from "../../utils/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(function AccordionItem(
  { className, ...props },
  ref
) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b", className)}
      {...props}
    />
  );
});

const AccordionTrigger = React.forwardRef(function AccordionTrigger(
  { className, children, ...props },
  ref
) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all text-gray-200 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-500" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

const AccordionContent = React.forwardRef(function AccordionContent(
  { className, children, ...props },
  ref
) {
  return (
    <>
      <AccordionPrimitive.Content
        ref={ref}
        {...props}
        className={cn(
          "overflow-hidden text-sm transition-all duration-300 ease-out",
          {
            "data-[state=open]:animate-slide-down": true,
            "data-[state=closed]:animate-slide-up": true,
          },
          className
        )}
      >
        <div className="pb-4 pt-0">{children}</div>
      </AccordionPrimitive.Content>
      <style jsx>{`
        @keyframes slide-down {
          from {
            max-height: 0;
          }
          to {
            max-height: var(--radix-accordion-content-height, 100%);
          }
        }

        @keyframes slide-up {
          from {
            max-height: var(--radix-accordion-content-height, 100%);
          }
          to {
            max-height: 0;
          }
        }

        :global([data-state="open"].animate-slide-down) {
          animation: slide-down 300ms ease-out forwards;
        }

        :global([data-state="closed"].animate-slide-up) {
          animation: slide-up 300ms ease-out forwards;
        }
      `}</style>
    </>
  );
});

  

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

