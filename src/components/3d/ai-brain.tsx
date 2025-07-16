"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Sphere, 
  Box,
  Torus,
  MeshDistortMaterial, 
  Float, 
  Trail,
  Sparkles,
  Environment
} from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette } from "@react-three/postprocessing";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Mesh[]>([]);

  // Create node positions
  const nodePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const layers = 4;
    const nodesPerLayer = [3, 5, 5, 3];
    
    for (let layer = 0; layer < layers; layer++) {
      const layerZ = (layer - 1.5) * 2;
      const nodeCount = nodesPerLayer[layer];
      
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const radius = 1.5;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        positions.push([x, y, layerZ]);
      }
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
    
    // Animate nodes
    nodesRef.current.forEach((node, i) => {
      if (node) {
        const time = state.clock.getElapsedTime();
        node.scale.setScalar(1 + Math.sin(time * 2 + i) * 0.1);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Neural nodes */}
      {nodePositions.map((pos, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Sphere
            ref={(el) => {
              if (el) nodesRef.current[i] = el;
            }}
            position={pos}
            args={[0.2, 16, 16]}
          >
            <meshStandardMaterial
              color="#64748b"
              emissive="#475569"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </Sphere>
        </Float>
      ))}
      
      {/* Connection effects */}
      <Sparkles
        count={50}
        scale={5}
        size={1}
        speed={0.2}
        opacity={0.3}
        color="#64748b"
      />
    </group>
  );
}

function DataFlow() {
  const trailRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (trailRef.current) {
      const time = state.clock.getElapsedTime();
      trailRef.current.position.x = Math.sin(time * 2) * 3;
      trailRef.current.position.y = Math.cos(time * 3) * 2;
      trailRef.current.position.z = Math.sin(time) * 2;
    }
  });

  return (
    <Trail
      width={0.5}
      length={10}
      color="#94a3b8"
      attenuation={(t) => t * t}
    >
      <Sphere ref={trailRef} args={[0.1]}>
        <meshBasicMaterial color="#e2e8f0" />
      </Sphere>
    </Trail>
  );
}

function CentralCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <Box ref={meshRef} args={[1, 1, 1]}>
        <MeshDistortMaterial
          color="#475569"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive="#334155"
          emissiveIntensity={0.3}
          wireframe
        />
      </Box>
      
      {/* Outer rings */}
      <Torus args={[2, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
      </Torus>
      <Torus args={[2.5, 0.02, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
      </Torus>
    </Float>
  );
}

export function AIBrain() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#64748b" />
          
          <NeuralNetwork />
          <CentralCore />
          <DataFlow />
          
          <Sparkles
            count={100}
            scale={10}
            size={2}
            speed={0.5}
            opacity={0.5}
            color="#cbd5e1"
          />
          
          <Environment preset="city" />
          
          <EffectComposer>
            <Bloom
              intensity={1}
              luminanceThreshold={0}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <DepthOfField
              focusDistance={0}
              focalLength={0.02}
              bokehScale={2}
              height={480}
            />
            <Vignette darkness={0.5} />
          </EffectComposer>
        </Suspense>
      </Canvas>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80 pointer-events-none" />
    </div>
  );
}