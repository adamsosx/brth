'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import EditExerciseForm from '@/components/EditExerciseForm';

export default function EditExercisePage({ params }: { params: { id: string } }) {
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
        
        <h1 className="text-4xl font-light mb-3 text-white">Edit Exercise</h1>
        <p className="text-ocean-100/90 mb-8">Modify your custom breathing exercise settings.</p>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center 
                    border border-white/20">
          <EditExerciseForm exerciseId={params.id} />
        </div>
      </div>
    </main>
  );
} 