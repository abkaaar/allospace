import React, { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQProps {
  styles?: React.CSSProperties;
}

const FAQ = ({ styles }: FAQProps) => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "How do I set up my account?",
      answer:
        "It's easy! Simply create an account, provide your space details, and upload high-quality photos. You'll be live in minutes.",
    },
    {
      question: "How does payment splitting work?",
      answer:
        "Our integrated payment gateway ensures you receive your share of the booking fee, while also accommodating commissions for platform services.",
    },
    {
      question: "Can I set different rates for peak hours or special events?",
      answer:
        "Yes, AlloSpaces allows you to customize pricing based on demand.",
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8" style={styles}>
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full flex justify-between items-center p-4 text-left focus:outline-none hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              <span className="text-gray-500 transition-transform duration-300 transform">
                {openQuestion === index ? "−" : "+"}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out 
                ${
                  openQuestion === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }
              `}
            >
              <div className="overflow-hidden">
                <div className="p-4 pt-0 text-gray-600">{faq.answer}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
