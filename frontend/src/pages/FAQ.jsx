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
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all items. Items must be unworn, unwashed, and with original tags attached. Sale items are final sale and cannot be returned. To initiate a return, please visit your order history and follow the return process."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days within the US. Express shipping is available for 1-2 business days for an additional fee. International shipping typically takes 7-14 business days depending on the destination. You'll receive a tracking number once your order ships."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location. Customs duties and taxes may apply depending on your country's regulations and are the responsibility of the recipient."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order by logging into your account and visiting the 'Orders' section. Click on your order number to view tracking information and delivery status."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All payments are processed securely through encrypted connections. We do not store your payment information on our servers."
    },
    {
      question: "How do I care for my clothes?",
      answer: "Each product comes with specific care instructions on the label. Generally, we recommend washing similar colors together, using cold water, and air drying when possible to maintain the quality of your garments. For delicate items, hand washing or dry cleaning is recommended."
    },
    {
      question: "Do you offer student discounts?",
      answer: "Yes, we offer a 15% student discount for verified students. Simply sign up with your student email address or verify through our student discount program partner. The discount applies to full-price items and cannot be combined with other promotions."
    },
    {
      question: "How do I change or cancel my order?",
      answer: "Orders can be changed or cancelled within 1 hour of placement. Please contact our customer service team immediately if you need to modify your order. After 1 hour, orders enter our processing system and cannot be changed. If you need to return an item, please refer to our return policy."
    },
    {
      question: "What sizes do you offer?",
      answer: "We offer a wide range of sizes from XS to XXL for most items. Each product page includes detailed size charts with measurements to help you find the perfect fit. If you're between sizes, we recommend sizing up for a more comfortable fit."
    },
    {
      question: "How can I contact customer service?",
      answer: "You can reach our customer service team by email at support@fashionfusion.com, by phone at +1 (555) 123-4567 during business hours, or through the contact form on our website. We typically respond to all inquiries within 24 hours."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-medium">{item.question}</h3>
                {openItems[index] ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>
              
              {openItems[index] && (
                <div className="p-6 bg-gray-50 border-t">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Please contact our friendly team.
          </p>
          <a
            href="/contact"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors inline-block"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;