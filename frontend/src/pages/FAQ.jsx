// src/pages/FAQ.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqItems = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping is available for delivery within 1-2 business days. International shipping may take 7-14 business days depending on the destination."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused items in their original packaging with tags attached. Sale items are final sale and cannot be returned. Return shipping is free for US customers."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order by logging into your account and viewing your order history."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location. Customs duties and taxes may apply depending on your country's regulations."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All payments are processed securely through encrypted connections."
    },
    {
      question: "How do I change or cancel my order?",
      answer: "Orders can be changed or cancelled within 1 hour of placement. Please contact our customer service team immediately at support@fashionfusion.com with your order number. After 1 hour, orders enter processing and cannot be changed."
    },
    {
      question: "What sizes do you offer?",
      answer: "We offer a wide range of sizes from XS to XXL for most items. Specific size charts are available on each product page. If you need assistance with sizing, our customer service team can help you find the perfect fit."
    },
    {
      question: "How do I care for my garments?",
      answer: "Care instructions are provided on the label of each garment. Generally, we recommend washing in cold water, tumble drying on low heat or air drying, and ironing on low heat if needed. Specific care instructions vary by fabric type."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
      <p className="text-gray-600 mb-8">Find answers to common questions about shopping with FashionFusion</p>
      
      <div className="max-w-3xl mx-auto">
        {faqItems.map((item, index) => (
          <div key={index} className="border-b border-gray-200 last:border-b-0">
            <button
              className="w-full py-6 text-left flex items-center justify-between focus:outline-none"
              onClick={() => toggleItem(index)}
            >
              <span className="text-lg font-medium">{item.question}</span>
              {openItems[index] ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </button>
            {openItems[index] && (
              <div className="pb-6">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-6">Our customer service team is here to help you with any questions or concerns.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:support@fashionfusion.com"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
          >
            Email Us
          </a>
          <a
            href="/contact"
            className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
          >
            Contact Form
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;