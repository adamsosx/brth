'use client';

import { useEffect, useState } from 'react';

type AnimationType = 'circle' | 'wave' | 'lotus';

interface BreathingAnimationProps {
  phase: 'inhale' | 'hold' | 'exhale' | 'holdExhale' | 'ready';
  timeLeft: number;
  animationType: AnimationType;
}

export default function BreathingAnimation({ phase, timeLeft, animationType }: BreathingAnimationProps) {
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(0.5);

  useEffect(() => {
    if (phase === 'inhale') {
      setScale(1.5);
      setOpacity(1);
    } else if (phase === 'exhale') {
      setScale(1);
      setOpacity(0.5);
    }
  }, [phase]);

  if (animationType === 'circle') {
    return (
      <div className="relative w-64 h-64 mx-auto mb-8">
        <div
          className={`absolute inset-0 rounded-full bg-ocean-400/30 backdrop-blur-sm
                     transition-all duration-[4000ms] ease-in-out`}
          style={{
            transform: `scale(${scale})`,
            opacity: opacity
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-light">
          {phase !== 'ready' ? timeLeft : ''}
        </div>
      </div>
    );
  }

  if (animationType === 'wave') {
    return (
      <div className="relative w-64 h-64 mx-auto mb-8 rounded-lg overflow-hidden">
        <div
          className="absolute inset-x-0 bottom-0 bg-ocean-400/50 backdrop-blur-sm
                     transition-all duration-[4000ms] ease-in-out"
          style={{
            height: `${phase === 'inhale' ? '100%' : phase === 'exhale' ? '20%' : '60%'}`,
          }}
        >
          <div 
            className="absolute inset-0 animate-wave"
            style={{
              background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)',
              animation: 'wave 4s ease-in-out infinite'
            }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-light">
          {phase !== 'ready' ? timeLeft : ''}
        </div>
      </div>
    );
  }

  if (animationType === 'lotus') {
    const petalCount = 8;
    const petals = Array.from({ length: petalCount }, (_, i) => {
      const rotation = (i * 360) / petalCount;
      return (
        <div
          key={i}
          className="absolute w-32 h-32 origin-bottom"
          style={{
            transform: `rotate(${rotation}deg) translateY(-50%) scale(${scale})`,
            transition: 'transform 4s ease-in-out'
          }}
        >
          <div 
            className="w-full h-full bg-ocean-400/30 rounded-full"
            style={{
              opacity: opacity,
              transition: 'opacity 4s ease-in-out'
            }}
          />
        </div>
      );
    });

    return (
      <div className="relative w-64 h-64 mx-auto mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          {petals}
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-light">
          {phase !== 'ready' ? timeLeft : ''}
        </div>
      </div>
    );
  }

  return null;
} 