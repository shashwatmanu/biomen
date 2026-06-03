import React, { useState, useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { Play, Pause, RotateCcw, Eye, EyeOff, Layers, Sliders, Sun, Shield, HelpCircle, Film, Minimize2, Maximize2 } from 'lucide-react';

// --- Closed Canister Model (Science Page style) ---
const ScienceProductModel = ({ rotationSpeed, isFloating, isSpinning, pitchFreq, rollFreq, ...props }) => {
  const textureTop = useTexture('/label_top.jpg');
  const textureBottom = useTexture('/label_bottom.jpg');

  textureTop.wrapS = textureTop.wrapT = THREE.RepeatWrapping;
  textureBottom.wrapS = textureBottom.wrapT = THREE.RepeatWrapping;
  textureTop.colorSpace = THREE.SRGBColorSpace;
  textureBottom.colorSpace = THREE.SRGBColorSpace;

  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      if (isFloating) {
        groupRef.current.position.y = Math.sin(t * 1.0) * 0.15;
        groupRef.current.rotation.x = Math.sin(t * pitchFreq) * 0.08 + 0.03;
        groupRef.current.rotation.z = Math.cos(t * rollFreq) * 0.04;
      } else {
        groupRef.current.position.y = 0;
        groupRef.current.rotation.x = 0;
        groupRef.current.rotation.z = 0;
      }

      if (isSpinning) {
        groupRef.current.rotation.y += rotationSpeed * 0.01;
      }
    }
  });

  const baseLabelMaterial = new THREE.MeshPhysicalMaterial({
    map: textureBottom,
    roughness: 0.22,
    metalness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 2.8
  });

  const lidLabelMaterial = new THREE.MeshPhysicalMaterial({
    map: textureTop,
    roughness: 0.22,
    metalness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 2.8
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group position={[0, 0.05, 0]}>
        <group position={[0, -1.95, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.75, 1.75, 0.9, 64]} />
            <primitive object={baseLabelMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0.44, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
            <circleGeometry args={[1.73, 64]} />
            <meshStandardMaterial color="#111111" roughness={0.9} />
          </mesh>
        </group>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.75, 1.75, 3.8, 64]} />
          <primitive object={lidLabelMaterial} attach="material" />
        </mesh>
      </group>
    </group>
  );
};

