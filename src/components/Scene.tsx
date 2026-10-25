import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Trail, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function Node({ ordered, scatter, order, colorType, index }: any) {
  const ref = useRef<THREE.Mesh>(null!);
  const matRef = useRef<any>(null);

  useFrame(() => {
    if (!ref.current) return;
    const o = THREE.MathUtils.smoothstep(0, 1, order);
    const x = THREE.MathUtils.lerp(scatter[0], ordered[0], o);
    const y = THREE.MathUtils.lerp(scatter[1], ordered[1], o);
    const z = THREE.MathUtils.lerp(scatter[2], ordered[2], o);
    ref.current.position.set(x, y, z);
    ref.current.rotation.y += 0.005 * (1 - o);
  });

  const isMetal = colorType === 0;
  const isGlass = colorType === 1;
  const isPolymer = colorType === 2;

  return (
    <mesh ref={ref}>
      {isMetal && <boxGeometry args={[0.28, 0.28, 0.28]} />}
      {isGlass && <sphereGeometry args={[0.18, 32, 32]} />}
      {isPolymer && <cylinderGeometry args={[0.12, 0.16, 0.32, 16]} />}
      <meshPhysicalMaterial
        ref={matRef}
        color={isMetal ? '#d4d4d8' : isGlass ? '#a5b4fc' : '#2dd4bf'}
        metalness={isMetal ? 1 : isGlass ? 0.1 : 0.2}
        roughness={isMetal ? 0.15 : isGlass ? 0.05 : 0.35}
        transmission={isGlass ? 0.95 : 0}
        thickness={isGlass ? 0.4 : 0}
        ior={isGlass ? 1.5 : 1.4}
        clearcoat={isPolymer ? 0.8 : isMetal ? 0.3 : 0.1}
        clearcoatRoughness={0.1}
        emissive={isGlass ? '#4f46e5' : '#000000'}
        emissiveIntensity={isGlass ? 0.15 : 0}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

function Core({ progress, sceneState, paused }: any) {
  const group = useRef<THREE.Group>(null!);
  const ring = useRef<THREE.Mesh>(null!);
  const pulse = useRef<THREE.Mesh>(null!);

  const stateMap: Record<string, number> = {
    hero: 0, chapter1: 0.25, chapter2: 0.5, chapter3: 0.7, situations: 0.82, practice: 0.92, cta: 1,
  };
  const target = stateMap[sceneState] ?? progress;

  const ordered = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const r = i % 3 === 0 ? 1.6 : 2.1;
      pts.push([Math.cos(a) * r, Math.sin(a * 0.7) * 0.6, Math.sin(a) * r]);
    }
    return pts;
  }, []);

  const scattered = useMemo(() => ordered.map(p => [
    p[0] + (Math.random() - 0.5) * 5,
    p[1] + (Math.random() - 0.5) * 3.5,
    p[2] + (Math.random() - 0.5) * 5,
  ] as [number, number, number]), [ordered]);

  useFrame((state) => {
    if (paused) return;
    const t = state.clock.getElapsedTime();
    const order = THREE.MathUtils.smoothstep(0, 1, target);

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, t * 0.06 + progress * 1.5, 0.04);
      group.current.rotation.x = Math.sin(t * 0.08) * 0.08 * (1 - order * 0.5);
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.12;
      ring.current.scale.setScalar(1 + Math.sin(t * 1.8) * 0.02);
    }
    if (pulse.current) {
      const p = (Math.sin(t * 2.5) + 1) / 2;
      (pulse.current.material as any).opacity = 0.25 + p * 0.4;
      pulse.current.scale.setScalar(1 + p * 0.3);
    }

    const camZ = THREE.MathUtils.lerp(9, 6.2, order);
    const camY = THREE.MathUtils.lerp(0.8, 0.1, order);
    state.camera.position.lerp(new THREE.Vector3(0, camY, camZ), 0.025);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <Trail width={0.6} length={5} color={'#818cf8'} attenuation={(w) => w * w}>
        <mesh ref={pulse}>
          <sphereGeometry args={[0.32, 32, 32]} />
          <meshPhysicalMaterial color={'#ff7a5c'} transparent opacity={0.6} transmission={0.3} roughness={0.1} metalness={0.4} />
        </mesh>
      </Trail>

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshPhysicalMaterial
            color={'#1e1b4b'}
            metalness={0.15}
            roughness={0.08}
            transmission={0.85}
            thickness={0.6}
            ior={1.45}
            clearcoat={0.4}
            emissive={'#4f46e5'}
            emissiveIntensity={0.25}
            envMapIntensity={1.4}
          />
        </mesh>
      </Float>

      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.85, 0.035, 16, 100]} />
        <meshPhysicalMaterial color={'#a78bfa'} metalness={1} roughness={0.12} clearcoat={0.6} envMapIntensity={1.5} />
      </mesh>

      <mesh rotation={[0.3, 0, Math.PI / 5]}>
        <torusGeometry args={[2.55, 0.018, 12, 80]} />
        <meshPhysicalMaterial color={'#2dd4bf'} metalness={0.9} roughness={0.2} transparent opacity={0.7} />
      </mesh>

      {ordered.map((ord, i) => (
        <Node
          key={i}
          ordered={ord}
          scatter={scattered[i]}
          order={target}
          colorType={i % 3}
          index={i}
        />
      ))}

      <Sparkles count={40} scale={9} size={1.8} speed={0.3} color={'#c4b5fd'} opacity={0.4} />
      <Environment preset={'city'} />
      <ambientLight intensity={0.25} />
      <pointLight position={[5, 3, 4]} intensity={1.8} color={'#a5b4fc'} />
      <pointLight position={[-3, -1, 3]} intensity={0.9} color={'#ff7a5c'} />
      <directionalLight position={[0, 4, 2]} intensity={0.6} />
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
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      camera={{ position: [0, 0.8, 9], fov: 48 }}
    >
      <Core progress={progress} sceneState={sceneState} paused={paused} />
    </Canvas>
  );
}