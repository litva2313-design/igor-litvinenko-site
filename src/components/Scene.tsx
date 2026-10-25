import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Trail, Sparkles, MeshTransmissionMaterial, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

function Node({ ordered, scatter, order, colorType, index }: any) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (!ref.current) return;
    const o = THREE.MathUtils.smoothstep(0, 1, order);
    const x = THREE.MathUtils.lerp(scatter[0], ordered[0], o);
    const y = THREE.MathUtils.lerp(scatter[1], ordered[1], o);
    const z = THREE.MathUtils.lerp(scatter[2], ordered[2], o);
    ref.current.position.set(x, y, z);
    const lock = Math.pow(o, 3);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, index * 0.2, lock * 0.1);
    ref.current.scale.setScalar(1 + Math.sin(o * Math.PI) * 0.08);
  });

  const isMetal = colorType === 0;
  const isGlass = colorType === 1;
  const isPolymer = colorType === 2;

  return (
    <mesh ref={ref} castShadow receiveShadow>
      {isMetal && <boxGeometry args={[0.3, 0.3, 0.3]} />}
      {isGlass && <sphereGeometry args={[0.2, 48, 48]} />}
      {isPolymer && <cylinderGeometry args={[0.14, 0.18, 0.36, 24]} />}
      {isGlass ? (
        <MeshTransmissionMaterial
          backside
          samples={6}
          resolution={512}
          transmission={0.96}
          roughness={0.04}
          thickness={0.5}
          ior={1.52}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.15}
          distortionScale={0.3}
          temporalDistortion={0.05}
          clearcoat={0.3}
          attenuationDistance={0.8}
          attenuationColor={'#a5b4fc'}
          color={'#c7d2fe'}
          envMapIntensity={1.8}
        />
      ) : (
        <meshPhysicalMaterial
          color={isMetal ? '#e4e4e7' : '#14b8a6'}
          metalness={isMetal ? 1 : 0.15}
          roughness={isMetal ? 0.08 : 0.28}
          clearcoat={isPolymer ? 0.9 : 0.4}
          clearcoatRoughness={0.08}
          sheen={isPolymer ? 0.6 : 0}
          sheenRoughness={0.3}
          sheenColor={'#5eead4'}
          envMapIntensity={1.6}
          emissive={isMetal ? '#1e1b4b' : '#000'}
          emissiveIntensity={isMetal ? 0.05 : 0}
        />
      )}
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
      const r = i % 3 === 0 ? 1.7 : 2.25;
      pts.push([Math.cos(a) * r, Math.sin(a * 0.65) * 0.55, Math.sin(a) * r]);
    }
    return pts;
  }, []);

  const scattered = useMemo(() => ordered.map(p => [
    p[0] + (Math.random() - 0.5) * 6,
    p[1] + (Math.random() - 0.5) * 4,
    p[2] + (Math.random() - 0.5) * 6,
  ] as [number, number, number]), [ordered]);

  useFrame((state) => {
    if (paused) return;
    const t = state.clock.getElapsedTime();
    const order = THREE.MathUtils.smoothstep(0, 1, target);

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, t * 0.05 + progress * 1.2, 0.03);
      group.current.rotation.x = Math.sin(t * 0.07) * 0.06 * (1 - order * 0.6);
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.1;
      ring.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.015);
    }
    if (pulse.current) {
      const p = (Math.sin(t * 2.2) + 1) / 2;
      (pulse.current.material as any).opacity = 0.2 + p * 0.35;
      pulse.current.scale.setScalar(1 + p * 0.25);
    }

    const camZ = THREE.MathUtils.lerp(9.5, 5.8, order);
    const camY = THREE.MathUtils.lerp(0.6, 0.05, order);
    state.camera.position.lerp(new THREE.Vector3(0, camY, camZ), 0.02);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <Trail width={0.5} length={8} color={'#a5b4fc'} attenuation={(w) => w * w}>
        <mesh ref={pulse}>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshPhysicalMaterial color={'#fb7185'} transparent opacity={0.55} transmission={0.4} roughness={0.08} metalness={0.3} />
        </mesh>
      </Trail>

      <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.35}>
        <mesh>
          <icosahedronGeometry args={[1.1, 2]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            resolution={768}
            transmission={0.92}
            roughness={0.03}
            thickness={0.7}
            ior={1.48}
            chromaticAberration={0.08}
            anisotropy={0.2}
            distortion={0.2}
            distortionScale={0.4}
            temporalDistortion={0.08}
            clearcoat={0.5}
            attenuationDistance={1.2}
            attenuationColor={'#6366f1'}
            color={'#312e81'}
            envMapIntensity={2}
          />
        </mesh>
      </Float>

      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.04, 24, 120]} />
        <meshPhysicalMaterial color={'#c4b5fd'} metalness={1} roughness={0.06} clearcoat={0.8} clearcoatRoughness={0.05} envMapIntensity={2.2} />
      </mesh>

      <mesh rotation={[0.25, 0.1, Math.PI / 6]}>
        <torusGeometry args={[2.6, 0.02, 16, 100]} />
        <meshPhysicalMaterial color={'#2dd4bf'} metalness={0.95} roughness={0.15} transparent opacity={0.65} envMapIntensity={1.8} />
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

      <Sparkles count={70} scale={10} size={2.2} speed={0.25} color={'#ddd6fe'} opacity={0.55} />
      <Environment preset={'studio'} />
      <ambientLight intensity={0.2} />
      <pointLight position={[6, 4, 5]} intensity={2.2} color={'#c7d2fe'} distance={15} decay={2} />
      <pointLight position={[-4, -2, 4]} intensity={1.1} color={'#fb7185'} distance={12} decay={2} />
      <directionalLight position={[2, 6, 3]} intensity={0.8} color={'#fef3c7'} castShadow />
      <ContactShadows position={[0, -2.5, 0]} opacity={0.35} scale={12} blur={2.5} far={4} />
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

  const isHighQuality = typeof window !== 'undefined' && window.innerWidth > 768 && navigator.hardwareConcurrency > 4;

  return (
    <Canvas
      className="scene"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      dpr={isHighQuality ? [1, 2] : [1, 1.4]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      camera={{ position: [0, 0.6, 9.5], fov: 46 }}
      shadows
    >
      <Core progress={progress} sceneState={sceneState} paused={paused} />
      {isHighQuality && (
        <EffectComposer disableNormalPass>
          <Bloom intensity={0.45} luminanceThreshold={0.75} luminanceSmoothing={0.3} mipmapBlur />
          <Vignette eskil={false} offset={0.1} darkness={0.4} />
        </EffectComposer>
      )}
    </Canvas>
  );
}