import React, { useState } from 'react';

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState("FAQ");
  const [expandedQuestions, setExpandedQuestions] = useState({});
  
  const toggleQuestion = (category, index) => {
    const key = `${category}-${index}`;
    setExpandedQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const faqData = {
    GENERAL: [
      {
        question: "Are these minifigures official LEGO minifigures?",
        answer: "No, these minifigures are NOT official minifigures."
      },
      {
        question: "How quick is the delivery?",
        answer: "We ship products within 24 hours of purchase. Your package will typically be with you within 7 working days. If there are holidays, please be aware that this may increase delivery times."
      }
    ],
    SHIPPING: [
      {
        question: "Do you ship internationally?",
        answer: "No. We currently only ship within the UK. However, we are planning to expand our shipping locations in the future."
      },
      {
        question: "How can I track my order?",
        answer: "Once your order ships, you'll receive a confirmation email with a tracking number and instructions on how to monitor your delivery."
      }
    ],
    RETURNS: [
      {
        question: "What is your return policy?",
        answer: "We accept returns within 30 days of delivery. Items must be in original condition and packaging."
      },
      {
        question: "How do I request a return?",
        answer: "To initiate a return, please contact our customer service team through the Contact page or email returns@minifigstore.example.com with your order number."
      }
    ]
  };
  
  return (
    <div className="mx-auto px-4 py-8">
      {activeTab === "FAQ" && (
        <div className="bg-white rounded-lg p-6">
          
          {Object.entries(faqData).map(([category, questions]) => (
            <div key={category} className="mb-8">
              <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-4">{category}</p>
              
              {questions.map((item, index) => (
                <div 
                  key={index} 
                  className="border-b border-gray-200 w-full py-4 transition-all duration-200 hover:bg-gray-50"
                >
                  <button 
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => toggleQuestion(category, index)}
                  >
                    <p className="font-bold text-gray-800">{item.question}</p>
                    <svg 
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${expandedQuestions[`${category}-${index}`] ? 'transform rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${expandedQuestions[`${category}-${index}`] ? 'max-h-40 mt-3' : 'max-h-0'}`}>
                    <p className="text-sm text-gray-700">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-3">Can't find what you're looking for?</p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer">
              Contact Support
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQSection;