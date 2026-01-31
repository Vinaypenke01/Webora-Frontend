import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { generateFAQSchema } from '../utils/schema-generator';

/**
 * FAQ Component with Schema Markup
 * Displays frequently asked questions with collapsible answers
 * Includes FAQPage structured data for rich snippets
 */
const FAQ = ({ faqs, title = "Frequently Asked Questions", className = "" }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Generate FAQ schema for SEO
    const faqSchema = generateFAQSchema(faqs);

    return (
        <div className={`faq-section ${className}`}>
            {/* Inject FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {title && (
                <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
            )}

            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                            aria-expanded={openIndex === index}
                            aria-controls={`faq-answer-${index}`}
                        >
                            <h3 className="text-lg font-semibold text-gray-900 flex-1">
                                {faq.question}
                            </h3>
                            <span className="text-primary flex-shrink-0">
                                {openIndex === index ? (
                                    <FaChevronUp className="text-xl" />
                                ) : (
                                    <FaChevronDown className="text-xl" />
                                )}
                            </span>
                        </button>

                        <div
                            id={`faq-answer-${index}`}
                            className={`px-6 transition-all duration-300 ease-in-out ${openIndex === index
                                    ? 'max-h-96 py-4 opacity-100'
                                    : 'max-h-0 py-0 opacity-0 overflow-hidden'
                                }`}
                        >
                            <div className="text-gray-700 leading-relaxed border-t border-gray-200 pt-4">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
