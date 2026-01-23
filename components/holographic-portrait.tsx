'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Float, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// --- HYPER-FLOW AESTHETIC SHADER ---
const PerfectParticleShader = {
    vertexShader: `
    uniform sampler2D uTexture;
    uniform float uTime;
    varying vec2 vUv;
    varying float vBright;
    varying float vRim;

    void main() {
      vUv = uv;
      vec4 texColor = texture2D(uTexture, uv);
      float brightness = (texColor.r + texColor.g + texColor.b) / 3.0;
      vBright = brightness;

      vec3 pos = position;
      
      // 1. Z-Displacement (The Face Shape)
      float depth = brightness * 2.5; 
      pos.z += depth;

      // 2. Fluid Flow (Living Data)
      // Gentle sine waves moving diagonally
      float flow = sin(pos.y * 3.0 + pos.x * 2.0 + uTime * 0.5) * 0.03;
      pos.z += flow;
      pos.x += flow * 0.5; // Slight lateral shift

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      
      // 3. Rim Lighting Calculation (Approximate)
      // Brighter at edges of depth change
      vRim = smoothstep(0.4, 0.8, brightness); 
      
      // Size: Dynamic based on depth
      gl_PointSize = (1.8 * brightness + 0.5) * (15.0 / -modelViewMatrix[3].z); 
    }
  `,
    fragmentShader: `
    varying float vBright;
    varying float vRim;
    uniform float uTime;

    void main() {
        if(vBright < 0.1) discard; 

        // --- PALETTE: "Deep Emerald Matrix" (Darker & Richer) ---
        vec3 deepTeal = vec3(0.0, 0.1, 0.05);  // Darker base
        vec3 emerald  = vec3(0.0, 0.6, 0.3);   // Less neon green
        vec3 cyanHot  = vec3(0.2, 0.8, 0.6);   // Muted highlight (not white/bright cyan)
        
        // Base Gradient
        vec3 color = mix(deepTeal, emerald, vBright * 0.8); // Darken the mix

        // Highlight Pulse (The "Living" part) - Reduced intensity
        float pulse = sin(uTime * 2.0 + vBright * 15.0);
        if(pulse > 0.8) {
           color = mix(color, cyanHot, 0.3 * pulse); // Less flash
        }

        // Rim Light Boost (Edges Glow)
        color += vRim * 0.05; // Reduced rim light

        // Circular Soft Point
        vec2 pc = gl_PointCoord - 0.5;
        float dist = length(pc);
        float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
        
        gl_FragColor = vec4(color, alpha * 0.75); // Lower overall opacity
    }
  `
};

function PerfectCloud() {
    const pointsRef = useRef<THREE.Points>(null);
    const texture = useLoader(THREE.TextureLoader, '/ai_robot_face_real.png');
    const { viewport } = useThree();

    // Responsive: Fit perfectly
    const isMobile = viewport.width < 5;
    const scale = isMobile ? 0.45 : 0.6;

    const uniforms = useMemo(() => ({
        uTexture: { value: texture },
        uTime: { value: 0 },
    }), [texture]);

    useFrame((state) => {
        if (pointsRef.current) {
            // Majestic Slow Rotation
            const { x, y } = state.pointer;
            pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, x * 0.12, 0.05);
            pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -y * 0.08, 0.05);
            (pointsRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <points ref={pointsRef} scale={scale}>
            {/* Ultra-High Definition Plane */}
            <planeGeometry args={[5, 5, 450, 450]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={PerfectParticleShader.vertexShader}
                fragmentShader={PerfectParticleShader.fragmentShader}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export function HolographicPortrait() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 9], fov: 35 }}>
                <Environment preset="city" />

                {/* --- PERFECT AMBIENCE --- */}
                {/* Deep Field Dust */}
                <Sparkles
                    color="#047857"
                    count={200}
                    scale={15}
                    size={4}
                    speed={0.2}
                    opacity={0.4}
                />
                {/* Bright Foreground Fireflies */}
                <Sparkles
                    color="#6ee7b7"
                    count={50}
                    scale={8}
                    size={6}
                    speed={0.5}
                    opacity={0.8}
                />

                <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
                    <PerfectCloud />
                </Float>
            </Canvas>
        </div>
    );
}
