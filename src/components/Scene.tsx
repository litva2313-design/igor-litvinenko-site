import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Trail, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function Core({ progress, sceneState, paused }: any) {
  const group = useRef<THREE.Group>(null!);
  const ring = useRef<THREE.Mesh>(null!);
  const nodes = useRef<THREE.Group>(null!);
  const pulse = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>(null!);

  const stateMap: Record<string, number> = {
    hero: 0, chapter1: 0.2, chapter2: 0.45, chapter3: 0.7, situations: 0.8, practice: 0.9, cta: 1,
  };
  const target = stateMap[sceneState] ?? 0;

  useFrame((state) => {
    if (paused) return;
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, t * 0.08 + progress * 2, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.sin(t * 0.1) * 0.1, 0.05);
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.15;
      const s = 1 + Math.sin(t * 2) * 0.03;
      ring.current.scale.setScalar(s);
    }
    if (nodes.current) {
      nodes.current.rotation.y = -t * 0.05;
      const spread = THREE.MathUtils.lerp(0.6, 2.2, target);
      nodes.current.scale.setScalar(spread);
    }
    if (pulse.current) {
      const p = (Math.sin(t * 3) + 1) / 2;
      pulse.current.material.opacity = 0.3 + p * 0.5;
      pulse.current.scale.setScalar(1 + p * 0.4);
    }
    // camera drift
    const camZ = THREE.MathUtils.lerp(8, 5.5, target);
    const camY = THREE.MathUtils.lerp(1, 0.2, target);
    state.camera.position.lerp(new THREE.Vector3(0, camY, camZ), 0.03);
    state.camera.lookAt(0, 0, 0);
  });

  const nodePositions = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      pts.push([Math.cos(a) * 1.4, Math.sin(a * 1.3) * 0.8, Math.sin(a) * 1.4]);
    }
    return pts;
  }, []);

  return (
    <group ref={group}>
      <Trail width={0.8} length={6} color={'#4f7cff'} attenuation={(w) => w * w}>
        <mesh ref={pulse} position={[0, 0, 0]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshBasicMaterial color={'#ff6b4a'} transparent opacity={0.5} />
        </mesh>
      </Trail>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh>
          <icosahedronGeometry args={[1.1, 1]} />
          <MeshDistortMaterial
            color={'#1b1b4e'}
            emissive={'#4f7cff'}
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.8}
            distort={0.35}
            speed={1.2}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>

      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.04, 16, 100]} />
        <meshStandardMaterial color={'#8b5cf6'} emissive={'#8b5cf6'} emissiveIntensity={1.2} />
      </mesh>

      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[2.6, 0.025, 16, 120]} />
        <meshStandardMaterial color={'#2dd4bf'} emissive={'#2dd4bf'} emissiveIntensity={0.8} transparent opacity={0.6} />
      </mesh>

      <group ref={nodes}>
        {nodePositions.map((p, i) => (
          <group key={i} position={p as any}>
            <mesh>
              <boxGeometry args={[0.22, 0.22, 0.22]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? '#ff9f43' : i % 3 === 1 ? '#4f7cff' : '#2dd4bf'}
                emissive={i % 3 === 0 ? '#ff9f43' : i % 3 === 1 ? '#4f7cff' : '#2dd4bf'}
                emissiveIntensity={0.7}
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color={'#ffffff'} />
            </mesh>
          </group>
        ))}
      </group>

      {nodePositions.map((p, i) =>
        nodePositions.slice(i + 1, i + 3).map((q, j) => {
          const mid = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2];
          const len = Math.sqrt((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2);
          const dir = new THREE.Vector3(q[0] - p[0], q[1] - p[1], q[2] - p[2]).normalize();
          return (
            <mesh key={i + '-' + j} position={mid as any} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)}>
              <cylinderGeometry args={[0.012, 0.012, len, 8]} />
              <meshBasicMaterial color={'#4f7cff'} transparent opacity={0.35} />
            </mesh>
          );
        })
      )}

      <Sparkles count={60} scale={8} size={2} speed={0.4} color={'#8b5cf6'} opacity={0.5} />
      <Environment preset={'night'} />
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} intensity={1.5} color={'#4f7cff'} />
      <pointLight position={[-4, -2, 2]} intensity={0.8} color={'#ff6b4a'} />
    </group>
  );
}

export default function Scene({ progress, sceneState, paused, reducedMotion }: any) {
  if (reducedMotion) {
    return (
      <div className="scene-fallback" aria-hidden="true">
        <div className="fallback-core" />
        <div className="fallback-ring" />
        <div className="fallback-nodes">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="fallback-node" style={{ '--a': `${(i / 7) * 360}deg` } as any} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <Canvas
      className="scene"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 1, 8], fov: 50 }}
    >
      <Core progress={progress} sceneState={sceneState} paused={paused} />
    </Canvas>
  );
}