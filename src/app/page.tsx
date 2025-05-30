'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Logo from '@/components/Logo';
import BreathingHistory from '@/components/BreathingHistory';

const breathingExercises = [
  {
    id: '4-7-8',
    name: '4-7-8 Breathing',
    description: 'Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds',
    duration: { inhale: 4, hold: 7, exhale: 8 },
    defaultRounds: 4,
    benefits: 'Reduces anxiety and helps with sleep',
    sound: 'none'
  },
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Equal duration for inhale, hold, exhale, and hold (4 seconds each)',
    duration: { inhale: 4, hold: 4, exhale: 4, holdExhale: 4 },
    defaultRounds: 4,
    benefits: 'Improves focus and reduces stress',
    sound: 'none'
  },
  {
    id: 'relaxing',
    name: 'Relaxing Breath',
    description: 'Simple 4 second inhale, 6 second exhale',
    duration: { inhale: 4, exhale: 6 },
    defaultRounds: 6,
    benefits: 'Quick relaxation and stress relief',
    sound: 'none'
  },
  {
    id: 'pranayama',
    name: 'Pranayama Breathing',
    description: 'Traditional yogic breathing: inhale 4 seconds, hold 16 seconds, exhale 8 seconds',
    duration: { inhale: 4, hold: 16, exhale: 8 },
    defaultRounds: 3,
    benefits: 'Increases energy and improves lung capacity',
    sound: 'none'
  },
  {
    id: 'square',
    name: 'Square Breathing',
    description: 'Equal 4-second duration for all phases, similar to box breathing',
    duration: { inhale: 4, hold: 4, exhale: 4, holdExhale: 4 },
    defaultRounds: 4,
    benefits: 'Enhances mental clarity and calmness',
    sound: 'none'
  },
  {
    id: 'four-square',
    name: 'Four-square Breathing',
    description: 'Inhale 4 seconds, hold 4 seconds, exhale 4 seconds, pause 4 seconds',
    duration: { inhale: 4, hold: 4, exhale: 4, holdExhale: 4 },
    defaultRounds: 4,
    benefits: 'Promotes relaxation and mental focus',
    sound: 'none'
  },
  {
    id: 'coherent',
    name: 'Coherent Breathing',
    description: 'Simple 5-second inhale and 5-second exhale for heart rate variability',
    duration: { inhale: 5, exhale: 5 },
    defaultRounds: 5,
    benefits: 'Improves heart rate variability and emotional balance',
    sound: 'none'
  }
];

export default function Home() {
  const [customExercises, setCustomExercises] = useState([]);
  const [activeTab, setActiveTab] = useState<'exercises' | 'history'>('exercises');
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('customExercises');
    if (saved) {
      setCustomExercises(JSON.parse(saved));
    }
  }, []);

  const deleteCustomExercise = (exerciseId: string) => {
    const updatedExercises = customExercises.filter((ex: any) => ex.id !== exerciseId);
    localStorage.setItem('customExercises', JSON.stringify(updatedExercises));
    setCustomExercises(updatedExercises);
    setShowDeleteDialog(null);
  };

  return (
    <main className="min-h-screen transition-colors duration-200">
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <Logo size="large" className="inline-block mb-4" />
          <p className="text-xl text-secondary mb-8">Find your inner peace through mindful breathing</p>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="nav-tabs rounded-xl p-1 inline-flex">
              <button
                onClick={() => setActiveTab('exercises')}
                className={`nav-tab ${activeTab === 'exercises' ? 'active' : ''}`}
              >
                Exercises
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`nav-tab ${activeTab === 'history' ? 'active' : ''}`}
              >
                History
              </button>
            </div>
          </div>

          {/* Create Custom Exercise Button */}
          <Link
            href="/create"
            className="button-primary px-6 py-3 rounded-xl inline-flex items-center mb-12"
          >
            Create Custom Exercise +
          </Link>
        </div>

        {activeTab === 'exercises' && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Custom Exercises */}
            {customExercises.map((exercise: any) => (
              <div 
                key={exercise.id}
                className="exercise-card group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl font-medium text-primary group-hover:text-ocean-600 dark:group-hover:text-ocean-400 transition-colors">
                      {exercise.name}
                    </h2>
                  </div>
                  <p className="text-secondary text-sm leading-relaxed">
                    {exercise.description}
                  </p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-secondary">
                      {exercise.countType === 'rounds' ? `${exercise.defaultRounds} rounds` : `${exercise.timedDuration} minutes`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-white/10">
                    <p className="text-xs text-secondary">{exercise.benefits}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Built-in Exercises */}
            {breathingExercises.map((exercise) => (
              <Link
                key={exercise.id}
                href={`/exercise/${exercise.id}`}
                className="exercise-card group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl font-medium text-primary group-hover:text-blue-700 dark:group-hover:text-ocean-400 transition-colors">
                      {exercise.name}
                    </h2>
                  </div>
                  <p className="text-secondary text-sm leading-relaxed">
                    {exercise.description}
                  </p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-secondary">
                      {exercise.defaultRounds} rounds
                    </span>
                    <span className="inline-flex items-center text-blue-600 group-hover:text-blue-700 dark:text-ocean-400 dark:group-hover:text-ocean-300 text-sm font-medium">
                      Begin practice →
                    </span>
                  </div>
                  <div className="pt-2 border-t border-blue-100 dark:border-white/10">
                    <p className="text-xs text-secondary">{exercise.benefits}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="text-center p-8">
            <p className="text-lg text-secondary">No breathing exercises completed yet.</p>
            <p className="text-sm text-secondary mt-2">Complete an exercise to see your history here.</p>
          </div>
        )}
      </div>

      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 max-w-sm w-full mx-4">
            <h3 className="text-lg text-white mb-2">Delete Exercise?</h3>
            <p className="text-ocean-100 mb-6">
              Are you sure you want to delete this custom exercise? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteDialog(null)}
                className="px-4 py-2 text-sm text-ocean-100 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteCustomExercise(showDeleteDialog)}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg 
                         hover:bg-red-600 transition-colors"
              >
                Delete Exercise
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
