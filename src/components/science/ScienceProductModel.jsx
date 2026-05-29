import React, { useRef } from 'react';
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

  // Premium natural floating and swaying animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // 1. Slow, premium floating height sway (weightless feel)
      groupRef.current.position.y = Math.sin(t * 1.0) * 0.08;

      // 2. Sway rotation centered around the front face (-Math.PI * 0.4)
      // Keeps the gorgeous gold "T-CORE" text visible at all times
      const baseRotationY = -Math.PI * 0.35;
      const swayY = Math.sin(t * 0.4) * 0.35; // Sway by ~20 degrees left/right
      groupRef.current.rotation.y = baseRotationY + swayY;

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
