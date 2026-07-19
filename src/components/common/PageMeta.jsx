import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pageMeta = {
  '/': {
    title: 'Qubriant Technologies | Software, AI and Digital Solutions',
    description: 'Qubriant Technologies develops custom software, AI-powered solutions, web applications, mobile apps, and scalable digital platforms for modern businesses.'
  },
  '/about': {
    title: 'About Qubriant Technologies',
    description: 'Learn about Qubriant’s mission, values, leadership, and technology philosophy.'
  },
  '/services': {
    title: 'Services | Qubriant Technologies',
    description: 'Explore Qubriant’s custom software, AI, web, mobile, cloud, and support services.'
  },
  '/solutions': {
    title: 'Solutions | Qubriant Technologies',
    description: 'Discover solution categories such as AI assistants, automation, e-commerce, and CRM platforms.'
  },
  '/portfolio': {
    title: 'Portfolio | Qubriant Technologies',
    description: 'Review sample projects and product work from Qubriant Technologies.'
  },
  '/industries': {
    title: 'Industries | Qubriant Technologies',
    description: 'Discover how Qubriant creates digital products for healthcare, education, tourism, finance, and more.'
  },
  '/technologies': {
    title: 'Technologies | Qubriant Technologies',
    description: 'See the modern technology stack used by Qubriant to build premium software products.'
  },
  '/careers': {
    title: 'Careers | Qubriant Technologies',
    description: 'Explore placeholder roles and internship opportunities at Qubriant Technologies.'
  },
  '/insights': {
    title: 'Insights | Qubriant Technologies',
    description: 'Read insights on AI, product design, software engineering, and digital transformation.'
  },
  '/contact': {
    title: 'Contact Qubriant Technologies',
    description: 'Get in touch with Qubriant Technologies to discuss your next digital project.'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Qubriant Technologies',
    description: 'Review Qubriant’s privacy policy and how data is handled on the website.'
  },
  '/terms': {
    title: 'Terms and Conditions | Qubriant Technologies',
    description: 'Review the website terms and conditions for using Qubriant Technologies services and content.'
  }
};

function PageMeta() {
  const location = useLocation();
  const meta = pageMeta[location.pathname] || pageMeta['/'];

  useEffect(() => {
    document.title = meta.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', meta.description);
    }
  }, [meta]);

  return null;
}

export default PageMeta;
