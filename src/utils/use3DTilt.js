import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const use3DTilt = (maxRotation = 15, perspective = 1000, isCentered = false) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 1024) return; // Skip on mobile for optimization

    // Ensure styling properties for 3D rendering are set
    card.style.transformStyle = 'preserve-3d';

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normalizedX = (x / rect.width) - 0.5;
      const normalizedY = (y / rect.height) - 0.5;

      const rotateX = -normalizedY * maxRotation;
      const rotateY = normalizedX * maxRotation;

      const gsapParams = {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: perspective,
        ease: 'power2.out',
        duration: 0.3,
        overwrite: 'auto'
      };

      if (isCentered) {
        gsapParams.xPercent = -50;
        gsapParams.yPercent = -50;
      }

      gsap.to(card, gsapParams);
    };

    const handleMouseLeave = () => {
      const gsapParams = {
        rotateX: 0,
        rotateY: 0,
        ease: 'power2.out',
        duration: 0.5,
        overwrite: 'auto'
      };

      if (isCentered) {
        gsapParams.xPercent = -50;
        gsapParams.yPercent = -50;
      }

      gsap.to(card, gsapParams);
    };

    card.addEventListener('mousemove', handleMouseMove, { passive: true });
    card.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [maxRotation, perspective]);

  return cardRef;
};
