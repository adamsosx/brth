'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CustomExercise {
  id: string;
  name: string;
  description: string;
  duration: {
    inhale: number;
    hold?: number;
    exhale: number;
    holdExhale?: number;
  };
  defaultRounds?: number;
  timedDuration?: number; // czas w minutach
  countType: 'rounds' | 'timed';
  benefits: string;
}

export default function CustomExerciseForm() {
  const router = useRouter();
  const [exercise, setExercise] = useState<CustomExercise>({
    id: `custom-${Date.now()}`,
    name: '',
    description: '',
    duration: {
      inhale: 4,
      hold: undefined,
      exhale: 4,
      holdExhale: undefined
    },
    defaultRounds: 4,
    timedDuration: 5,
    countType: 'rounds',
    benefits: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const savedExercises = localStorage.getItem('customExercises');
    const exercises = savedExercises ? JSON.parse(savedExercises) : [];
    exercises.push(exercise);
    localStorage.setItem('customExercises', JSON.stringify(exercises));
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-white mb-2">Exercise Name</label>
        <input
          type="text"
          value={exercise.name}
          onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-white mb-2">Description</label>
        <textarea
          value={exercise.description}
          onChange={(e) => setExercise({ ...exercise, description: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white mb-2">Inhale Duration (seconds)</label>
          <input
            type="number"
            min="1"
            max="20"
            value={exercise.duration.inhale}
            onChange={(e) => setExercise({
              ...exercise,
              duration: { ...exercise.duration, inhale: Number(e.target.value) }
            })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2">Hold Duration (seconds)</label>
          <input
            type="number"
            min="0"
            max="20"
            value={exercise.duration.hold || 0}
            onChange={(e) => setExercise({
              ...exercise,
              duration: { ...exercise.duration, hold: Number(e.target.value) || undefined }
            })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
        </div>

        <div>
          <label className="block text-white mb-2">Exhale Duration (seconds)</label>
          <input
            type="number"
            min="1"
            max="20"
            value={exercise.duration.exhale}
            onChange={(e) => setExercise({
              ...exercise,
              duration: { ...exercise.duration, exhale: Number(e.target.value) }
            })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2">Hold After Exhale (seconds)</label>
          <input
            type="number"
            min="0"
            max="20"
            value={exercise.duration.holdExhale || 0}
            onChange={(e) => setExercise({
              ...exercise,
              duration: { ...exercise.duration, holdExhale: Number(e.target.value) || undefined }
            })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-white">Exercise Count Type</label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setExercise({ ...exercise, countType: 'rounds' })}
            className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
              exercise.countType === 'rounds'
                ? 'bg-ocean-500 text-white'
                : 'bg-white/10 text-ocean-100 hover:bg-white/20'
            }`}
          >
            Count Rounds
          </button>
          <button
            type="button"
            onClick={() => setExercise({ ...exercise, countType: 'timed' })}
            className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
              exercise.countType === 'timed'
                ? 'bg-ocean-500 text-white'
                : 'bg-white/10 text-ocean-100 hover:bg-white/20'
            }`}
          >
            Time Based
          </button>
        </div>

        {exercise.countType === 'rounds' ? (
          <div>
            <label className="block text-white mb-2">Number of Rounds</label>
            <input
              type="number"
              min="1"
              max="20"
              value={exercise.defaultRounds}
              onChange={(e) => setExercise({ ...exercise, defaultRounds: Number(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
              required
            />
          </div>
        ) : (
          <div>
            <label className="block text-white mb-2">Duration (minutes)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={exercise.timedDuration}
              onChange={(e) => setExercise({ ...exercise, timedDuration: Number(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
              required
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-white mb-2">Benefits</label>
        <textarea
          value={exercise.benefits}
          onChange={(e) => setExercise({ ...exercise, benefits: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
          rows={2}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-ocean-500 text-white px-6 py-3 rounded-xl font-medium 
                 hover:bg-ocean-600 transition-colors"
      >
        Create Exercise
      </button>
    </form>
  );
} 