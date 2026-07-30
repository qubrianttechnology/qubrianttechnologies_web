import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CARD_SELECTOR = 'main article, main div, main section';

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

      cards.forEach((card, index) => {
        card.classList.add('card-reveal');
        card.style.setProperty('--card-delay', `${Math.min(index % 6, 5) * 70}ms`);
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('card-reveal--visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -36px' },
      );

      cards.forEach((card) => observer.observe(card));
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
