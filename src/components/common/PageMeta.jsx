import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const siteUrl = 'https://qubriant.com';
const defaultKeywords = 'software development company Sri Lanka, custom software development, AI development, web application development, mobile app development, SaaS development, enterprise software, cloud DevOps, UI UX design, ecommerce development, API integration, digital transformation';

const pageMeta = {
  '/': {
    title: 'Qubriant Technologies | Custom Software, AI & Digital Solutions',
    description: 'Qubriant Technologies is a Sri Lankan software company delivering custom software, AI automation, web and mobile apps, SaaS, cloud, DevOps and digital transformation worldwide.',
    keywords: defaultKeywords
  },
  '/about': {
    title: 'About Qubriant Technologies',
    description: 'Learn about Qubriant’s mission, values, leadership, and technology philosophy for building modern digital products.',
    keywords: 'software company, technology company, digital innovation, software engineering, AI development'
  },
  '/services': {
    title: 'Services | Qubriant Technologies',
    description: 'Explore Qubriant’s custom software, AI, web, mobile, cloud, and support services designed for growth and efficiency.',
    keywords: 'custom software development, AI solutions, web development services, mobile app development, cloud services'
  },
  '/solutions': {
    title: 'Solutions | Qubriant Technologies',
    description: 'Discover AI assistants, automation systems, e-commerce platforms, CRM solutions, and modern software experiences from Qubriant.',
    keywords: 'AI automation, CRM solutions, e-commerce development, business software solutions, digital transformation'
  },
  '/portfolio': {
    title: 'Portfolio | Qubriant Technologies',
    description: 'Review sample projects and product work from Qubriant Technologies across AI, web, mobile, and enterprise platforms.',
    keywords: 'software portfolio, AI projects, web app projects, mobile app case studies, product development work'
  },
  '/industries': {
    title: 'Industries | Qubriant Technologies',
    description: 'Discover how Qubriant creates digital products for healthcare, education, tourism, finance, startups, and growing businesses.',
    keywords: 'industry software solutions, healthcare software, education technology, tourism platforms, fintech solutions'
  },
  '/technologies': {
    title: 'Technologies | Qubriant Technologies',
    description: 'See the modern technology stack used by Qubriant to build premium software products, AI systems, and scalable platforms.',
    keywords: 'React, Next.js, Node.js, Python, AWS, AI tools, modern software stack'
  },
  '/careers': {
    title: 'Careers | Qubriant Technologies',
    description: 'Explore software engineering roles and internship opportunities at Qubriant Technologies.',
    keywords: 'software jobs, frontend developer jobs, backend developer jobs, AI engineer internship, remote tech jobs'
  },
  '/insights': {
    title: 'Insights | Qubriant Technologies',
    description: 'Read insights on AI, product design, software engineering, and digital transformation from the Qubriant team.',
    keywords: 'AI insights, software engineering blog, product design insights, digital transformation trends'
  },
  '/contact': {
    title: 'Contact Qubriant Technologies',
    description: 'Get in touch with Qubriant Technologies to discuss your next digital project, product vision, or software need.',
    keywords: 'contact software company, AI development consultation, custom software quote, web development contact'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Qubriant Technologies',
    description: 'Review Qubriant’s privacy policy and how data is handled on the website.',
    keywords: 'privacy policy, website privacy, data handling policy'
  },
  '/terms': {
    title: 'Terms and Conditions | Qubriant Technologies',
    description: 'Review the website terms and conditions for using Qubriant Technologies services and content.',
    keywords: 'website terms, service terms, conditions of use'
  }
};

function PageMeta() {
  const location = useLocation();
  const meta = pageMeta[location.pathname] || pageMeta['/'];

  useEffect(() => {
    const canonicalUrl = `${siteUrl}${location.pathname === '/' ? '/' : location.pathname}`;

    document.title = meta.title;

    const setMetaContent = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute('content', value);
      }
    };

    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('meta[name="keywords"]', meta.keywords || defaultKeywords);
    setMetaContent('meta[name="robots"]', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setMetaContent('meta[property="og:title"]', meta.title);
    setMetaContent('meta[property="og:description"]', meta.description);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    setMetaContent('meta[name="twitter:title"]', meta.title);
    setMetaContent('meta[name="twitter:description"]', meta.description);

    const canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', canonicalUrl);
    }

    const existingSchema = document.getElementById('qubriant-schema');
    if (existingSchema) {
      existingSchema.remove();
    }

    const schemaScript = document.createElement('script');
    schemaScript.id = 'qubriant-schema';
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
          name: 'Qubriant Technologies',
          url: siteUrl,
          logo: `${siteUrl}/logo.png`,
          description: 'Qubriant Technologies builds custom software, AI solutions, and digital platforms for global businesses.',
          email: 'info@qubriant.com',
          telephone: '+94 72 261 6616',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Colombo',
            addressCountry: 'LK'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+94 72 261 6616',
            contactType: 'sales',
            email: 'info@qubriant.com',
            availableLanguage: ['English', 'Sinhala']
          },
          sameAs: []
        },
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: siteUrl,
          name: 'Qubriant Technologies',
          description: 'Software development, AI solutions, and digital transformation services for modern businesses.',
          publisher: {
            '@id': `${siteUrl}/#organization`
          }
        },
        {
          '@type': 'ProfessionalService',
          name: 'Qubriant Technologies',
          url: siteUrl,
          email: 'info@qubriant.com',
          telephone: '+94 72 261 6616',
          areaServed: 'Worldwide',
          serviceType: ['Custom Software Development', 'Artificial Intelligence Development', 'Web Application Development', 'Mobile App Development', 'SaaS Development', 'Cloud and DevOps', 'UI/UX Design', 'API Integration']
        }
      ]
    });
    document.head.appendChild(schemaScript);
  }, [location.pathname, meta]);

  return null;
}

export default PageMeta;
