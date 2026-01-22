'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleHead() {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate points for a "Head" shape (Sphere + Jaw approximation)
    const particles = useMemo(() => {
        const count = 4000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const green = new THREE.Color('#10b981'); // Emerald
        const mint = new THREE.Color('#a3e635'); // Lime/Mint accent

        for (let i = 0; i < count; i++) {
            // Spherical distribution (Cranium)
            let theta = Math.random() * Math.PI * 2;
            let phi = Math.acos(Math.random() * 2 - 1);
            let r = 1.5;

            // Morph slightly into a head shape (taper jaw)
            // If y < 0, taper x and z
            let x = r * Math.sin(phi) * Math.cos(theta);
            let y = r * Math.sin(phi) * Math.sin(theta);
            let z = r * Math.cos(phi);

            // Jaw shaping
            if (y < -0.5) {
                x *= 0.8;
                z *= 0.8;
                y *= 1.2; // Elongate chin
            }

            // Noise/Fuzz
            x += (Math.random() - 0.5) * 0.1;
            y += (Math.random() - 0.5) * 0.1;
            z += (Math.random() - 0.5) * 0.1;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Colors
            const color = Math.random() > 0.8 ? mint : green;
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        return { positions, colors };
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            const time = state.clock.getElapsedTime();
            // Breathe
            pointsRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.02);
            // Slowly rotate
            pointsRef.current.rotation.y = time * 0.1;
            // Follow mouse slightly
            const { x, y } = state.pointer;
            pointsRef.current.rotation.x = -y * 0.2;
            pointsRef.current.rotation.y += x * 0.2;
        }
    });

    return (
        <group rotation={[0, 0, 0]}>
            <Points ref={pointsRef} positions={particles.positions} colors={particles.colors} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

export function HolographicAvatar() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
                {/* Lights (even though points use basic material, might switch to mesh later) */}
                <ambientLight intensity={0.5} />
                <ParticleHead />
            </Canvas>
        </div>
    );
}
