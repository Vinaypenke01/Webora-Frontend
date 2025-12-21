// Form validation utilities

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePhone = (phone) => {
    const re = /^[\d\s\-\+\(\)]+$/;
    return phone.length >= 10 && re.test(phone);
};

export const validateRequired = (value) => {
    return value && value.trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
    return value && value.trim().length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
    return value && value.trim().length <= maxLength;
};

export const validateURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const validateContactForm = (formData) => {
    const errors = {};

    if (!validateRequired(formData.name)) {
        errors.name = 'Name is required';
    }

    if (!validateRequired(formData.email)) {
        errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
        errors.email = 'Invalid email format';
    }

    if (!validateRequired(formData.subject)) {
        errors.subject = 'Subject is required';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
        errors.phone = 'Invalid phone number';
    }

    if (!validateRequired(formData.message)) {
        errors.message = 'Message is required';
    } else if (!validateMinLength(formData.message, 10)) {
        errors.message = 'Message must be at least 10 characters';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const validateProjectForm = (formData) => {
    const errors = {};

    if (!validateRequired(formData.title)) {
        errors.title = 'Title is required';
    }

    if (!validateRequired(formData.category)) {
        errors.category = 'Category is required';
    }

    if (!validateRequired(formData.description)) {
        errors.description = 'Description is required';
    }

    if (formData.liveLink && !validateURL(formData.liveLink)) {
        errors.liveLink = 'Invalid URL format';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const validateBlogForm = (formData) => {
    const errors = {};

    if (!validateRequired(formData.title)) {
        errors.title = 'Title is required';
    }

    if (!validateRequired(formData.slug)) {
        errors.slug = 'Slug is required';
    }

    if (!validateRequired(formData.excerpt)) {
        errors.excerpt = 'Excerpt is required';
    }

    if (!validateRequired(formData.content)) {
        errors.content = 'Content is required';
    }

    if (!validateRequired(formData.category)) {
        errors.category = 'Category is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