// --- Explodable / Interactive Product Model ---
const ExplodableProductModel = ({ 
  rotationSpeed, 
  isFloating, 
  isSpinning, 
  pitchFreq, 
  rollFreq, 
  animationState, // 'closed', 'split', 'pillOut', 'pillOpen'
  ...props 
}) => {
  const textureTop = useTexture('/label_top.jpg');
  const textureBottom = useTexture('/label_bottom.jpg');
  const tagTexture = useTexture('/tag_texture.png');

  textureTop.wrapS = textureTop.wrapT = THREE.RepeatWrapping;
  textureBottom.wrapS = textureBottom.wrapT = THREE.RepeatWrapping;
  textureTop.colorSpace = THREE.SRGBColorSpace;
  textureBottom.colorSpace = THREE.SRGBColorSpace;
  tagTexture.colorSpace = THREE.SRGBColorSpace;

  const groupRef = useRef();
  const lidRef = useRef();
  const baseRef = useRef();
  const jarGroupRef = useRef();
  const glassLidRef = useRef();
  const tagRef = useRef();
  const heroPillGroupRef = useRef();
  const heroPillTopRef = useRef();
  const heroPillBottomRef = useRef();
  const pillsRef1 = useRef();
  const pillsRef2 = useRef();

  // Instanced pills setup
  const pillCount = 300;
  const pillMatrices = useMemo(() => {
    const matrices = [];
    const dummy = new THREE.Object3D();
    const pillsPerLayer = 22;
    for (let i = 0; i < pillCount; i++) {
      const layer = Math.floor(i / pillsPerLayer);
      const indexInLayer = i % pillsPerLayer;
      const progress = layer / (pillCount / pillsPerLayer);
      const y = layer * 0.08 + 0.12;
      const radiusLimit = 1.0 - progress * 0.2;
      const angle = (indexInLayer / pillsPerLayer) * Math.PI * 2 + layer * 1.1;
      const r = (0.3 + Math.random() * 0.7) * radiusLimit;

      dummy.position.set(
        Math.cos(angle) * r,
        y + (Math.random() - 0.5) * 0.05,
        Math.sin(angle) * r
      );
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      dummy.scale.set(0.12, 0.12, 0.12);
      dummy.updateMatrix();
      matrices.push(dummy.matrix.clone());
    }
    return matrices;
  }, []);

  useEffect(() => {
    if (pillsRef1.current && pillsRef2.current) {
      pillMatrices.forEach((matrix, i) => {
        pillsRef1.current.setMatrixAt(i, matrix);
        pillsRef2.current.setMatrixAt(i, matrix);
      });
      pillsRef1.current.instanceMatrix.needsUpdate = true;
      pillsRef2.current.instanceMatrix.needsUpdate = true;
    }
  }, [pillMatrices]);

  // Handle manual trigger animations based on animationState
  useEffect(() => {
    const lid = lidRef.current;
    const base = baseRef.current;
    const jarGroup = jarGroupRef.current;
    const glassLid = glassLidRef.current;
    const heroPillGroup = heroPillGroupRef.current;
    const heroPillTop = heroPillTopRef.current;
    const heroPillBottom = heroPillBottomRef.current;

    if (!lid || !base || !jarGroup || !glassLid || !heroPillGroup) return;

    // Reset GSAP tweens
    gsap.killTweensOf([lid.position, lid.rotation, base.position, jarGroup.position, jarGroup.scale, jarGroup.rotation, glassLid.position, heroPillGroup.position, heroPillGroup.scale, heroPillGroup.rotation, heroPillTop.position, heroPillBottom.position]);

    if (animationState === 'closed') {
      // Assemble/Closed canister
      gsap.to(lid.position, { y: 0.3, duration: 1.0, ease: 'power2.out' });
      gsap.to(lid.rotation, { y: 0, duration: 1.0, ease: 'power2.out' });
      gsap.to(base.position, { y: -2.5, duration: 1.0, ease: 'power2.out' });
      
      gsap.to(jarGroup.scale, { x: 0, y: 0, z: 0, duration: 0.6, ease: 'power2.in' });
      gsap.to(jarGroup.position, { y: -1, z: 0, duration: 0.6, ease: 'power2.in' });
      
      gsap.to(glassLid.position, { y: 2.9, duration: 0.6, ease: 'power2.out' });
      gsap.to(heroPillGroup.scale, { x: 0, y: 0, z: 0, duration: 0.5 });
    } else if (animationState === 'split') {
      // Split canister, reveal jar
      gsap.to(lid.position, { y: 5.5, duration: 1.2, ease: 'back.out(1.2)' });
      gsap.to(lid.rotation, { y: Math.PI * 1.5, duration: 1.2, ease: 'power2.out' });
      gsap.to(base.position, { y: -3.8, duration: 1.2, ease: 'power2.out' });

      gsap.to(jarGroup.position, { y: -1.5, z: 0, duration: 1.2, ease: 'power2.out' });
      gsap.to(jarGroup.scale, { x: 1.8, y: 1.8, z: 1.8, duration: 1.2, ease: 'back.out(1.5)' });
      
      gsap.to(glassLid.position, { y: 2.9, duration: 0.6, ease: 'power2.out' });
      gsap.to(heroPillGroup.scale, { x: 0, y: 0, z: 0, duration: 0.5 });
    } else if (animationState === 'pillOut') {
      // Split canister, glass lid lifted, hero pill out
      gsap.to(lid.position, { y: 6.0, duration: 1.2, ease: 'power2.out' });
      gsap.to(base.position, { y: -4.0, duration: 1.2, ease: 'power2.out' });

      gsap.to(jarGroup.position, { y: -1.8, z: 0, duration: 1.2, ease: 'power2.out' });
      gsap.to(jarGroup.scale, { x: 1.8, y: 1.8, z: 1.8, duration: 1.2, ease: 'power2.out' });
      
      gsap.to(glassLid.position, { y: 4.5, duration: 0.8, ease: 'power2.out' });
      
      gsap.to(heroPillGroup.scale, { x: 1, y: 1, z: 1, duration: 0.8, ease: 'back.out(1.2)' });
      gsap.to(heroPillGroup.position, { y: 2.5, z: 2.5, x: 0, duration: 1.0, ease: 'power2.out' });
      gsap.to(heroPillGroup.rotation, { x: Math.PI * 0.5, y: Math.PI * 0.25, duration: 1.0 });

      gsap.to(heroPillTop.position, { y: 0.35, duration: 0.6, ease: 'power2.out' });
      gsap.to(heroPillBottom.position, { y: -0.35, duration: 0.6, ease: 'power2.out' });
    } else if (animationState === 'pillOpen') {
      // Split canister, pill split open showing ingredients
      gsap.to(lid.position, { y: 6.0, duration: 1.2 });
      gsap.to(base.position, { y: -4.0, duration: 1.2 });

      gsap.to(jarGroup.position, { y: -1.8, z: 0, duration: 1.2 });
      gsap.to(jarGroup.scale, { x: 1.8, y: 1.8, z: 1.8, duration: 1.2 });
      
      gsap.to(glassLid.position, { y: 4.5, duration: 0.8 });
      
      gsap.to(heroPillGroup.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.8 });
      gsap.to(heroPillGroup.position, { y: 2.8, z: 3.0, x: 0, duration: 1.0, ease: 'power2.out' });
      
      gsap.to(heroPillTop.position, { y: 1.0, duration: 0.8, ease: 'back.out(1.5)' });
      gsap.to(heroPillBottom.position, { y: -1.0, duration: 0.8, ease: 'back.out(1.5)' });
    }
  }, [animationState]);

  // Model-level rotation & floating sways
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      if (isFloating) {
        groupRef.current.position.y = Math.sin(t * 1.0) * 0.15;
        groupRef.current.rotation.x = Math.sin(t * pitchFreq) * 0.08 + 0.03;
        groupRef.current.rotation.z = Math.cos(t * rollFreq) * 0.04;
      } else {
        groupRef.current.position.y = 0;
        groupRef.current.rotation.x = 0;
        groupRef.current.rotation.z = 0;
      }

      if (isSpinning) {
        groupRef.current.rotation.y += rotationSpeed * 0.01;
      }
    }

    if (tagRef.current) {
      tagRef.current.rotation.z = Math.sin(t * 1.5) * 0.15 + 0.1;
    }
  });

  const baseLabelMaterial = new THREE.MeshStandardMaterial({
    map: textureBottom,
    roughness: 0.6,
    metalness: 0.05,
    envMapIntensity: 1.5
  });

  const lidLabelMaterial = new THREE.MeshStandardMaterial({
    map: textureTop,
    roughness: 0.6,
    metalness: 0.05,
    envMapIntensity: 1.5
  });

  const jarMaterial = new THREE.MeshPhysicalMaterial({
    transmission: 1.0,
    roughness: 0.05,
    ior: 1.45,
    thickness: 0.4,
    specularIntensity: 1.0,
    envMapIntensity: 2.5,
    color: '#ffffff',
    transparent: true,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0
  });

  const pillMaterial1 = new THREE.MeshStandardMaterial({
    color: '#00d671',
    roughness: 0.2,
    metalness: 0.1,
    envMapIntensity: 1.5
  });

  const pillMaterial2 = new THREE.MeshStandardMaterial({
    color: '#009a50',
    roughness: 0.3,
    metalness: 0.1,
    envMapIntensity: 1.2
  });

  const jarPoints = useMemo(() => [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(1.0, 0),
    new THREE.Vector2(1.1, 0.05),
    new THREE.Vector2(1.15, 0.2),
    new THREE.Vector2(1.15, 2.0),
    new THREE.Vector2(1.1, 2.2),
    new THREE.Vector2(0.9, 2.4),
    new THREE.Vector2(0.8, 2.5),
    new THREE.Vector2(0.8, 2.7),
    new THREE.Vector2(0.9, 2.8),
    new THREE.Vector2(0.8, 2.85),
    new THREE.Vector2(0.7, 2.85),
  ], []);

  const jarLidPoints = useMemo(() => [
    new THREE.Vector2(0.65, 0),
    new THREE.Vector2(0.9, 0.05),
    new THREE.Vector2(1.05, 0.15),
    new THREE.Vector2(1.1, 0.25),
    new THREE.Vector2(1.0, 0.35),
    new THREE.Vector2(1.1, 0.45),
    new THREE.Vector2(1.0, 0.55),
    new THREE.Vector2(0.9, 0.7),
    new THREE.Vector2(0.5, 0.9),
    new THREE.Vector2(0, 0.95),
  ], []);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* Outer Canister Base */}
      <group ref={baseRef} position={[0, -2.5, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[1.5, 1.5, 1.0, 64]} />
          <primitive object={baseLabelMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0.49, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
          <circleGeometry args={[1.48, 64]} />
          <meshStandardMaterial color="#111111" roughness={0.8} />
        </mesh>
      </group>

      {/* Outer Canister Lid */}
      <mesh ref={lidRef} position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[1.5, 1.5, 4.6, 64]} />
        <primitive object={lidLabelMaterial} attach="material" />
      </mesh>

      {/* Glass Jar and Pills */}
      <group ref={jarGroupRef} position={[0, -1, 0]} scale={[0,0,0]}>
        <mesh castShadow receiveShadow>
          <latheGeometry args={[jarPoints, 64]} />
          <primitive object={jarMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 2.7, 0]}>
          <cylinderGeometry args={[0.86, 0.86, 0.15, 64]} />
          <meshStandardMaterial color="#ffffff" transparent={true} opacity={0.5} roughness={0.2} envMapIntensity={0.5} />
        </mesh>
        <mesh position={[0, 2.9, 0]} ref={glassLidRef} castShadow>
          <latheGeometry args={[jarLidPoints, 64]} />
          <primitive object={jarMaterial} attach="material" />
        </mesh>

        {/* Hero Pill popping up */}
        <group ref={heroPillGroupRef} scale={[0,0,0]}>
          <mesh ref={heroPillTopRef} position={[0, 0.35, 0]} castShadow>
            <capsuleGeometry args={[0.45, 0.4, 24, 12]} />
            <primitive object={pillMaterial1} attach="material" />
          </mesh>
          <mesh ref={heroPillBottomRef} position={[0, -0.35, 0]} castShadow>
            <capsuleGeometry args={[0.48, 0.4, 24, 12]} />
            <primitive object={pillMaterial2} attach="material" />
          </mesh>
        </group>

        {/* Instanced Pills inside the jar */}
        <group position={[0, 0.05, 0]}>
          <instancedMesh ref={pillsRef1} args={[null, null, pillCount]}>
            <capsuleGeometry args={[0.45, 0.8, 24, 12]} />
            <primitive object={pillMaterial1} attach="material" />
          </instancedMesh>
          <instancedMesh ref={pillsRef2} args={[null, null, pillCount]} position={[0, 0.05, 0]}>
            <capsuleGeometry args={[0.48, 0.7, 24, 12]} />
            <primitive object={pillMaterial2} attach="material" />
          </instancedMesh>
        </group>

        {/* Premium Swing Tag */}
        <group position={[0.7, 2.65, 0]} rotation={[0, 0, -0.2]}>
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[0.82, 0.008, 8, 48]} />
            <meshStandardMaterial color="#5c4033" roughness={0.8} />
          </mesh>
          <group position={[0.85, -0.3, 0]} rotation={[0, 0, 0.1]} ref={tagRef}>
            <mesh scale={[1.8, 1.8, 1]} castShadow>
              <planeGeometry args={[0.7, 0.7]} />
              <meshStandardMaterial map={tagTexture} transparent={true} roughness={0.4} metalness={0.2} />
            </mesh>
            <mesh position={[0, 0, -0.005]} scale={[1.8, 1.8, 1]}>
              <planeGeometry args={[0.71, 0.71]} />
              <meshStandardMaterial color="#111111" />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};

