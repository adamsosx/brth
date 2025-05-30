'use client';

import { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  soundType: 'ocean' | 'rain' | 'forest' | 'none';
  volume: number;
  isPlaying: boolean;
}

const soundUrls = {
  ocean: '/sounds/ocean-waves.mp3',
  rain: '/sounds/rain.mp3',
  forest: '/sounds/forest.mp3',
  none: ''
};

export default function AudioPlayer({ soundType, volume, isPlaying }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && soundType !== 'none') {
        audioRef.current.play().catch(error => {
          console.log('Audio playback error:', error);
        });
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isPlaying, soundType]);

  useEffect(() => {
    if (audioRef.current && soundType !== 'none') {
      audioRef.current.src = soundUrls[soundType];
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.log('Audio playback error:', error);
        });
      }
    }
  }, [soundType, isPlaying]);

  if (soundType === 'none') {
    return null;
  }

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      className="hidden"
    />
  );
} 