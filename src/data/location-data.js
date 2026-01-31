// Location and Business Information
// Centralized NAP (Name, Address, Phone) data for SEO consistency

export const businessInfo = {
    // Basic Information
    name: "DigitalCore",
    legalName: "DigitalCore Solutions",
    slogan: "Building Your Digital Presence",

    // Contact Information
    phone: "+91-XXXXXXXXXX", // TODO: Add real phone number
    email: "info@digitalcore.co.in",
    salesEmail: "sales@digitalcore.co.in",
    supportEmail: "support@digitalcore.co.in",

    // Address (Update with actual address)
    address: {
        streetAddress: "", // TODO: Add street address
        city: "", // TODO: Add city
        state: "", // TODO: Add state
        postalCode: "", // TODO: Add postal code
        country: "India",
        countryCode: "IN",
    },

    // Geographic Coordinates (Center of India - update with actual location)
    geo: {
        latitude: "20.5937",
        longitude: "78.9629",
    },

    // Service Areas
    serviceAreas: [
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Hyderabad",
        "Chennai",
        "Kolkata",
        "Pune",
        "Ahmedabad",
        "All India",
    ],

    // Operating Hours
    hours: {
        weekdays: {
            open: "09:00",
            close: "18:00",
        },
        saturday: {
            open: "10:00",
            close: "14:00",
        },
        sunday: "Closed",
    },

    // Opening Hours in Schema.org format
    openingHours: [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00",
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "10:00",
            "closes": "14:00",
        },
    ],

    // Social Media
    social: {
        linkedin: "https://www.linkedin.com/company/digitalcore",
        twitter: "https://twitter.com/digitalcore",
        facebook: "https://www.facebook.com/digitalcore",
        instagram: "https://www.instagram.com/digitalcore",
    },

    // Website
    website: "https://digitalcore.co.in",

    // Price Range
    priceRange: "$$",

    // Languages Offered
    languages: ["English", "Hindi"],

    // Founded Year
    foundedYear: "2024",

    // Payment Methods
    paymentMethods: [
        "Credit Card",
        "Debit Card",
        "UPI",
        "Net Banking",
        "Cash",
    ],
};

/**
 * Get formatted address string for display
 * @returns {string} Formatted address
 */
export const getFormattedAddress = () => {
    const { address } = businessInfo;
    const parts = [
        address.streetAddress,
        address.city,
        address.state,
        address.postalCode,
        address.country,
    ].filter(Boolean);

    return parts.join(', ');
};

/**
 * Get complete NAP (Name, Address, Phone) for consistent display
 * @returns {Object} NAP information
 */
export const getNAP = () => {
    return {
        name: businessInfo.name,
        address: getFormattedAddress(),
        phone: businessInfo.phone,
    };
};
