// Schema.org Structured Data Generator Utilities
// Provides helper functions to generate consistent schema markup

/**
 * Generate BreadcrumbList schema
 * @param {Array} breadcrumbs - Array of {name, url} objects
 * @returns {Object} BreadcrumbList schema
 */
export const generateBreadcrumbSchema = (breadcrumbs) => {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": crumb.url ? `https://digitalcore.co.in${crumb.url}` : undefined,
        })),
    };
};

/**
 * Generate FAQ schema
 * @param {Array} faqs - Array of {question, answer} objects
 * @returns {Object} FAQPage schema
 */
export const generateFAQSchema = (faqs) => {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
            },
        })),
    };
};

/**
 * Generate AggregateRating schema from reviews/testimonials
 * @param {Array} reviews - Array of review objects
 * @returns {Object} AggregateRating schema
 */
export const generateAggregateRatingSchema = (reviews) => {
    if (!reviews || reviews.length === 0) return null;

    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 5), 0);
    const averageRating = totalRating / reviews.length;

    return {
        "@type": "AggregateRating",
        "ratingValue": averageRating.toFixed(1),
        "reviewCount": reviews.length,
        "bestRating": "5",
        "worstRating": "1",
    };
};

/**
 * Generate Review schema
 * @param {Object} review - Single review object
 * @returns {Object} Review schema
 */
export const generateReviewSchema = (review) => {
    return {
        "@type": "Review",
        "author": {
            "@type": "Person",
            "name": review.name || review.author,
        },
        "datePublished": review.date || new Date().toISOString().split('T')[0],
        "reviewBody": review.content || review.text,
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": review.rating || 5,
            "bestRating": "5",
            "worstRating": "1",
        },
    };
};

/**
 * Generate Article schema for blog posts
 * @param {Object} article - Article data
 * @returns {Object} Article schema
 */
export const generateArticleSchema = (article) => {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.description || article.excerpt,
        "image": article.image ? `https://digitalcore.co.in${article.image}` : "https://digitalcore.co.in/logo.png",
        "author": {
            "@type": "Person",
            "name": article.author || "DigitalCore Team",
        },
        "publisher": {
            "@type": "Organization",
            "name": "DigitalCore",
            "logo": {
                "@type": "ImageObject",
                "url": "https://digitalcore.co.in/logo.png",
            },
        },
        "datePublished": article.publishedDate || new Date().toISOString(),
        "dateModified": article.modifiedDate || article.publishedDate || new Date().toISOString(),
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://digitalcore.co.in/blog/${article.id || article.slug}`,
        },
        "wordCount": article.wordCount,
        "keywords": article.keywords || article.tags?.join(', '),
    };
};

/**
 * Generate LocalBusiness schema
 * @param {Object} businessInfo - Business information
 * @returns {Object} LocalBusiness schema
 */
export const generateLocalBusinessSchema = (businessInfo = {}) => {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "DigitalCore",
        "image": "https://digitalcore.co.in/logo.png",
        "url": "https://digitalcore.co.in",
        "telephone": businessInfo.phone || "+91-XXXXXXXXXX",
        "email": "info@digitalcore.co.in",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": businessInfo.streetAddress || "",
            "addressLocality": businessInfo.city || "",
            "addressRegion": businessInfo.state || "India",
            "postalCode": businessInfo.postalCode || "",
            "addressCountry": "IN",
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": businessInfo.latitude || "20.5937",
            "longitude": businessInfo.longitude || "78.9629",
        },
        "openingHoursSpecification": businessInfo.hours || [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00",
            },
        ],
        "priceRange": "$$",
    };
};

/**
 * Generate Service schema
 * @param {Object} service - Service data
 * @returns {Object} Service schema
 */
export const generateServiceSchema = (service) => {
    return {
        "@type": "Service",
        "name": service.title || service.name,
        "description": service.description || service.shortDescription,
        "provider": {
            "@type": "Organization",
            "name": "DigitalCore",
        },
        "areaServed": {
            "@type": "Country",
            "name": "India",
        },
        "hasOfferCatalog": service.offers ? {
            "@type": "OfferCatalog",
            "name": service.title,
            "itemListElement": service.offers.map(offer => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": offer.name,
                },
            })),
        } : undefined,
    };
};

/**
 * Generate Person schema for team members
 * @param {Object} person - Person data
 * @returns {Object} Person schema
 */
export const generatePersonSchema = (person) => {
    return {
        "@type": "Person",
        "name": person.name,
        "jobTitle": person.role || person.position,
        "image": person.image ? `https://digitalcore.co.in${person.image}` : undefined,
        "description": person.bio || person.description,
        "worksFor": {
            "@type": "Organization",
            "name": "DigitalCore",
        },
    };
};
