import { useEffect } from 'react';

/**
 * Custom hook to manage document meta tags for SEO
 * Compatible with React 19
 */
export const useSEO = ({
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    canonicalUrl,
    structuredData
}) => {
    useEffect(() => {
        // Update document title
        if (title) {
            document.title = title;
        }

        // Update or create meta tags
        const updateMetaTag = (selector, attribute, value) => {
            if (!value) return;

            let element = document.querySelector(selector);
            if (!element) {
                element = document.createElement('meta');
                if (selector.includes('property=')) {
                    const prop = selector.match(/property="([^"]+)"/)[1];
                    element.setAttribute('property', prop);
                } else if (selector.includes('name=')) {
                    const name = selector.match(/name="([^"]+)"/)[1];
                    element.setAttribute('name', name);
                }
                document.head.appendChild(element);
            }
            element.setAttribute(attribute, value);
        };

        // Update basic meta tags
        updateMetaTag('meta[name="title"]', 'content', title);
        updateMetaTag('meta[name="description"]', 'content', description);
        updateMetaTag('meta[name="keywords"]', 'content', keywords);

        // Update Open Graph tags
        updateMetaTag('meta[property="og:title"]', 'content', ogTitle || title);
        updateMetaTag('meta[property="og:description"]', 'content', ogDescription || description);
        updateMetaTag('meta[property="og:image"]', 'content', ogImage);
        updateMetaTag('meta[property="og:url"]', 'content', canonicalUrl);

        // Update Twitter tags
        updateMetaTag('meta[property="twitter:title"]', 'content', ogTitle || title);
        updateMetaTag('meta[property="twitter:description"]', 'content', ogDescription || description);
        updateMetaTag('meta[property="twitter:image"]', 'content', ogImage);
        updateMetaTag('meta[property="twitter:url"]', 'content', canonicalUrl);

        // Update canonical URL
        if (canonicalUrl) {
            let link = document.querySelector('link[rel="canonical"]');
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', 'canonical');
                document.head.appendChild(link);
            }
            link.setAttribute('href', canonicalUrl);
        }

        // Add structured data
        if (structuredData) {
            let script = document.querySelector('#structured-data');
            if (!script) {
                script = document.createElement('script');
                script.id = 'structured-data';
                script.type = 'application/ld+json';
                document.head.appendChild(script);
            }
            script.textContent = JSON.stringify(structuredData);
        }

        // Cleanup function
        return () => {
            // Optionally remove the structured data script when component unmounts
            if (structuredData) {
                const script = document.querySelector('#structured-data');
                if (script) {
                    script.remove();
                }
            }
        };
    }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonicalUrl, structuredData]);
};

/**
 * SEO component wrapper
 */
export const SEO = ({
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage = 'https://digitalcore.co.in/logo.png',
    canonicalUrl,
    structuredData
}) => {
    useSEO({
        title,
        description,
        keywords,
        ogTitle,
        ogDescription,
        ogImage,
        canonicalUrl,
        structuredData
    });

    return null;
};

export default useSEO;
