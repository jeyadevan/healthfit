'use client';

import { useState } from 'react';
import { WorkoutCategory } from '@/types';
import { useWorkoutData } from '@/hooks/useWorkoutData';

const workoutTypes = [
  { id: 'cardio', name: 'Cardio', category: WorkoutCategory.CARDIO, icon: '🏃‍♂️' },
  { id: 'strength', name: 'Strength Training', category: WorkoutCategory.STRENGTH, icon: '💪' },
  { id: 'flexibility', name: 'Flexibility', category: WorkoutCategory.FLEXIBILITY, icon: '🧘‍♀️' },
  { id: 'sports', name: 'Sports', category: WorkoutCategory.SPORTS, icon: '⚽' },
  { id: 'other', name: 'Other', category: WorkoutCategory.OTHER, icon: '🎯' },
];

export default function DailyCheckin() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [duration, setDuration] = useState<number>(30);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addWorkout, isTodayCompleted } = useWorkoutData();

  const handleSubmit = async () => {
    if (!selectedType) return;
    
    setIsSubmitting(true);
    try {
      const workoutType = workoutTypes.find(type => type.id === selectedType);
      if (!workoutType) return;

      await addWorkout({
        type: workoutType,
        duration,
        notes: notes.trim() || undefined,
        completedAt: new Date(),
      });

      // Reset form
      setSelectedType('');
      setDuration(30);
      setNotes('');
    } catch (error) {
      console.error('Error adding workout:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const todayCompleted = isTodayCompleted();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Daily Check-in
        </h2>
        <p className="text-gray-600">
          {todayCompleted 
            ? "Great job! You've already completed your workout today." 
            : "Mark your workout as complete to maintain your streak!"
          }
        </p>
      </div>

      {!todayCompleted && (
        <div className="space-y-6">
          {/* Workout Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Workout Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {workoutTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedType === type.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="text-sm font-medium">{type.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Duration (minutes)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setDuration(mins)}
                  className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    duration === mins
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How was your workout?"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!selectedType || isSubmitting}
            className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition-all duration-200 ${
              selectedType && !isSubmitting
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Marking Complete...
              </div>
            ) : (
              'Mark Workout Complete'
            )}
          </button>
        </div>
      )}

      {todayCompleted && (
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <p className="text-green-600 font-semibold">
            Workout completed for today!
          </p>
        </div>
      )}
    </div>
  );
} 