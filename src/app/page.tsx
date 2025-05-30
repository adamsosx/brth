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
    <main className="min-h-screen bg-gradient-to-br from-calm-primary via-calm-accent to-ocean-600">
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <Logo size="large" className="inline-block mb-4" />
          <p className="text-xl text-ocean-100">Find your inner peace through mindful breathing</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-1 inline-flex">
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'exercises'
                  ? 'bg-ocean-500 text-white'
                  : 'text-ocean-100 hover:text-white'
              }`}
            >
              Exercises
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'history'
                  ? 'bg-ocean-500 text-white'
                  : 'text-ocean-100 hover:text-white'
              }`}
            >
              History
            </button>
          </div>
        </div>

        {activeTab === 'exercises' ? (
          <>
            {/* Create Custom Exercise Button */}
            <div className="mb-8 text-center">
              <Link
                href="/create"
                className="inline-flex items-center px-6 py-3 bg-ocean-500 text-white rounded-xl
                         hover:bg-ocean-600 transition-colors"
              >
                Create Custom Exercise +
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Custom Exercises */}
              {customExercises.map((exercise: any) => (
                <div 
                  key={exercise.id}
                  className="group block p-6 rounded-2xl bg-white/10 backdrop-blur-sm 
                           hover:bg-white/20 transition-all duration-300 
                           border border-white/20 hover:border-white/30
                           shadow-lg hover:shadow-xl relative"
                >
                  <Link href={`/exercise/${exercise.id}`}>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between pr-20">
                        <h2 className="text-xl font-medium text-white group-hover:text-ocean-200 transition-colors">
                          {exercise.name}
                        </h2>
                        <span className="text-xs text-ocean-300 bg-ocean-500/20 px-2 py-1 rounded">Custom</span>
                      </div>
                      <p className="text-ocean-100/90 text-sm leading-relaxed">
                        {exercise.description}
                      </p>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-ocean-200">
                          {exercise.countType === 'rounds' ? `${exercise.defaultRounds} rounds` : `${exercise.timedDuration} minutes`}
                        </span>
                        <span className="inline-flex items-center text-ocean-200 group-hover:text-white text-sm font-medium">
                          Begin practice →
                        </span>
                      </div>
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-xs text-ocean-100">{exercise.benefits}</p>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Link
                      href={`/edit/${exercise.id}`}
                      className="p-2 bg-ocean-500/20 text-ocean-300 rounded-lg 
                               hover:bg-ocean-500/30 transition-colors"
                      aria-label="Edit exercise"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowDeleteDialog(exercise.id);
                      }}
                      className="p-2 bg-red-500/20 text-red-300 rounded-lg 
                               hover:bg-red-500/30 transition-colors"
                      aria-label="Delete exercise"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              {/* Built-in Exercises */}
              {breathingExercises.map((exercise) => (
                <Link 
                  href={`/exercise/${exercise.id}`}
                  key={exercise.id}
                  className="group block p-6 rounded-2xl bg-white/10 backdrop-blur-sm 
                           hover:bg-white/20 transition-all duration-300 
                           border border-white/20 hover:border-white/30
                           shadow-lg hover:shadow-xl"
                >
                  <div className="space-y-3">
                    <h2 className="text-xl font-medium text-white group-hover:text-ocean-200 transition-colors">
                      {exercise.name}
                    </h2>
                    <p className="text-ocean-100/90 text-sm leading-relaxed">
                      {exercise.description}
                    </p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs text-ocean-200">
                        {exercise.defaultRounds} rounds
                      </span>
                      <span className="inline-flex items-center text-ocean-200 group-hover:text-white text-sm font-medium">
                        Begin practice →
                      </span>
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-xs text-ocean-100">{exercise.benefits}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <BreathingHistory />
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