// --- Main Reel Maker Studio Page ---
const ReelMaker = () => {
  // Page Settings
  const [modelType, setModelType] = useState('science'); // 'science' or 'explodable'
  const [animationState, setAnimationState] = useState('closed'); // 'closed', 'split', 'pillOut', 'pillOpen'
  const [bgType, setBgType] = useState('darkStudio'); // 'greenScreen', 'darkStudio', 'black', 'white', 'neonCyber'
  const [uiVisible, setUiVisible] = useState(true);
  
  // Custom Lighting States
  const [ambientIntensity, setAmbientIntensity] = useState(0.6);
  const [keyIntensity, setKeyIntensity] = useState(2.2);
  const [backIntensity, setBackIntensity] = useState(3.5);
  const [spotIntensity, setSpotIntensity] = useState(2.0);
  const [lightColor, setLightColor] = useState('#ffffff');
  const [rimColor, setRimColor] = useState('#7FE7B3');

  // Animation States
  const [isSpinning, setIsSpinning] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(0.8);
  const [isFloating, setIsFloating] = useState(true);
  const [pitchFreq, setPitchFreq] = useState(0.7);
  const [rollFreq, setRollFreq] = useState(0.7);

  // Keyboard shortcut listener to toggle UI with 'h'
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'h') {
        setUiVisible(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getBackgroundClass = () => {
    switch (bgType) {
      case 'greenScreen':
        return 'bg-[#00ff00]';
      case 'black':
        return 'bg-[#000000]';
      case 'white':
        return 'bg-[#ffffff]';
      case 'neonCyber':
        return 'bg-gradient-to-tr from-[#051108] via-[#022518] to-[#120421]';
      case 'darkStudio':
      default:
        return 'bg-gradient-to-tr from-[#030705] via-[#052E22]/40 to-[#030705]';
    }
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-all duration-700 ${getBackgroundClass()}`}>
      
      {/* 3D Render Canvas */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center h-full w-full bg-black text-[#16C784]">
            <div className="w-12 h-12 rounded-full border-4 border-[#16C784]/20 border-t-[#16C784] animate-spin mb-4"></div>
            <span className="font-mono text-sm tracking-widest uppercase">Initializing Cinematic Studio...</span>
          </div>
        }>
          <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} dpr={[1, 2]}>
            {/* Ambient Lighting */}
            <ambientLight intensity={ambientIntensity} />
            
            {/* Main Key light (front-right) */}
            <directionalLight 
              position={[8, 4, 6]} 
              intensity={keyIntensity} 
              color={lightColor} 
              castShadow 
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            
            {/* Cinematic back light (top-left-back) */}
            <directionalLight 
              position={[-8, 6, -6]} 
              intensity={backIntensity} 
              color={rimColor} 
            />
            
            {/* Fill Light (front-left-low) */}
            <directionalLight 
              position={[-6, -4, 2]} 
              intensity={0.4} 
              color="#ffffff" 
            />
            
            {/* Spotlight focused on center */}
            <spotLight 
              position={[0, 10, 0]} 
              intensity={spotIntensity} 
              angle={0.3} 
              penumbra={1} 
              castShadow 
            />

            {/* Environmental reflection map */}
            <Environment preset="forest" />

            {/* Render selected model */}
            {modelType === 'science' ? (
              <ScienceProductModel 
                scale={[0.9, 0.9, 0.9]} 
                position={[0, 0.2, 0]}
                isSpinning={isSpinning}
                rotationSpeed={rotationSpeed}
                isFloating={isFloating}
                pitchFreq={pitchFreq}
                rollFreq={rollFreq}
              />
            ) : (
              <ExplodableProductModel 
                scale={[0.9, 0.9, 0.9]} 
                position={[0, 0.2, 0]}
                isSpinning={isSpinning}
                rotationSpeed={rotationSpeed}
                isFloating={isFloating}
                pitchFreq={pitchFreq}
                rollFreq={rollFreq}
                animationState={animationState}
              />
            )}

            {/* Contact Shadows to anchor the product */}
            {bgType !== 'greenScreen' && (
              <ContactShadows 
                position={[0, -2.2, 0]} 
                opacity={0.75} 
                scale={7.0} 
                blur={1.8} 
                far={3.0} 
                color={bgType === 'white' ? '#555555' : '#052e22'} 
              />
            )}

            {/* Post Processing Composer */}
            {bgType !== 'greenScreen' && (
              <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={1.1} mipmapBlur intensity={0.4} radius={0.35} />
                <Vignette eskil={false} offset={0.08} darkness={1.1} />
                <SMAA />
              </EffectComposer>
            )}

            <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
          </Canvas>
        </Suspense>
      </div>

      {/* Floating Instruction overlay (shows when UI is hidden) */}
      {!uiVisible && (
        <div className="absolute top-6 left-6 z-50 pointer-events-none select-none animate-pulse">
          <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-xs font-mono text-white/60">
            Press <span className="text-[#16C784] font-bold font-sans">H</span> to show studio controls
          </div>
        </div>
      )}

      {/* Floating Toggle Button (Always visible as a fallback to bring back controls) */}
      <button 
        onClick={() => setUiVisible(!uiVisible)} 
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/80 hover:bg-black border border-white/10 text-[#16C784] transition-all duration-300 hover:scale-105 shadow-lg"
        title="Toggle UI Controls (Key: H)"
      >
        {uiVisible ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
      </button>

      {/* Left Control Panel: Studio Setup */}
      {uiVisible && (
        <div className="absolute top-6 left-6 bottom-6 w-[340px] z-40 flex flex-col gap-4 overflow-y-auto pr-2 pointer-events-auto select-none no-scrollbar">
          
          {/* Title Header */}
          <div className="bg-black/80 backdrop-blur-md p-5 rounded-2xl border border-[#16C784]/25 shadow-2xl">
            <div className="flex items-center gap-2 text-[#16C784] mb-1">
              <Film size={20} className="animate-pulse" />
              <span className="text-xs font-black tracking-[0.25em] uppercase">Biolabs Studio</span>
            </div>
            <h1 className="text-xl font-normal font-serif text-[#F4F6F2]">3D REEL GENERATOR</h1>
            <p className="text-[11px] text-white/50 font-medium mt-1">Record your screen to create cinematic package transitions.</p>
          </div>

          {/* Model Selection & States */}
          <div className="bg-black/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <Layers size={15} className="text-[#16C784]" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">Model &amp; Packaging</span>
            </div>

            {/* Model Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Select Active Model</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setModelType('science')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all duration-300 ${
                    modelType === 'science' 
                      ? 'bg-[#16C784] text-black shadow-[0_0_15px_rgba(22,199,132,0.3)]' 
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/5'
                  }`}
                >
                  Closed Canister
                </button>
                <button
                  onClick={() => {
                    setModelType('explodable');
                    setAnimationState('closed');
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all duration-300 ${
                    modelType === 'explodable' 
                      ? 'bg-[#16C784] text-black shadow-[0_0_15px_rgba(22,199,132,0.3)]' 
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/5'
                  }`}
                >
                  Explodable Jar
                </button>
              </div>
            </div>

            {/* Transition Controls (Only visible if Explodable selected) */}
            {modelType === 'explodable' && (
              <div className="flex flex-col gap-2 mt-1 animate-fadeIn">
                <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Transitions / States</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAnimationState('closed')}
                    className={`py-1.5 px-2 rounded text-[11px] font-semibold transition-all ${
                      animationState === 'closed' ? 'bg-white text-black font-bold' : 'bg-white/5 text-white/80 border border-white/5 hover:bg-white/10'
                    }`}
                  >
                    1. Reset Canister
                  </button>
                  <button
                    onClick={() => setAnimationState('split')}
                    className={`py-1.5 px-2 rounded text-[11px] font-semibold transition-all ${
                      animationState === 'split' ? 'bg-white text-black font-bold' : 'bg-white/5 text-white/80 border border-white/5 hover:bg-white/10'
                    }`}
                  >
                    2. Split &amp; Reveal Jar
                  </button>
                  <button
                    onClick={() => setAnimationState('pillOut')}
                    className={`py-1.5 px-2 rounded text-[11px] font-semibold transition-all ${
                      animationState === 'pillOut' ? 'bg-white text-black font-bold' : 'bg-white/5 text-white/80 border border-white/5 hover:bg-white/10'
                    }`}
                  >
                    3. Pill Pop-out
                  </button>
                  <button
                    onClick={() => setAnimationState('pillOpen')}
                    className={`py-1.5 px-2 rounded text-[11px] font-semibold transition-all ${
                      animationState === 'pillOpen' ? 'bg-white text-black font-bold' : 'bg-white/5 text-white/80 border border-white/5 hover:bg-white/10'
                    }`}
                  >
                    4. Split Hero Pill
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Environmental Background controls */}
          <div className="bg-black/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <Shield size={15} className="text-[#16C784]" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">Backdrop / Chroma Key</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setBgType('darkStudio')}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all border ${
                  bgType === 'darkStudio' 
                    ? 'border-[#16C784] text-[#16C784] bg-[#16C784]/10' 
                    : 'border-white/5 bg-white/5 hover:bg-white/10 text-white/80'
                }`}
              >
                Dark Studio
              </button>
              <button
                onClick={() => setBgType('greenScreen')}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all border ${
                  bgType === 'greenScreen' 
                    ? 'border-green-500 text-green-500 bg-green-500/10' 
                    : 'border-white/5 bg-white/5 hover:bg-white/10 text-white/80'
                }`}
              >
                Green Chroma
              </button>
              <button
                onClick={() => setBgType('black')}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all border ${
                  bgType === 'black' 
                    ? 'border-white text-white bg-white/10' 
                    : 'border-white/5 bg-white/5 hover:bg-white/10 text-white/80'
                }`}
              >
                Pure Black
              </button>
              <button
                onClick={() => setBgType('neonCyber')}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all border ${
                  bgType === 'neonCyber' 
                    ? 'border-purple-400 text-purple-400 bg-purple-400/10' 
                    : 'border-white/5 bg-white/5 hover:bg-white/10 text-white/80'
                }`}
              >
                Cyber Glow
              </button>
            </div>
            {bgType === 'greenScreen' && (
              <p className="text-[10px] text-green-400 font-mono leading-tight bg-green-950/40 p-2.5 rounded border border-green-900/40">
                Chroma Key active. Post-processing and ground shadows disabled for clean keying in Premiere / After Effects.
              </p>
            )}
          </div>

          {/* Quick instructions */}
          <div className="bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-start gap-2.5 text-xs text-white/60">
              <HelpCircle size={16} className="text-[#16C784] shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="font-bold text-white">Camera Control Tips</span>
                <span className="text-[11px] leading-relaxed">
                  • Left-click + drag to rotate camera.<br />
                  • Right-click + drag to pan view.<br />
                  • Scroll wheel to Zoom in/out.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Right Control Panel: Lighting & Physics controls */}
      {uiVisible && (
        <div className="absolute top-6 right-16 bottom-6 w-[340px] z-40 flex flex-col gap-4 overflow-y-auto pr-2 pointer-events-auto select-none no-scrollbar">
          
          {/* Motion / Physics controls */}
          <div className="bg-black/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <Sliders size={15} className="text-[#16C784]" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">Physics &amp; Motion</span>
            </div>

            {/* Rotation toggler */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/80 font-semibold">Continuous Spin Y</span>
              <button
                onClick={() => setIsSpinning(!isSpinning)}
                className={`py-1 px-3.5 rounded-full text-xs font-bold transition-all ${
                  isSpinning ? 'bg-[#16C784] text-black' : 'bg-white/10 text-white/60'
                }`}
              >
                {isSpinning ? 'ACTIVE' : 'MUTED'}
              </button>
            </div>

            {/* Rotation speed slider */}
            {isSpinning && (
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[10px] uppercase font-bold text-white/50">
                  <span>Spin Speed</span>
                  <span>{rotationSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="4.0"
                  step="0.1"
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                  className="w-full accent-[#16C784] bg-white/15 h-1.5 rounded-lg cursor-pointer"
                />
              </div>
            )}

            {/* Floating / Sway toggler */}
            <div className="flex items-center justify-between border-t border-white/5 pt-3">
              <span className="text-xs text-white/80 font-semibold">Weightless Float</span>
              <button
                onClick={() => setIsFloating(!isFloating)}
                className={`py-1 px-3.5 rounded-full text-xs font-bold transition-all ${
                  isFloating ? 'bg-[#16C784] text-black' : 'bg-white/10 text-white/60'
                }`}
              >
                {isFloating ? 'ACTIVE' : 'MUTED'}
              </button>
            </div>

            {isFloating && (
              <div className="flex flex-col gap-3 animate-fadeIn">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-[10px] uppercase font-bold text-white/50">
                    <span>Pitch Frequency (X-Sway)</span>
                    <span>{pitchFreq.toFixed(2)} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.05"
                    value={pitchFreq}
                    onChange={(e) => setPitchFreq(parseFloat(e.target.value))}
                    className="w-full accent-[#16C784] bg-white/15 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-[10px] uppercase font-bold text-white/50">
                    <span>Roll Frequency (Z-Sway)</span>
                    <span>{rollFreq.toFixed(2)} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.05"
                    value={rollFreq}
                    onChange={(e) => setRollFreq(parseFloat(e.target.value))}
                    className="w-full accent-[#16C784] bg-white/15 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Lighting Controls */}
          <div className="bg-black/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <Sun size={15} className="text-[#16C784]" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">Cinematic Lighting</span>
            </div>

            {/* Ambient light intensity */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[10px] uppercase font-bold text-white/50">
                <span>Ambient Intensity</span>
                <span>{ambientIntensity.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="2.0"
                step="0.05"
                value={ambientIntensity}
                onChange={(e) => setAmbientIntensity(parseFloat(e.target.value))}
                className="w-full accent-[#16C784] bg-white/15 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Key light intensity */}
            <div className="flex flex-col gap-1.5 border-t border-white/5 pt-3">
              <div className="flex justify-between text-[10px] uppercase font-bold text-white/50">
                <span>Key Light (Front)</span>
                <span>{keyIntensity.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="5.0"
                step="0.1"
                value={keyIntensity}
                onChange={(e) => setKeyIntensity(parseFloat(e.target.value))}
                className="w-full accent-[#16C784] bg-white/15 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Rim light intensity */}
            <div className="flex flex-col gap-1.5 border-t border-white/5 pt-3">
              <div className="flex justify-between text-[10px] uppercase font-bold text-white/50">
                <span>Rim Light (Back Edge)</span>
                <span>{backIntensity.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="8.0"
                step="0.1"
                value={backIntensity}
                onChange={(e) => setBackIntensity(parseFloat(e.target.value))}
                className="w-full accent-[#16C784] bg-white/15 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Spotlight intensity */}
            <div className="flex flex-col gap-1.5 border-t border-white/5 pt-3">
              <div className="flex justify-between text-[10px] uppercase font-bold text-white/50">
                <span>Spot Light</span>
                <span>{spotIntensity.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="5.0"
                step="0.1"
                value={spotIntensity}
                onChange={(e) => setSpotIntensity(parseFloat(e.target.value))}
                className="w-full accent-[#16C784] bg-white/15 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Custom Light Colors */}
            <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Key Color</label>
                <input
                  type="color"
                  value={lightColor}
                  onChange={(e) => setLightColor(e.target.value)}
                  className="w-full h-8 rounded cursor-pointer bg-white/5 border border-white/10"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Rim Color</label>
                <input
                  type="color"
                  value={rimColor}
                  onChange={(e) => setRimColor(e.target.value)}
                  className="w-full h-8 rounded cursor-pointer bg-white/5 border border-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReelMaker;
