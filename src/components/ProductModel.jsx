import React, { forwardRef, useImperativeHandle, useRef, useMemo, useLayoutEffect, useState } from 'react';
import { useTexture, Html, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const ProductModel = forwardRef(({ container, ...props }, ref) => {
  const textureTop = useTexture('/label_top.jpg');
  const textureBottom = useTexture('/label_bottom.jpg');
  const tagTexture = useTexture('/tag_texture.png');
  const [interactionStage, setInteractionStage] = useState('idle'); // idle, pill_out, pill_open
  
  textureTop.wrapS = textureTop.wrapT = THREE.RepeatWrapping;
  textureBottom.wrapS = textureBottom.wrapT = THREE.RepeatWrapping;
  textureTop.colorSpace = THREE.SRGBColorSpace;
  textureBottom.colorSpace = THREE.SRGBColorSpace;
  tagTexture.colorSpace = THREE.SRGBColorSpace;

  const wrapperRef = useRef();
  const lidRef = useRef();
  const baseRef = useRef();
  const jarGroupRef = useRef();
  const pillsRef1 = useRef();
  const pillsRef2 = useRef();
  const tagRef = useRef();
  const glassLidRef = useRef();
  const heroPillGroupRef = useRef();
  const heroPillTopRef = useRef();
  const heroPillBottomRef = useRef();

  useImperativeHandle(ref, () => ({
    wrapper: wrapperRef.current,
    lid: lidRef.current,
    base: baseRef.current,
    jarGroup: jarGroupRef.current
  }));

  const baseLabelMaterial = new THREE.MeshStandardMaterial({
    map: textureBottom,
    roughness: 0.6,
    metalness: 0.05,
    envMapIntensity: 1.5
  });
  baseLabelMaterial.map.repeat.set(1, 1);
  baseLabelMaterial.map.offset.set(0, 0);

  const lidLabelMaterial = new THREE.MeshStandardMaterial({
    map: textureTop,
    roughness: 0.6,
    metalness: 0.05,
    envMapIntensity: 1.5
  });
  lidLabelMaterial.map.repeat.set(1, 1);
  lidLabelMaterial.map.offset.set(0, 0);

  const jarMaterial = new THREE.MeshPhysicalMaterial({
    transmission: 1.0,
    roughness: 0.0,
    ior: 1.4,
    thickness: 0.5,
    specularIntensity: 1.0,
    envMapIntensity: 2.0,
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

  // Smoother Jar Points
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

  const pillCount = 300;
  const pillMatrices = useMemo(() => {
    const matrices = [];
    const dummy = new THREE.Object3D();
    const pillsPerLayer = 22;
    for (let i = 0; i < pillCount; i++) {
      const layer = Math.floor(i / pillsPerLayer);
      const indexInLayer = i % pillsPerLayer;
      
      const progress = layer / (pillCount / pillsPerLayer);
      const y = layer * 0.08 + 0.12; // Lower step for denser look
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

  useLayoutEffect(() => {
    if (pillsRef1.current && pillsRef2.current) {
      pillMatrices.forEach((matrix, i) => {
        pillsRef1.current.setMatrixAt(i, matrix);
        pillsRef2.current.setMatrixAt(i, matrix);
      });
      pillsRef1.current.instanceMatrix.needsUpdate = true;
      pillsRef2.current.instanceMatrix.needsUpdate = true;
    }
  }, [pillMatrices]);

  useGSAP(() => {
    if (!container || !container.current) return;
    
    const model = wrapperRef.current;
    const lid = lidRef.current;
    const jarGroup = jarGroupRef.current;

    // Initial Setup - place perfectly on the pedestal (right side)
    gsap.set(model.position, { x: 2.8, y: -0.2, z: 0 });
    gsap.set(model.rotation, { x: 0.05, y: -Math.PI * 0.4, z: -0.05 });
    
    gsap.set(jarGroup.position, { y: -1, z: 0 });
    gsap.set(jarGroup.scale, { x: 0, y: 0, z: 0 });
    jarGroup.visible = false;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // Stage 1: Hero to Formula (Time 0 -> 1.3)
    tl.to(model.rotation, { y: Math.PI * 1.5, ease: 'none', duration: 1.3 }, 0);
    tl.to(model.position, { x: -2.5, y: -0.5, ease: 'power2.inOut', duration: 1.3 }, 0);
    tl.to(model.scale, { x: 0.85, y: 0.85, z: 0.85, ease: 'power2.inOut', duration: 1.3 }, 0);

    // Stage 2: Formula to Reveal (Time 1.3 -> 2.6)
    tl.to(lid.position, { y: 20, ease: 'power3.in', duration: 1.3 }, 1.3);
    tl.to(lid.rotation, { y: Math.PI * 3, ease: 'power2.in', duration: 1.3 }, 1.3);
    tl.to(model.rotation, { y: Math.PI * 2.5, ease: 'none', duration: 1.3 }, 1.3);
    
    // Base drops back and blurs vibe
    tl.to(model.position, { z: -12, y: -2, ease: 'power2.inOut', duration: 1.3 }, 1.3);
    tl.to(model.scale, { x: 0.7, y: 0.7, z: 0.7, ease: 'power2.inOut', duration: 1.3 }, 1.3);

    // Jar Pop Hero Reveal
    tl.set(jarGroup, { visible: true }, 1.6);
    tl.to(jarGroup.position, { y: 0.5, z: 5, ease: 'back.out(1.2)', duration: 1.0 }, 1.8);
    tl.to(jarGroup.scale, { x: 2.8, y: 2.8, z: 2.8, ease: 'back.out(1.2)', duration: 1.0 }, 1.8);
    tl.to(jarGroup.rotation, { y: Math.PI * 2.2, ease: 'power1.inOut', duration: 2.2 }, 1.8);

    // Tag Swing Animation
    gsap.to(tagRef.current.rotation, {
      z: 0.35,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Stage 3: Reveal to End (Time 2.6 -> 4.0)
    tl.to(jarGroup.position, { y: 0, z: 0, ease: 'power2.in', duration: 0.8 }, 2.6);
    tl.to(jarGroup.scale, { x: 0, y: 0, z: 0, ease: 'power2.in', duration: 0.8 }, 2.6);
    
    tl.to(lid.position, { y: 0.3, ease: 'back.inOut(1.2)', duration: 1 }, 2.9);
    tl.to(lid.rotation, { y: 0, ease: 'power2.out', duration: 1 }, 2.9);

    tl.to(model.position, { x: 2.5, y: -0.5, z: 0, ease: 'power2.inOut', duration: 1.4 }, 2.6);
    tl.to(model.scale, { x: 1, y: 1, z: 1, ease: 'power2.inOut', duration: 1.4 }, 2.6);
    tl.to(model.rotation, { y: Math.PI * 3.5, ease: 'power1.inOut', duration: 1.4 }, 2.6);

    tl.to({}, { duration: 0.1 });

  }, { dependencies: [container], scope: container });

  const handleJarClick = (e) => {
    e.stopPropagation();
    if (interactionStage !== 'idle') return;

    setInteractionStage('pill_out');
    
    const tl = gsap.timeline();
    // Lift glass lid
    tl.to(glassLidRef.current.position, { y: 4.5, duration: 0.6, ease: 'power2.out' });
    // Hero pill rises
    tl.fromTo(heroPillGroupRef.current.position, 
      { y: 1.0, z: 0, x: 0 },
      { y: 2.2, z: 3.0, x: -0.5, duration: 1.2, ease: 'power2.out' },
      0.2
    );
    tl.to(heroPillGroupRef.current.rotation, { x: Math.PI * 0.5, y: Math.PI * 0.2, duration: 1.0 }, 0.2);
    tl.to(heroPillGroupRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.5 }, 0.2);
  };

  const handlePillClick = (e) => {
    e.stopPropagation();
    if (interactionStage === 'pill_out') {
      setInteractionStage('pill_open');
      gsap.to(heroPillTopRef.current.position, { y: 0.8, duration: 0.6, ease: 'power2.out' });
      gsap.to(heroPillBottomRef.current.position, { y: -0.8, duration: 0.6, ease: 'power2.out' });
    } else if (interactionStage === 'pill_open') {
      resetInteraction();
    }
  };

  const resetInteraction = () => {
    setInteractionStage('idle');
    const tl = gsap.timeline();
    tl.to(heroPillGroupRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.4 });
    tl.to(heroPillTopRef.current.position, { y: 0.35, duration: 0.4 });
    tl.to(heroPillBottomRef.current.position, { y: -0.35, duration: 0.4 }, 0);
    tl.to(glassLidRef.current.position, { y: 2.9, duration: 0.6, ease: 'bounce.out' }, 0.2);
  };

  return (
    <group ref={wrapperRef} {...props} dispose={null}>
      <ContactShadows 
        position={[0, -2.6, 0]} 
        opacity={0.8} 
        scale={8} 
        blur={2} 
        far={4} 
        color="#0a1a0a" 
        resolution={512}
      />
      {/* Outer Canister */}
      <group ref={baseRef} position={[0, -2.5, 0]}>
        <mesh>
          <cylinderGeometry args={[1.5, 1.5, 1.0, 64]} />
          <primitive object={baseLabelMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0.49, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
          <circleGeometry args={[1.48, 64]} />
          <meshStandardMaterial color="#111111" roughness={0.8} />
        </mesh>
      </group>

      <mesh ref={lidRef} position={[0, 0.3, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 4.6, 64]} />
        <primitive object={lidLabelMaterial} attach="material" />
      </mesh>

      {/* THE GLASS JAR & PILLS */}
      <group ref={jarGroupRef} position={[0, -1, 0]}>
        <mesh onClick={handleJarClick}>
          <latheGeometry args={[jarPoints, 64]} />
          <primitive object={jarMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 2.7, 0]}>
          <cylinderGeometry args={[0.86, 0.86, 0.15, 64]} />
          <meshStandardMaterial color="#ffffff" transparent={true} opacity={0.5} roughness={0.2} envMapIntensity={0.5} />
        </mesh>
        <mesh position={[0, 2.9, 0]} ref={glassLidRef}>
          <latheGeometry args={[jarLidPoints, 64]} />
          <primitive object={jarMaterial} attach="material" />
        </mesh>

        {/* Hero Pill */}
        <group ref={heroPillGroupRef} visible={interactionStage !== 'idle'} onClick={handlePillClick} scale={[0,0,0]}>
          <mesh ref={heroPillTopRef} position={[0, 0.35, 0]}>
            <capsuleGeometry args={[0.45, 0.4, 24, 12]} />
            <primitive object={pillMaterial1} attach="material" />
          </mesh>
          <mesh ref={heroPillBottomRef} position={[0, -0.35, 0]}>
            <capsuleGeometry args={[0.48, 0.4, 24, 12]} />
            <primitive object={pillMaterial2} attach="material" />
          </mesh>
          
          {/* Ingredients Overlay */}
          {interactionStage === 'pill_open' && (
            <Html position={[0, 0, 0]} center>
              <div style={{
                background: 'rgba(20,20,20,0.8)',
                padding: '25px',
                borderRadius: '20px',
                border: '1px solid rgba(0, 214, 113, 0.3)',
                color: 'white',
                width: '320px',
                fontFamily: 'sans-serif',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                animation: 'fadeIn 0.5s ease-out'
              }}>
                <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#00d671' }}>Active Ingredients</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    'Tongkat Ali Extract (800mg)',
                    'Purified Shilajit (250mg)',
                    'Fenugreek Seed Extract (250mg)',
                    'Taurine & Zinc Citrate',
                    'Vitamin D3, K1 & K2'
                  ].map(ing => (
                    <li key={ing} style={{ 
                      padding: '10px 0', 
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      fontSize: '14px'
                    }}>{ing}</li>
                  ))}
                </ul>
                <button onClick={(e) => { e.stopPropagation(); resetInteraction(); }} style={{
                  marginTop: '25px',
                  width: '100%',
                  background: '#00d671',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  color: 'black',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  transition: 'transform 0.2s'
                }}>Close</button>
              </div>
            </Html>
          )}
        </group>

        {/* Instanced Pills */}
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

        {/* Premium Tag */}
        <group position={[0.7, 2.65, 0]} rotation={[0, 0, -0.2]}>
          {/* String */}
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[0.82, 0.008, 8, 48]} />
            <meshStandardMaterial color="#5c4033" roughness={0.8} />
          </mesh>
          {/* Tag Card with Swing Animation */}
          <group position={[0.85, -0.3, 0]} rotation={[0, 0, 0.1]} ref={tagRef}>
            <mesh scale={[1.8, 1.8, 1]}>
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
});
