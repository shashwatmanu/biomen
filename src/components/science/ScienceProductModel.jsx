import React, { useRef, useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const ScienceProductModel = (props) => {
  // Load premium canister textures
  const labelNew = useTexture('/label_new.jpg');
  const capTop = useTexture('/cap_top.jpg');
  const capBottom = useTexture('/cap_bottom.jpg');

  // Clone textures to allow independent offsets for lid and base wrapping
  const textureTop = labelNew.clone();
  const textureBottom = labelNew.clone();

  // Wrap setup and color space configuration
  textureTop.wrapS = textureTop.wrapT = THREE.RepeatWrapping;
  textureBottom.wrapS = textureBottom.wrapT = THREE.RepeatWrapping;
  textureTop.colorSpace = THREE.SRGBColorSpace;
  textureBottom.colorSpace = THREE.SRGBColorSpace;
  capTop.colorSpace = THREE.SRGBColorSpace;
  capBottom.colorSpace = THREE.SRGBColorSpace;

  const groupRef = useRef();

  const rotationY = useRef(-Math.PI * 0.35);
  const targetRotationY = useRef(-Math.PI * 0.35);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startRotationY = useRef(0);
  const startY = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleStart = (clientX, clientY) => {
      isDragging.current = true;
      isScrolling.current = false;
      startX.current = clientX;
      startY.current = clientY;
      startRotationY.current = rotationY.current;
    };

    const handleMove = (clientX, clientY) => {
      if (!isDragging.current || isScrolling.current) return;
      const deltaX = clientX - startX.current;
      const deltaY = clientY - startY.current;

      // If gesture is primarily vertical, treat as page scroll and disable rotation
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
        isScrolling.current = true;
        isDragging.current = false;
        return;
      }

      targetRotationY.current = startRotationY.current + deltaX * 0.01;
    };

    const handleEnd = () => {
      isDragging.current = false;
      isScrolling.current = false;
    };

    const onMouseDown = (e) => handleStart(e.clientX, e.clientY);
    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => handleEnd();

    const onTouchStart = (e) => {
      if (e.touches.length > 0) handleStart(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e) => {
      if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => handleEnd();

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // Premium natural floating, swaying, and user-interactive rotation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // 1. Slow, premium floating height sway (weightless feel)
      groupRef.current.position.y = Math.sin(t * 1.0) * 0.08;

      // 2. Interactive and sway rotation
      if (isDragging.current) {
        rotationY.current += (targetRotationY.current - rotationY.current) * 0.25;
      } else {
        rotationY.current += (targetRotationY.current - rotationY.current) * 0.08;
      }

      // Add gentle sway on top when not actively dragging
      const swayY = isDragging.current ? 0 : Math.sin(t * 0.4) * 0.15;
      groupRef.current.rotation.y = rotationY.current + swayY;

      // 3. Subtle floating pitch (X) and roll (Z) to mimic fluid suspension
      groupRef.current.rotation.x = Math.sin(t * 0.7) * 0.04 + 0.03;
      groupRef.current.rotation.z = Math.cos(t * 0.7) * 0.02;
    }
  });

  // Base Label Material - Glossy lacquer finish
  const baseLabelMaterial = new THREE.MeshPhysicalMaterial({
    map: textureBottom,
    roughness: 0.22,
    metalness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 2.8
  });
  baseLabelMaterial.map.repeat.set(1, 1.3 / 6.0);
  baseLabelMaterial.map.offset.set(0, 0);

  // Lid Label Material - Luxury lacquer finish
  const lidLabelMaterial = new THREE.MeshPhysicalMaterial({
    map: textureTop,
    roughness: 0.22,
    metalness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 2.8
  });
  lidLabelMaterial.map.repeat.set(1, 4.7 / 6.0);
  lidLabelMaterial.map.offset.set(0, 1.3 / 6.0);

  const capTopMaterial = new THREE.MeshPhysicalMaterial({
    map: capTop,
    roughness: 0.22,
    metalness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 2.8
  });

  const capBottomMaterial = new THREE.MeshPhysicalMaterial({
    map: capBottom,
    roughness: 0.22,
    metalness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 2.8
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* 
        Canister real dimensions ratio: Height: 140.00 mm (110.00 mm top + 30.00 mm bottom), Circumference: 256.00 mm.
        Diameter = 256.00 / PI = 81.49 mm.
        Tuned to match radius 1.75 (diameter 3.5), total height = 3.5 * (140 / 81.49) = 6.0.
        Lid height = 3.5 * (110 / 81.49) = 4.72. Base height = 3.5 * (30 / 81.49) = 1.29.
        Visual pivot centers exactly at (0,0,0).
      */}
      <group position={[0, 0, 0]}>
        {/* Base / Bottom Tube: Radius 1.75, Height 1.3. Center at y = -2.35 */}
        <group position={[0, -2.35, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.75, 1.75, 1.3, 64]} />
            <primitive object={baseLabelMaterial} attach="material" />
          </mesh>
          {/* Internal black plastic lip/rim */}
          <mesh position={[0, 0.64, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
            <circleGeometry args={[1.73, 64]} />
            <meshStandardMaterial color="#111111" roughness={0.9} />
          </mesh>
          {/* Bottom Cap */}
          <mesh position={[0, -0.652, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
            <circleGeometry args={[1.745, 64]} />
            <primitive object={capBottomMaterial} attach="material" />
          </mesh>
        </group>

        {/* Lid / Top Tube: Radius 1.75, Height 4.7. Center at y = 0.65 */}
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.75, 1.75, 4.7, 64]} />
          <primitive object={lidLabelMaterial} attach="material" />
        </mesh>
        {/* Top Cap */}
        <mesh position={[0, 3.002, 0]} rotation={[-Math.PI * 0.5, 0, 0]} castShadow>
          <circleGeometry args={[1.748, 64]} />
          <primitive object={capTopMaterial} attach="material" />
        </mesh>
      </group>
    </group>
  );
};
