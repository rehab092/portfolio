'use client';

import { useEffect, useRef } from 'react';

export function AIBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let animationFrameId: number;

        // Configuration
        const GLOBE_RADIUS = 280; // Radius of the brain/globe
        const NODE_COUNT = 150; // Number of neurons
        const CONNECTION_DISTANCE = 90; // Max distance to connect
        const ROTATION_SPEED_BASE = 0.002;

        // Aesthetic Colors (Professional Mint/Olive)
        // Green is 120-160. Teal/Cyan is 170+. Lime is 80-100.
        // We'll target a range of 140 (Green) to 165 (Mint/Teal)
        const HUE_BASE = 145;
        const HUE_RANGE = 25; // Variation

        interface Point3D {
            x: number;
            y: number;
            z: number;
            hue: number;
        }

        interface Point2D {
            x: number;
            y: number;
            scale: number; // Scale factor based on depth
            alpha: number; // Opacity based on depth
            hue: number;
        }

        let points: Point3D[] = [];
        let rotationX = 0;
        let rotationY = 0;
        const targetRotation = { x: 0.002, y: 0.002 };

        // Mouse Interaction
        let mouseX = 0;
        let mouseY = 0;
        let isMouseOver = false;

        // Initialize Points using Fibonacci Sphere algorithm for even distribution
        const initPoints = () => {
            points = [];
            const goldenRatio = (1 + Math.sqrt(5)) / 2;

            for (let i = 0; i < NODE_COUNT; i++) {
                const theta = 2 * Math.PI * i / goldenRatio;
                const phi = Math.acos(1 - 2 * (i + 0.5) / NODE_COUNT);

                const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
                const y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
                const z = GLOBE_RADIUS * Math.cos(phi);

                // Assign a hue based on position for a gradient effect
                const hue = HUE_BASE + (Math.abs(y / GLOBE_RADIUS)) * HUE_RANGE;

                points.push({ x, y, z, hue });
            }
        };

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            width = window.innerWidth;
            height = window.innerHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = '100%';
            canvas.style.height = '100%';

            ctx.scale(dpr, dpr);
            ctx.translate(width / 2, height / 2); // Center coordinate system
        };

        const project = (p: Point3D, rotX: number, rotY: number): Point2D => {
            // Rotate around Y axis
            const cx = Math.cos(rotY);
            const sx = Math.sin(rotY);
            let x = p.x * cx - p.z * sx;
            let z = p.x * sx + p.z * cx;

            // Rotate around X axis
            const cy = Math.cos(rotX);
            const sy = Math.sin(rotX);
            let y = p.y * cy - z * sy;
            z = p.y * sy + z * cy;

            // Perspective Projection
            const perspective = width / 2; // Approximate "camera distance" relative to screen width
            const scale = perspective / (perspective + z);

            const x2d = x * scale;
            const y2d = y * scale;

            // Calculate alpha based on Z depth (fade out back)
            const alpha = Math.max(0.1, (z + GLOBE_RADIUS) / (1.5 * GLOBE_RADIUS));

            return {
                x: x2d + width / 2, // Translate back to screen coords (actually we centered ctx, so we don't need this if we didn't translate ctx... wait.
                // I translated ctx in resize(). Let's stick to 0,0 being center of screen.
                y: y2d + height / 2, // scratch that, drawing primitives is easier if 0,0 is center.
                scale,
                alpha,
                hue: p.hue
            };
        };

        // Correct projection for 0,0 center context
        const projectCentered = (p: Point3D, rotX: number, rotY: number): Point2D => {
            // Rotate Y
            const cx = Math.cos(rotY);
            const sx = Math.sin(rotY);
            let x = p.x * cx - p.z * sx;
            let z = p.x * sx + p.z * cx;

            // Rotate X
            const cy = Math.cos(rotX);
            const sy = Math.sin(rotX);
            let y = p.y * cy - z * sy;
            z = p.y * sy + z * cy;

            // FOV / Camera dist
            const fov = 800;
            const scale = fov / (fov - z);

            return {
                x: x * scale,
                y: y * scale,
                scale,
                alpha: (z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS), // simple depth mapping
                hue: p.hue
            };
        };

        const draw = () => {
            // Clear with slight trail effect? No, transparent for background.
            // But we need to use clearRect with the transformed coordinates
            // Since ctx is translated to center, top-left is (-width/2, -height/2)
            ctx.clearRect(-width / 2, -height / 2, width, height);

            // Update Rotations
            if (isMouseOver) {
                // Target rotation based on mouse relative to center
                const dx = (mouseX - width / 2) * 0.0001;
                const dy = (mouseY - height / 2) * 0.0001;
                rotationY += dx;
                rotationX += dy;
            } else {
                rotationY += ROTATION_SPEED_BASE;
                rotationX += ROTATION_SPEED_BASE * 0.5;
            }

            // Project all points
            const projected = points.map(p => ({
                ...projectCentered(p, rotationX, rotationY),
                originalZ: p.z // keep track for sorting if needed, but 'scale' serves similar purpose
            }));

            // Sort by scale (depth) to draw back-to-front (Painters Algo)
            // Small scale = far away. 
            projected.sort((a, b) => a.scale - b.scale);

            // Draw Connections
            ctx.globalCompositeOperation = 'lighter'; // Additive blending for glow
            ctx.lineWidth = 1;

            for (let i = 0; i < projected.length; i++) {
                const p1 = projected[i];
                if (p1.alpha < 0) continue;

                // Connect to nearby points in the *projected* list? 
                // No, geometrically we should connect neighbors on surface.
                // But calculating neighbors every frame O(N^2) is fine for N=150.

                let connections = 0;
                for (let j = i + 1; j < projected.length; j++) {
                    const p2 = projected[j];
                    // Optimization: only check points somewhat close in array index? No, sorted by depth, not proximity.
                    // Just do distance check.
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECTION_DISTANCE * p1.scale) { // Scale distance by depth
                        const alpha = Math.min(p1.alpha, p2.alpha) * (1 - dist / (CONNECTION_DISTANCE * p1.scale));
                        if (alpha > 0.05) {
                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = `hsla(${p1.hue}, 80%, 60%, ${alpha})`;
                            ctx.stroke();
                            connections++;
                            if (connections > 3) break; // Limit connections per node for performance/cleanliness
                        }
                    }
                }

                // Draw Node
                ctx.beginPath();
                const radius = Math.max(0.5, 2 * p1.scale);
                ctx.arc(p1.x, p1.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p1.hue}, 90%, 60%, ${p1.alpha})`;

                // Glow effect
                if (p1.scale > 1.2) { // Only glow distinct close nodes
                    ctx.shadowBlur = 15 * p1.scale;
                    ctx.shadowColor = `hsla(${p1.hue}, 90%, 60%, 1)`;
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.fill();
                ctx.shadowBlur = 0; // Reset
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            isMouseOver = true;
        };

        const handleMouseLeave = () => {
            isMouseOver = false;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        initPoints();
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none">
            {/* Deep Space Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-black to-black" />

            <canvas ref={canvasRef} className="absolute inset-0" style={{ opacity: 0.9 }} />

            {/* Vignette Overlay for cinematic focus */}
            <div className="absolute inset-0 bg-[radial-gradient(transparent,black)] opacity-80" />
        </div>
    );
}
