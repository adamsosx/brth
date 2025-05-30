'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AudioPlayer from '@/components/AudioPlayer';
import BreathingCues from '@/components/BreathingCues';
import BreathingAnimation from '@/components/BreathingAnimation';
import Logo from '@/components/Logo';

type Duration = {
  inhale: number;
  hold?: number;
  exhale: number;
  holdExhale?: number;
};

type Exercise = {
  id?: string;
  name: string;
  description: string;
  duration: Duration;
  defaultRounds?: number;
  timedDuration?: number;
  countType: 'rounds' | 'timed';
  benefits?: string;
};

const breathingExercises: Record<string, Exercise> = {
  '4-7-8': {
    name: '4-7-8 Breathing',
    description: 'Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds',
    duration: { inhale: 4, hold: 7, exhale: 8 },
    countType: 'rounds',
    defaultRounds: 4
  },
  'box': {
    name: 'Box Breathing',
    description: 'Equal duration for inhale, hold, exhale, and hold (4 seconds each)',
    duration: { inhale: 4, hold: 4, exhale: 4, holdExhale: 4 },
    countType: 'rounds',
    defaultRounds: 4
  },
  'relaxing': {
    name: 'Relaxing Breath',
    description: 'Simple 4 second inhale, 6 second exhale',
    duration: { inhale: 4, exhale: 6 },
    countType: 'rounds',
    defaultRounds: 6
  },
  'pranayama': {
    name: 'Pranayama Breathing',
    description: 'Traditional yogic breathing: inhale 4 seconds, hold 16 seconds, exhale 8 seconds',
    duration: { inhale: 4, hold: 16, exhale: 8 },
    countType: 'rounds',
    defaultRounds: 3
  },
  'square': {
    name: 'Square Breathing',
    description: 'Equal 4-second duration for all phases, similar to box breathing',
    duration: { inhale: 4, hold: 4, exhale: 4, holdExhale: 4 },
    countType: 'rounds',
    defaultRounds: 4
  },
  'four-square': {
    name: 'Four-square Breathing',
    description: 'Inhale 4 seconds, hold 4 seconds, exhale 4 seconds, pause 4 seconds',
    duration: { inhale: 4, hold: 4, exhale: 4, holdExhale: 4 },
    countType: 'rounds',
    defaultRounds: 4
  },
  'coherent': {
    name: 'Coherent Breathing',
    description: 'Simple 5-second inhale and 5-second exhale for heart rate variability',
    duration: { inhale: 5, exhale: 5 },
    countType: 'rounds',
    defaultRounds: 5
  }
};

type Phase = 'inhale' | 'hold' | 'exhale' | 'holdExhale' | 'ready';

const soundUrls = {
  ocean: '/sounds/ocean-waves.mp3',
  rain: '/sounds/rain.mp3',
  forest: '/sounds/forest.mp3',
};

