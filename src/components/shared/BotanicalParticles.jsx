import React, { useEffect, useRef } from 'react';

const BotanicalParticles = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Scale count: 18 on mobile to save GPU cycles and battery, 35 on desktop
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 18 : 35;

    // Colors: Botanical greens and premium champagne gold
    const colors = [
      'rgba(22, 199, 132, ', // Biomen Green
      'rgba(191, 164, 106, ', // Champagne Gold
      'rgba(127, 231, 179, '  // Accent Mint
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25, // Slower, calmer movement
        vy: -0.1 - Math.random() * 0.25, // Extremely slow drift
        size: 1.2 + Math.random() * 2.2, // Balanced size (1.2px to 3.4px) for optimized resolution
        alpha: Math.random() * 0.10 + 0.04,
        baseAlpha: Math.random() * 0.08 + 0.04, // Calibrated opacity (4% to 14%)
        color: colors[Math.floor(Math.random() * colors.length)],
        fadeSpeed: 0.001 + Math.random() * 0.002,
        fadeDirection: Math.random() > 0.5 ? 1 : -1
      });
    }

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const scrollY = window.scrollY || 0;

      particles.forEach((p) => {
        // Core drift movement
        p.x += p.vx;
        p.y += p.vy;

        // Reset particles that float off the top screen boundary
        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        // Organic opacity pulsing
        p.alpha += p.fadeSpeed * p.fadeDirection;
        if (p.alpha > p.baseAlpha * 1.5) {
          p.fadeDirection = -1;
        } else if (p.alpha < p.baseAlpha * 0.5) {
          p.fadeDirection = 1;
        }

        // Mouse repelling physics
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const limit = 160; // Influence circle radius

          if (dist < limit) {
            const force = (limit - dist) / limit;
            const angle = Math.atan2(dy, dx);
            // Push particles away
            p.x += Math.cos(angle) * force * 1.8;
            p.y += Math.sin(angle) * force * 1.8;
          }
        }

        // Apply scroll-parallax offset (move particles up slower than page scroll rate)
        let renderY = p.y - (scrollY * 0.28);
        
        // Symmetrical modulo wrap-around to keep render coordinates strictly within the canvas bounds
        renderY = ((renderY % canvas.height) + canvas.height) % canvas.height;

        // Render particle
        ctx.beginPath();
        ctx.arc(p.x, renderY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha.toFixed(3)})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[5]"
    />
  );
};

export default BotanicalParticles;
