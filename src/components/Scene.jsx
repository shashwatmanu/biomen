import { Environment, Float, useTexture, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing';

export function Scene({ children }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
      <spotLight position={[0, 10, 0]} intensity={2} angle={0.3} penumbra={1} castShadow />

      {/* Forest environment for natural reflections */}
      <Environment preset="forest" />

      {/* The product model group will be animated via GSAP in App.jsx */}
      {children}

      <ContactShadows 
        position={[2.5, -2.5, 0]} 
        opacity={0.8} 
        scale={10} 
        blur={1.5} 
        far={4} 
        color="#0a1a0a" 
      />

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

