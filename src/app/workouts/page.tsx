'use client';

import { useWorkoutData } from '@/hooks/useWorkoutData';
import WorkoutCard from '@/components/WorkoutCard';

export default function WorkoutsPage() {
  const { workouts, isLoading } = useWorkoutData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading workouts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Workout History
          </h1>
          <p className="text-gray-600">
            Track all your completed workouts
          </p>
        </div>

        {/* Workouts Grid */}
        {workouts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏃‍♂️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No workouts yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start your fitness journey by completing your first workout!
            </p>
            <a
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                workoutType={workout.type}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 