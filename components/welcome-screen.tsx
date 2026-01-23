'use client';

import { useState, useEffect, useRef } from 'react';
import { HolographicPortrait } from './holographic-portrait';

interface WelcomeScreenProps {
    onComplete: () => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
    const [text, setText] = useState('');
    const hasSpoken = useRef(false);
    const welcomeText = "Welcome to my portfolio";

    useEffect(() => {
        // --- Aggressive Voice Logic ---
        const playVoice = () => {
            if (hasSpoken.current || !window.speechSynthesis) return;

            const utterance = new SpeechSynthesisUtterance(welcomeText);
            utterance.volume = 1;
            utterance.rate = 1.0;
            utterance.pitch = 1.1;

            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v =>
                v.name.includes('Google US English') ||
                v.name.includes('Zira') ||
                v.name.includes('Female')
            );
            if (preferredVoice) utterance.voice = preferredVoice;

            window.speechSynthesis.speak(utterance);

            if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
                hasSpoken.current = true;
            }
        };

        if (window.speechSynthesis.getVoices().length > 0) {
            playVoice();
        } else {
            window.speechSynthesis.onvoiceschanged = () => playVoice();
        }

        const triggerEvents = ['click', 'mousemove', 'keydown', 'touchstart', 'scroll'];
        const handleInteraction = () => {
            playVoice();
        };

        triggerEvents.forEach(event => window.addEventListener(event, handleInteraction));

        // --- Text Logic ---
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= welcomeText.length) {
                setText(welcomeText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(onComplete, 5000);
            }
        }, 70);

        return () => {
            clearInterval(typingInterval);
            triggerEvents.forEach(event => window.removeEventListener(event, handleInteraction));
            window.speechSynthesis.cancel();
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-foreground overflow-hidden">

            {/* 3D PARTICLE HOLOGRAM */}
            <div className="absolute inset-0 z-0 select-none">
                <HolographicPortrait />
            </div>

            {/* Text Overlay - Moved lower and reduced intensity */}
            <div className="absolute bottom-12 left-0 right-0 z-10 text-center space-y-4 pointer-events-none">
                <h2 className="text-2xl md:text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)] tracking-widest opacity-90">
                    {text}<span className="animate-pulse text-emerald-600">_</span>
                </h2>
            </div>
        </div>
    );
}
