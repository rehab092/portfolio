'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Float, Environment, Torus } from '@react-three/drei';
import * as THREE from 'three';

function RealRobotHead() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            const { x, y } = state.pointer;
            // Smooth tracking
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.3, 0.1);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.3, 0.1);
        }
    });

    // --- OPTIMIZED MATERIALS (Realism via Physics) ---
    const materials = useMemo(() => {
        return {
            chromeSkin: new THREE.MeshStandardMaterial({
                color: '#e2e8f0', // Silver/White
                roughness: 0.15,  // Polished
                metalness: 1.0,   // Real metal
                envMapIntensity: 1.5,
            }),
            darkMetal: new THREE.MeshStandardMaterial({
                color: '#1e293b', // Slate
                roughness: 0.3,
                metalness: 0.8,
            }),
            glassVisor: new THREE.MeshPhysicalMaterial({
                color: '#000000',
                roughness: 0,
                metalness: 0.5,
                transmission: 0.1,
                clearcoat: 1,
            }),
            glowBlue: new THREE.MeshStandardMaterial({
                color: '#38bdf8',
                emissive: '#0ea5e9',
                emissiveIntensity: 2,
                toneMapped: false,
            }),
        };
    }, []);

    return (
        <group ref={groupRef} scale={2.6} position={[0, -0.4, 0]}>

            {/* ================= HEAD SCULPT ================= */}
            {/* 1. Cranium */}
            <Sphere args={[0.85, 64, 64]} position={[0, 0.2, -0.1]}>
                <primitive object={materials.chromeSkin} />
            </Sphere>

            {/* 2. Jaw/Chin Block (Squared for realism) */}
            <Sphere args={[0.5, 64, 64]} position={[0, -0.5, 0.1]} scale={[1.4, 0.8, 0.8]}>
                <primitive object={materials.chromeSkin} />
            </Sphere>


            {/* ================= FEATURES ================= */}

            {/* VISOR (The "Real" Eyes solution) */}
            {/* A dark glass strip across the eyes looks more "Real Robot" than fake spheres */}
            <Cylinder args={[0.72, 0.72, 0.25, 64]} position={[0, 0.15, 0.05]} rotation={[0, 0, 0]} scale={[1, 1, 1.05]}>
                {/* Cut half cylinder? No, just embed it */}
                <primitive object={materials.glassVisor} />
            </Cylinder>

            {/* Glowing Eye Slits inside Visor */}
            <Cylinder args={[0.68, 0.68, 0.02, 64]} position={[0, 0.15, 0.06]} rotation={[0, 0, 0]}>
                <primitive object={materials.glowBlue} />
            </Cylinder>


            {/* Nose Ridge (Subtle) */}
            <Cylinder args={[0.08, 0.15, 0.4, 32]} position={[0, -0.2, 0.7]} rotation={[0, 0, 0]}>
                <primitive object={materials.chromeSkin} />
            </Cylinder>

            {/* Mouth Slot */}
            <Cylinder args={[0.15, 0.15, 0.02, 32]} position={[0, -0.6, 0.65]} rotation={[1.57, 0, 0]} scale={[1, 1, 0.3]}>
                <primitive object={materials.darkMetal} />
            </Cylinder>


            {/* ================= EARS / AUDIO ================= */}
            {/* Side Units */}
            <Cylinder args={[0.3, 0.3, 0.1, 32]} position={[-0.88, 0.1, -0.1]} rotation={[0, 0, 1.57]}>
                <primitive object={materials.chromeSkin} />
            </Cylinder>
            <Cylinder args={[0.2, 0.2, 0.12, 32]} position={[-0.9, 0.1, -0.1]} rotation={[0, 0, 1.57]}>
                <primitive object={materials.glowBlue} />
            </Cylinder>

            <Cylinder args={[0.3, 0.3, 0.1, 32]} position={[0.88, 0.1, -0.1]} rotation={[0, 0, 1.57]}>
                <primitive object={materials.chromeSkin} />
            </Cylinder>
            <Cylinder args={[0.2, 0.2, 0.12, 32]} position={[0.9, 0.1, -0.1]} rotation={[0, 0, 1.57]}>
                <primitive object={materials.glowBlue} />
            </Cylinder>

            {/* ================= NECK ================= */}
            <Cylinder args={[0.35, 0.45, 0.8, 32]} position={[0, -1.0, 0]}>
                <primitive object={materials.darkMetal} />
            </Cylinder>

        </group>
    );
}

export function RobotAvatar() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                {/* Studio Lighting is Key for Realism */}
                <Environment preset="studio" />

                <ambientLight intensity={0.5} />
                {/* Cool Rim Light */}
                <spotLight position={[-5, 5, 5]} intensity={2} color="#38bdf8" angle={0.5} />
                {/* Warm Fill */}
                <pointLight position={[5, -5, 5]} intensity={1} color="#ffffff" />

                <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                    <RealRobotHead />
                </Float>
            </Canvas>
        </div>
    );
}
