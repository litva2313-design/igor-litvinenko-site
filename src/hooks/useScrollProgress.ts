import { useEffect, useRef } from 'react';

export function useScrollProgress() {
  const ref = useRef(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      ref.current = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return ref.current;
}