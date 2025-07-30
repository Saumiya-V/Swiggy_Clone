import type { Category } from "@/types";
import { categories } from "@/utils/helpCategories";
import { useState } from "react";


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
