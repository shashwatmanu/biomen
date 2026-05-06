import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const ProductModel = forwardRef(({ container, ...props }, ref) => {
  const texture = useTexture('/texture.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.repeat.set(1, 1);

  const wrapperRef = useRef();
  const lidRef = useRef();
  const baseRef = useRef();
  const capsuleRef = useRef();

  useImperativeHandle(ref, () => ({
    wrapper: wrapperRef.current,
    lid: lidRef.current,
    base: baseRef.current,
    capsule: capsuleRef.current
  }));

  const silverMaterial = new THREE.MeshStandardMaterial({
    color: '#d1d1d1',
    roughness: 0.1,
    metalness: 0.8,
    envMapIntensity: 2.0
  });

  const baseLabelMaterial = new THREE.MeshStandardMaterial({
    map: texture.clone(),
    roughness: 0.5,
    metalness: 0.3,
    envMapIntensity: 0.5
  });
  baseLabelMaterial.map.repeat.set(1, 0.25);
  baseLabelMaterial.map.offset.set(0, 0);

  const lidLabelMaterial = new THREE.MeshStandardMaterial({
    map: texture.clone(),
    roughness: 0.5,
    metalness: 0.3,
    envMapIntensity: 0.5
  });
  lidLabelMaterial.map.repeat.set(1, 0.75);
  lidLabelMaterial.map.offset.set(0, 0.25);

  const capsuleMaterial = new THREE.MeshStandardMaterial({
    color: '#00a859', // Vibrant Green
    roughness: 0.1,
    metalness: 0.1,
    envMapIntensity: 1.5
  });

  useGSAP(() => {
    if (!container || !container.current) return;
    
    const model = wrapperRef.current;
    const lid = lidRef.current;
    const capsule = capsuleRef.current;

    // Initial Setup
    gsap.set(model.position, { x: 0, y: 0, z: 0 });
    gsap.set(model.rotation, { x: 0.1, y: -Math.PI * 0.5, z: 0 });
    gsap.set(capsule.position, { y: -1, z: 0 });
    gsap.set(capsule.scale, { x: 0, y: 0, z: 0 });
    capsule.visible = false;

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
    // Uncapping + Pill Pop
    tl.to(lid.position, { y: 14, ease: 'power3.inOut', duration: 1.3 }, 1.3);
    tl.to(lid.rotation, { y: Math.PI * 2, ease: 'power2.inOut', duration: 1.3 }, 1.3);
    tl.to(model.rotation, { y: Math.PI * 2.5, ease: 'none', duration: 1.3 }, 1.3);
    tl.to(model.position, { z: -8, y: -1.5, ease: 'power2.inOut', duration: 1.3 }, 1.3);

    // Pill Pop
    tl.set(capsule, { visible: true }, 1.6);
    tl.to(capsule.position, { y: 1.5, z: 4, ease: 'back.out(1.8)', duration: 0.8 }, 1.7);
    tl.to(capsule.scale, { x: 3.5, y: 3.5, z: 3.5, ease: 'back.out(1.8)', duration: 0.8 }, 1.7);

    // Stage 3: Reveal to End (Time 2.6 -> 4.0)
    // Reassemble and move to the Right
    tl.to(capsule.position, { y: 0, z: 0, ease: 'power2.in', duration: 0.8 }, 2.6);
    tl.to(capsule.scale, { x: 0, y: 0, z: 0, ease: 'power2.in', duration: 0.8 }, 2.6);
    
    tl.to(lid.position, { y: 0.3, ease: 'back.inOut(1.2)', duration: 1 }, 2.9);
    tl.to(lid.rotation, { y: 0, ease: 'power2.out', duration: 1 }, 2.9);

    tl.to(model.position, { x: 2.5, y: -0.5, z: 0, ease: 'power2.inOut', duration: 1.4 }, 2.6);
    tl.to(model.scale, { x: 1, y: 1, z: 1, ease: 'power2.inOut', duration: 1.4 }, 2.6);
    tl.to(model.rotation, { y: Math.PI * 3.5, ease: 'power1.inOut', duration: 1.4 }, 2.6);

    tl.to({}, { duration: 0.1 });

  }, { dependencies: [container], scope: container });

  return (
    <group ref={wrapperRef} {...props} dispose={null}>
      {/* Lower Base Container */}
      <group position={[0, -2.5, 0]}>
        <mesh>
          <cylinderGeometry args={[1.5, 1.5, 1.0, 64]} />
          <primitive object={baseLabelMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[1.45, 1.45, 0.1, 64]} />
          <primitive object={silverMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0.45, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
          <circleGeometry args={[1.44, 64]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
      </group>
      
      <mesh position={[0, -2.0, 0]}>
        <cylinderGeometry args={[1.51, 1.51, 0.08, 64]} />
        <primitive object={silverMaterial} attach="material" />
      </mesh>

      <mesh ref={lidRef} position={[0, 0.3, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 4.6, 64]} />
        <primitive object={lidLabelMaterial} attach="material" />
      </mesh>

      <group ref={capsuleRef} position={[0, -1, 0]} scale={[0, 0, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <capsuleGeometry args={[0.45, 0.8, 32, 32]} />
          <primitive object={capsuleMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <capsuleGeometry args={[0.48, 0.7, 32, 32]} />
          <primitive object={capsuleMaterial} attach="material" />
        </mesh>
      </group>
    </group>
  );
});
