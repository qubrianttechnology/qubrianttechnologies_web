import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CARD_SELECTOR = 'main article, main div, main section';
const SECTION_SELECTOR = 'main > section, main > section > div:first-child';

function isCard(element) {
  const classes = element.className;
  if (typeof classes !== 'string') return false;

  const hasCardShape = classes.includes('rounded-2xl') || classes.includes('rounded-[24px]') ||
    classes.includes('rounded-[28px]') || classes.includes('rounded-[32px]') ||
    classes.includes('rounded-[36px]');
  const hasCardSurface = classes.includes('border') &&
    (classes.includes('bg-') || classes.includes('backdrop-blur'));

  return hasCardShape && hasCardSurface && !classes.includes('rounded-full');
}

function CardAnimations() {
  const location = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const cards = [...document.querySelectorAll(CARD_SELECTOR)].filter(isCard);
      const sections = [...document.querySelectorAll(SECTION_SELECTOR)].filter(
        (element) => !isCard(element) && !element.closest('.site-cta'),
      );
      const animatedElements = [...new Set([...sections, ...cards])];

      cards.forEach((card, index) => {
        card.classList.add('card-reveal');
        card.style.setProperty('--card-delay', `${Math.min(index % 6, 5) * 70}ms`);
      });

      sections.forEach((section, index) => {
        section.classList.add('section-reveal');
        section.style.setProperty('--section-delay', `${Math.min(index, 3) * 60}ms`);
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -28px' },
      );

      animatedElements.forEach((element) => observer.observe(element));
      window.__qubriantCardObserver = observer;
    });

    return () => {
      cancelAnimationFrame(frame);
      window.__qubriantCardObserver?.disconnect();
    };
  }, [location.pathname]);

  return null;
}

export default CardAnimations;
