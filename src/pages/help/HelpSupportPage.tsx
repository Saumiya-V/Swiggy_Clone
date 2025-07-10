import { useState } from "react";

type Category = {
  name: string;
  faqs: string[];
};

const categories: Category[] = [
  {
    name: "Partner Onboarding",
    faqs: [
      "I want to partner my restaurant with Swiggy",
      "What are the mandatory documents needed to list my restaurant on Swiggy?",
      "I want to opt-out from Google reserve",
      "After I submit all documents, how long will it take for my restaurant to go live on Swiggy?",
      "What is this one time Onboarding fees? Do I have to pay for it while registering?",
      "Who should I contact if I need help & support in getting onboarded?",
      "How much commission will I be charged by Swiggy?",
    ],
  },
  {
    name: "Legal",
    faqs: ["Legal query 1", "Legal query 2", "Legal query 3"],
  },
  {
    name: "FAQs",
    faqs: ["General FAQ 1", "General FAQ 2", "General FAQ 3"],
  },
  {
    name: "Instamart Onboarding",
    faqs: ["Instamart Onboarding question 1", "Instamart question 2"],
  },
  {
    name: "IRCTC FAQ",
    faqs: ["IRCTC FAQ 1", "IRCTC FAQ 2"],
  },
];

export default function HelpSupportPage() {
  const [activeCategory, setActiveCategory] = useState<Category>(categories[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#2c6c84] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl flex flex-col md:flex-row rounded shadow-lg overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/4 bg-[#f4f6fa] p-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Help & Support</h2>
          <p className="text-sm mb-6 text-gray-600">
            Let's take a step ahead and help you better.
          </p>
          <ul className="space-y-4">
            {categories.map((category) => (
              <li
                key={category.name}
                className={`cursor-pointer ${
                  activeCategory.name === category.name
                    ? "font-bold text-black"
                    : "text-gray-600"
                }`}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIndex(null);
                }}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-3/4 p-6">
          <h3 className="text-xl font-semibold mb-4">{activeCategory.name}</h3>
          <div className="space-y-4">
            {activeCategory.faqs.map((question, index) => (
              <div
                key={index}
                className="border-b border-gray-200 cursor-pointer"
              >
                <div
                  className="flex justify-between items-center py-3 text-gray-800 hover:text-black"
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{question}</span>
                  <span>{openIndex === index ? "▲" : "▼"}</span>
                </div>
                {openIndex === index && (
                  <div className="py-2 text-sm text-gray-600 ">
                   <strong>{question}</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
