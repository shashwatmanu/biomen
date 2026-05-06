import React from 'react';
import { Environment, Sparkles, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing';

export function Scene({ children }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#a0b8a9" />
      <spotLight position={[0, 10, 0]} intensity={2} angle={0.3} penumbra={1} castShadow />

      {/* Studio environment for premium reflections on metallic parts */}
      <Environment preset="studio" />

      {/* Floating particles for depth and mood */}
      <Sparkles
        count={250}
        scale={20}
        size={2}
        speed={0.5}
        opacity={0.4}
        color="#ffffff"
      />

      {/* The product model group will be animated via GSAP in App.jsx */}
      {children}

      {/* Post-Processing Pipeline */}
      <EffectComposer disableNormalPass>
        <Bloom
          luminanceThreshold={1.2}
          mipmapBlur
          intensity={0.5}
          radius={0.4}
        />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        <SMAA />
      </EffectComposer>
    </>
  );
}

