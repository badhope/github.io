'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function StarLogoMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  // Create star shape geometry (morphable between sphere and star)
  const { geometry, originalPositions, starPositions } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.2, 4);
    const posAttr = geo.getAttribute('position');
    const origPos = new Float32Array(posAttr.array);
    const starPos = new Float32Array(posAttr.array.length);

    // Create star-like positions by pushing vertices outward based on angle
    for (let i = 0; i < posAttr.count; i++) {
      const x = origPos[i * 3];
      const y = origPos[i * 3 + 1];
      const z = origPos[i * 3 + 2];
      
      const angle = Math.atan2(y, x);
      const dist = Math.sqrt(x * x + y * y + z * z);
      
      // Create 5-pointed star effect
      const starFactor = 1 + 0.3 * Math.cos(angle * 5);
      const starFactor2 = 1 + 0.15 * Math.cos(angle * 5 + Math.PI);
      
      const factor = dist > 0.8 ? starFactor : starFactor2;
      
      starPos[i * 3] = x * factor;
      starPos[i * 3 + 1] = y * factor;
      starPos[i * 3 + 2] = z * factor;
    }

    return { geometry: geo, originalPositions: origPos, starPositions: starPos };
  }, []);

  // Create particle system around the logo
  const { particlePositions, particleColors } = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const goldColor = new THREE.Color('#d4af37');
    const blueColor = new THREE.Color('#1a73e8');
    const purpleColor = new THREE.Color('#7c3aed');
    const cyanColor = new THREE.Color('#06b6d4');
    const colorOptions = [goldColor, blueColor, purpleColor, cyanColor];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 1.2;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { particlePositions: positions, particleColors: colors };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Morph between sphere and star
    const posAttr = meshRef.current.geometry.getAttribute('position');
    const morphFactor = (Math.sin(time * 0.5) + 1) / 2; // 0 to 1

    for (let i = 0; i < posAttr.count; i++) {
      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];
      const oz = originalPositions[i * 3 + 2];
      const sx = starPositions[i * 3];
      const sy = starPositions[i * 3 + 1];
      const sz = starPositions[i * 3 + 2];

      posAttr.array[i * 3] = ox + (sx - ox) * morphFactor;
      posAttr.array[i * 3 + 1] = oy + (sy - oy) * morphFactor;
      posAttr.array[i * 3 + 2] = oz + (sz - oz) * morphFactor;
    }
    posAttr.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();

    // Rotation
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;

    // Pulse glow
    if (glowRef.current) {
      glowRef.current.intensity = 2 + Math.sin(time * 2) * 0.5;
    }

    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.1;
      particlesRef.current.rotation.x = Math.sin(time * 0.15) * 0.2;
      
      const pPos = particlesRef.current.geometry.getAttribute('position');
      for (let i = 0; i < pPos.count; i++) {
        const idx = i * 3;
        const origR = 1.8 + (i % 5) * 0.3;
        const theta = Math.atan2(pPos.array[idx + 1], pPos.array[idx]) + time * 0.05;
        const phi = Math.acos(pPos.array[idx + 2] / origR);
        const r = origR + Math.sin(time + i) * 0.2;
        
        pPos.array[idx] = r * Math.sin(phi) * Math.cos(theta);
        pPos.array[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
        pPos.array[idx + 2] = r * Math.cos(phi);
      }
      pPos.needsUpdate = true;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={meshRef} geometry={geometry}>
          <MeshDistortMaterial
            color="#d4af37"
            emissive="#d4af37"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
            distort={0.15}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Particle system */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
            args={[particlePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleColors.length / 3}
            array={particleColors}
            itemSize={3}
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Lights */}
      <pointLight ref={glowRef} color="#d4af37" intensity={2} distance={5} />
      <pointLight color="#1a73e8" intensity={0.5} position={[3, 2, 3]} />
      <pointLight color="#7c3aed" intensity={0.3} position={[-3, -2, -3]} />
      <ambientLight intensity={0.2} />
    </>
  );
}

interface StarLogoProps {
  size?: number;
  className?: string;
}

export default function StarLogo({ size = 300, className }: StarLogoProps) {
  return (
    <div style={{ width: size, height: size }} className={className}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <StarLogoMesh />
      </Canvas>
    </div>
  );
}
