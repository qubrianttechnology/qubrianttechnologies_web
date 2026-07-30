import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { servicePages } from '../../data/servicePages';
import { serviceContent } from '../../data/serviceContent';

const siteUrl = 'https://qubriant.com';
const defaultKeywords = 'software development company Sri Lanka, custom software development, AI development, web application development, mobile app development, SaaS development, enterprise software';

const pageMeta = {
  '/': ['Qubriant Technologies | Custom Software, AI & Digital Solutions', 'Qubriant Technologies delivers custom software, AI automation, web and mobile apps, SaaS, cloud, and digital transformation worldwide.'],
  '/about': ['About Qubriant Technologies', 'Learn about Qubriant’s mission, values, leadership, and technology philosophy for building modern digital products.'],
  '/services': ['Software Development Services | Qubriant Technologies', 'Explore custom software, AI, web, mobile, cloud, and support services designed for business growth and operational efficiency.'],
  '/solutions': ['Business Technology Solutions | Qubriant Technologies', 'Discover AI assistants, automation systems, e-commerce platforms, and modern business software solutions from Qubriant.'],
  '/portfolio': ['Software Development Portfolio | Qubriant Technologies', 'Review product work from Qubriant Technologies across AI, web, mobile, and enterprise platforms.'],
  '/industries': ['Industry Software Solutions | Qubriant Technologies', 'Discover digital products for healthcare, education, tourism, finance, startups, and growing businesses.'],
  '/technologies': ['Our Technology Stack | Qubriant Technologies', 'See the modern technologies Qubriant uses to build software products, AI systems, and scalable platforms.'],
  '/careers': ['Careers | Qubriant Technologies', 'Explore software engineering roles and internship opportunities at Qubriant Technologies.'],
  '/insights': ['Technology Insights | Qubriant Technologies', 'Read insights on AI, product design, software engineering, and digital transformation from Qubriant.'],
  '/contact': ['Contact Qubriant Technologies', 'Contact Qubriant Technologies to discuss your next digital product, software project, or AI solution.'],
  '/privacy-policy': ['Privacy Policy | Qubriant Technologies', 'Review Qubriant’s privacy policy and how data is handled on this website.'],
  '/terms': ['Terms and Conditions | Qubriant Technologies', 'Review the terms and conditions for using Qubriant Technologies services and website.']
};

const setMeta = (selector, value) => {
  document.querySelector(selector)?.setAttribute('content', value);
};

function PageMeta() {
  const location = useLocation();
  const slug = location.pathname.startsWith('/services/') ? location.pathname.split('/')[2] : null;
  const service = slug ? servicePages[slug] : null;
  const fallback = pageMeta[location.pathname] || pageMeta['/'];
  const title = service?.title || fallback[0];
  const description = service?.metaDescription || fallback[1];
  const keywords = service ? `${service.name}, ${service.name} company, ${service.name} services, software development company Sri Lanka` : defaultKeywords;

  useEffect(() => {
    const canonicalUrl = `${siteUrl}${location.pathname === '/' ? '/' : location.pathname}`;
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[name="keywords"]', keywords);
    setMeta('meta[name="robots"]', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);

    document.getElementById('qubriant-schema')?.remove();
    const graph = [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Qubriant Technologies',
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        email: 'info@qubriant.com',
        telephone: '+94 72 261 6616',
        address: { '@type': 'PostalAddress', addressLocality: 'Colombo', addressCountry: 'LK' }
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Qubriant Technologies',
        publisher: { '@id': `${siteUrl}/#organization` }
      }
    ];

    if (service) {
      const content = serviceContent[slug];
      graph.push(
        {
          '@type': 'Service',
          '@id': `${canonicalUrl}#service`,
          name: service.name,
          description,
          url: canonicalUrl,
          provider: { '@id': `${siteUrl}/#organization` },
          areaServed: 'Worldwide',
          serviceType: service.name
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` },
            { '@type': 'ListItem', position: 3, name: service.name, item: canonicalUrl }
          ]
        },
        {
          '@type': 'FAQPage',
          mainEntity: content.faqs.map(([question, answer]) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: answer }
          }))
        }
      );
    }

    const schema = document.createElement('script');
    schema.id = 'qubriant-schema';
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    document.head.appendChild(schema);
    return () => schema.remove();
  }, [location.pathname, title, description, keywords, service]);

  return null;
}

export default PageMeta;
