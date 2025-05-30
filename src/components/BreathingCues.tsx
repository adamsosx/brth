import { useEffect, useRef } from 'react';

interface BreathingCuesProps {
  phase: 'inhale' | 'hold' | 'exhale' | 'holdExhale' | 'ready';
  volume: number;
  isActive: boolean;
}

const cueUrls = {
  inhale: '/sounds/inhale-cue.mp3',
  hold: '/sounds/hold-cue.mp3',
  exhale: '/sounds/exhale-cue.mp3',
  holdExhale: '/sounds/hold-exhale-cue.mp3',
};

export default function BreathingCues({ phase, volume, isActive }: BreathingCuesProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = (volume / 100) * 0.5; // Set cue volume to 50% of ambient sound
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current && isActive && phase !== 'ready') {
      const cueUrl = cueUrls[phase];
      if (cueUrl) {
        audioRef.current.src = cueUrl;
        audioRef.current.play().catch(error => {
          console.log('Breathing cue playback error:', error);
        });
      }
    }
  }, [phase, isActive]);

  return (
    <audio
      ref={audioRef}
      preload="auto"
      className="hidden"
    />
  );
} 