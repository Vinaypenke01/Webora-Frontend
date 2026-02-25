// SEO Keywords Configuration for DigitalCore
// Centralized keyword management for consistency across pages

export const seoKeywords = {
    // Primary Keywords (High Priority)
    primary: [
        'digital marketing agency India',
        'web development company India',
        'best SEO services India',
        'mobile app development India',
        'e-commerce development India',
    ],

    // Secondary Keywords
    secondary: [
        'digital agency India',
        'React development services',
        'Node.js development India',
        'UI/UX design India',
        'cloud solutions India',
        'custom software development India',
        'professional web design India',
        'digital marketing services',
    ],

    // Long-tail Keywords (Lower competition, higher intent)
    longTail: [
        'best digital marketing agency India 2026',
        'affordable web development company India',
        'custom e-commerce website development India',
        'professional SEO services for small business India',
        'mobile app development company in India',
        'React web development services India',
        'enterprise web solutions India',
    ],

    // Location-based Keywords
    location: [
        'web development services India',
        'digital marketing agency near me',
        'SEO company India',
        'app development company India',
    ],

    // Service-specific Keywords
    services: {
        webDevelopment: [
            'custom web development India',
            'responsive website design',
            'React website development',
            'full-stack development services',
        ],
        mobileApp: [
            'iOS app development India',
            'Android app development India',
            'cross-platform app development',
            'React Native development',
        ],
        ecommerce: [
            'Shopify development India',
            'WooCommerce development',
            'custom e-commerce solutions',
            'online store development',
        ],
        digitalMarketing: [
            'SEO optimization services',
            'social media marketing India',
            'Google Ads management',
            'content marketing services',
        ],
        uiux: [
            'UI/UX design services India',
            'user experience design',
            'mobile app design',
            'website redesign services',
        ],
    },

    // Intent-based Keywords
    intent: {
        transactional: [
            'hire web developer India',
            'get quote web development',
            'custom website cost India',
            'affordable SEO packages',
        ],
        informational: [
            'how to build a website',
            'web development process',
            'SEO best practices',
            'mobile app development guide',
        ],
        navigational: [
            'DigitalCore',
            'DigitalCore India',
            'DigitalCore web development',
            'digitalcore services',
            'DigitalCore professional services',
        ],
    },

    // Combine keywords for specific pages
    getHomePageKeywords() {
        return [
            ...this.primary,
            ...this.secondary.slice(0, 5),
            ...this.longTail.slice(0, 3),
        ].join(', ');
    },

    getServicesPageKeywords() {
        return [
            ...this.primary,
            ...Object.values(this.services).flat().slice(0, 10),
        ].join(', ');
    },

    getContactPageKeywords() {
        return [
            ...this.location,
            ...this.intent.transactional.slice(0, 3),
        ].join(', ');
    },

    getAboutPageKeywords() {
        return [
            'about DigitalCore',
            'digital agency team India',
            'web development company India',
            'best digital marketing agency',
        ].join(', ');
    },
};

// Helper function to generate meta keywords string
export const generateKeywords = (keywords) => {
    if (Array.isArray(keywords)) {
        return keywords.join(', ');
    }
    return keywords;
};