export default function ExercisePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = params.id as string;
  let exercise = breathingExercises[id as keyof typeof breathingExercises];
  
  // Add support for custom exercises
  if (!exercise && id.startsWith('custom-')) {
    const savedExercises = localStorage.getItem('customExercises');
    if (savedExercises) {
      const customExercises = JSON.parse(savedExercises);
      exercise = customExercises.find((e: Exercise & { id: string }) => e.id === id);
    }
  }
  
  const [phase, setPhase] = useState<Phase>('ready');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [targetRounds, setTargetRounds] = useState(exercise?.defaultRounds || 4);
  const [targetDuration, setTargetDuration] = useState(exercise?.timedDuration || 5);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [animationType, setAnimationType] = useState<'circle' | 'wave' | 'lotus'>('circle');
  const selectedSound = searchParams.get('sound') as 'ocean' | 'rain' | 'forest' || 'ocean';

  useEffect(() => {
    if (!exercise) {
      router.push('/');
      return;
    }
  }, [exercise, router]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      if (exercise.countType === 'timed') {
        // Aktualizuj czas co sekundę
        interval = setInterval(() => {
          setElapsedTime(time => {
            const newTime = time + 1;
            if (newTime >= targetDuration * 60) {
              setIsActive(false);
              setPhase('ready');
              saveSession(newTime);
              return newTime;
            }
            return newTime;
          });
        }, 1000);
      } else if (timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft((time) => time - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        if (completedCycles >= targetRounds) {
          saveSession(calculateTotalDuration());
          setIsActive(false);
          setPhase('ready');
          return;
        }

        switch (phase) {
          case 'inhale':
            if (exercise.duration.hold) {
              setPhase('hold');
              setTimeLeft(exercise.duration.hold);
            } else {
              setPhase('exhale');
              setTimeLeft(exercise.duration.exhale);
            }
            break;
          case 'hold':
            setPhase('exhale');
            setTimeLeft(exercise.duration.exhale);
            break;
          case 'exhale':
            if (exercise.duration.holdExhale) {
              setPhase('holdExhale');
              setTimeLeft(exercise.duration.holdExhale);
            } else {
              setPhase('inhale');
              setTimeLeft(exercise.duration.inhale);
              setCompletedCycles(cycles => cycles + 1);
            }
            break;
          case 'holdExhale':
            setPhase('inhale');
            setTimeLeft(exercise.duration.inhale);
            setCompletedCycles(cycles => cycles + 1);
            break;
        }
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase, exercise, completedCycles, targetRounds, targetDuration]);

  const startExercise = () => {
    setIsActive(true);
    setPhase('inhale');
    setTimeLeft(exercise.duration.inhale);
    setCompletedCycles(0);
    setElapsedTime(0);
  };

  const stopExercise = () => {
    const duration = exercise.countType === 'timed' ? elapsedTime : calculateTotalDuration();
    saveSession(duration);
    setIsActive(false);
    setPhase('ready');
    setTimeLeft(0);
    setElapsedTime(0);
  };

  const calculateTotalDuration = () => {
    let total = 0;
    for (let i = 0; i < completedCycles; i++) {
      total += exercise.duration.inhale;
      if (exercise.duration.hold) total += exercise.duration.hold;
      total += exercise.duration.exhale;
      if (exercise.duration.holdExhale) total += exercise.duration.holdExhale;
    }
    return total;
  };

  const saveSession = (duration: number) => {
    const session = {
      id: Date.now().toString(),
      exerciseId: id,
      exerciseName: exercise.name,
      date: new Date().toISOString(),
      duration,
      rounds: exercise.countType === 'timed' ? Math.floor(duration / calculateCycleDuration()) : completedCycles
    };

    const savedSessions = localStorage.getItem('breathingSessions');
    const sessions = savedSessions ? JSON.parse(savedSessions) : [];
    sessions.push(session);
    localStorage.setItem('breathingSessions', JSON.stringify(sessions));
  };

  const calculateCycleDuration = () => {
    let total = exercise.duration.inhale;
    if (exercise.duration.hold) total += exercise.duration.hold;
    total += exercise.duration.exhale;
    if (exercise.duration.holdExhale) total += exercise.duration.holdExhale;
    return total;
  };

  if (!exercise) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-calm-primary via-calm-accent to-ocean-600">
      <div className="max-w-2xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-ocean-100 hover:text-white transition-colors"
          >
            ← Back
          </Link>
          <Logo size="small" />
        </div>
        
        <h1 className="text-4xl font-light mb-3 text-white">{exercise.name}</h1>
        <p className="text-ocean-100/90 mb-8">{exercise.description}</p>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center 
                    border border-white/20">
          {phase === 'ready' ? (
            <div className="space-y-6">
              <div className="space-y-4">
                {exercise.countType === 'rounds' ? (
                  <label className="block text-white">
                    <span className="block mb-2">Number of Rounds</span>
                    <input 
                      type="number" 
                      min="1" 
                      max="20"
                      value={targetRounds}
                      onChange={(e) => setTargetRounds(Number(e.target.value))}
                      className="w-20 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center"
                    />
                  </label>
                ) : (
                  <label className="block text-white">
                    <span className="block mb-2">Duration (minutes)</span>
                    <input 
                      type="number" 
                      min="1" 
                      max="60"
                      value={targetDuration}
                      onChange={(e) => setTargetDuration(Number(e.target.value))}
                      className="w-20 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center"
                    />
                  </label>
                )}
                <div className="flex items-center gap-4">
                  <label className="block text-white flex-1">
                    <span className="block mb-2">Sound Volume</span>
                    <input 
                      type="range" 
                      min="0" 
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className={`w-full ${isMuted ? 'opacity-50' : ''} accent-ocean-400`}
                      disabled={isMuted}
                    />
                  </label>
                  <label className="flex items-center gap-2 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isMuted}
                      onChange={(e) => setIsMuted(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-white/10 text-ocean-500 focus:ring-ocean-500"
                    />
                    <span>Mute All Sounds</span>
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="block text-white">
                    <span className="block mb-2">Animation Style</span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setAnimationType('circle')}
                        className={`px-4 py-2 rounded-lg ${
                          animationType === 'circle'
                            ? 'bg-ocean-500 text-white'
                            : 'bg-white/20 hover:bg-white/30'
                        }`}
                      >
                        Circle
                      </button>
                      <button
                        onClick={() => setAnimationType('wave')}
                        className={`px-4 py-2 rounded-lg ${
                          animationType === 'wave'
                            ? 'bg-ocean-500 text-white'
                            : 'bg-white/20 hover:bg-white/30'
                        }`}
                      >
                        Wave
                      </button>
                      <button
                        onClick={() => setAnimationType('lotus')}
                        className={`px-4 py-2 rounded-lg ${
                          animationType === 'lotus'
                            ? 'bg-ocean-500 text-white'
                            : 'bg-white/20 hover:bg-white/30'
                        }`}
                      >
                        Lotus
                      </button>
                    </div>
                  </label>
                </div>
              </div>
              <button
                onClick={startExercise}
                className="bg-ocean-500 text-white px-8 py-4 rounded-xl text-lg font-medium 
                         hover:bg-ocean-600 transition-colors shadow-sm hover:shadow-md"
              >
                Begin Practice
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <BreathingAnimation
                phase={phase}
                timeLeft={timeLeft}
                animationType={animationType}
              />
              <div className="text-2xl text-ocean-100 capitalize mb-2">{phase}</div>
              <div className="text-ocean-200">
                {exercise.countType === 'rounds' ? (
                  `Round ${completedCycles + 1} of ${targetRounds}`
                ) : (
                  `${Math.floor((targetDuration * 60 - elapsedTime) / 60)}:${String(
                    (targetDuration * 60 - elapsedTime) % 60
                  ).padStart(2, '0')} remaining`
                )}
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="block text-white flex-1">
                    <span className="block mb-2 text-sm">Volume</span>
                    <input 
                      type="range" 
                      min="0" 
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className={`w-full ${isMuted ? 'opacity-50' : ''} accent-ocean-400`}
                      disabled={isMuted}
                    />
                  </label>
                  <label className="flex items-center gap-2 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isMuted}
                      onChange={(e) => setIsMuted(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-white/10 text-ocean-500 focus:ring-ocean-500"
                    />
                    <span className="text-sm">Mute</span>
                  </label>
                </div>
              </div>
              <button
                onClick={stopExercise}
                className="bg-white/10 text-white px-6 py-3 rounded-xl text-base font-medium 
                         hover:bg-white/20 transition-colors"
              >
                End Practice
              </button>
            </div>
          )}
        </div>
      </div>
      <AudioPlayer 
        soundType={selectedSound} 
        volume={isMuted ? 0 : volume} 
        isPlaying={isActive} 
      />
      <BreathingCues
        phase={phase}
        volume={isMuted ? 0 : volume}
        isActive={isActive}
      />
    </main>
  );
} 