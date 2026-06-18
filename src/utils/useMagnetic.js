import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useMagnetic = (strength = 0.45, range = 140) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || window.innerWidth < 1024) return;

    let isMagnetic = false;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < range) {
        isMagnetic = true;
        // Stronger, kinetic pull based on cursor coordinates
        const targetX = distanceX * strength;
        const targetY = distanceY * strength;
        
        gsap.to(element, {
          x: targetX,
          y: targetY,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else if (isMagnetic) {
        // Reset state and bounce back once when cursor exits magnetic pull radius
        isMagnetic = false;
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1.1, 0.4)',
          overwrite: 'auto'
        });
      }
    };

    const handleMouseLeave = () => {
      isMagnetic = false;
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1.1, 0.4)',
        overwrite: 'auto'
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (element) {
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [strength, range]);

  return elementRef;
};
