import React, { useRef, useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const ScienceProductModel = (props) => {
  // Load premium canister textures
  const textureTop = useTexture('/label_top.jpg');
  const textureBottom = useTexture('/label_bottom.jpg');

  // Wrap setup and color space configuration
  textureTop.wrapS = textureTop.wrapT = THREE.RepeatWrapping;
  textureBottom.wrapS = textureBottom.wrapT = THREE.RepeatWrapping;
  textureTop.colorSpace = THREE.SRGBColorSpace;
  textureBottom.colorSpace = THREE.SRGBColorSpace;

  const groupRef = useRef();

  const rotationY = useRef(-Math.PI * 0.35);
  const targetRotationY = useRef(-Math.PI * 0.35);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startRotationY = useRef(0);

  useEffect(() => {
    const handleStart = (clientX) => {
      isDragging.current = true;
      startX.current = clientX;
      startRotationY.current = rotationY.current;
    };

    const handleMove = (clientX) => {
      if (!isDragging.current) return;
      const deltaX = clientX - startX.current;
      targetRotationY.current = startRotationY.current + deltaX * 0.01;
    };

    const handleEnd = () => {
      isDragging.current = false;
    };

    const onMouseDown = (e) => handleStart(e.clientX);
    const onMouseMove = (e) => handleMove(e.clientX);
    const onMouseUp = () => handleEnd();

    const onTouchStart = (e) => {
      if (e.touches.length > 0) handleStart(e.touches[0].clientX);
    };
    const onTouchMove = (e) => {
      if (e.touches.length > 0) handleMove(e.touches[0].clientX);
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
  baseLabelMaterial.map.repeat.set(1, 1);
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
  lidLabelMaterial.map.repeat.set(1, 1);
  lidLabelMaterial.map.offset.set(0, 0);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* 
        Canister aspect ratio tuned to match `tcore_canister.jpg` (diameter: 3.5, total height: 4.7)
        Midpoint is y = -0.05. Offset by y = 0.05 centers the physical model visual pivot exactly at (0,0,0).
      */}
      <group position={[0, 0.05, 0]}>
        {/* Base / Bottom Tube: Radius 1.75, Height 0.9. Center at y = -1.95 */}
        <group position={[0, -1.95, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.75, 1.75, 0.9, 64]} />
            <primitive object={baseLabelMaterial} attach="material" />
          </mesh>
          {/* Internal black plastic lip/rim */}
          <mesh position={[0, 0.44, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
            <circleGeometry args={[1.73, 64]} />
            <meshStandardMaterial color="#111111" roughness={0.9} />
          </mesh>
        </group>

        {/* Lid / Top Tube: Radius 1.75, Height 3.8. Center at y = 0.4 */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.75, 1.75, 3.8, 64]} />
          <primitive object={lidLabelMaterial} attach="material" />
        </mesh>
      </group>
    </group>
  );
};
