'use client';

import { useState, useEffect } from 'react';

interface HistoryEntry {
  id: string;
  exerciseName: string;
  timestamp: string;
  duration: number;
  rounds?: number;
}

export default function BreathingHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('breathingHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  if (history.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-ocean-100 text-lg">No breathing exercises completed yet.</p>
        <p className="text-ocean-200 mt-2">Complete an exercise to see your history here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((entry) => (
        <div
          key={entry.id}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-white">{entry.exerciseName}</h3>
              <p className="text-ocean-200 text-sm">
                {new Date(entry.timestamp).toLocaleDateString()} at{' '}
                {new Date(entry.timestamp).toLocaleTimeString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-ocean-100">
                {entry.rounds ? `${entry.rounds} rounds` : `${entry.duration} minutes`}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 