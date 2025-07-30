'use client';

import { useWorkoutData } from '@/hooks/useWorkoutData';
import { calculateStreak, calculateLongestStreak } from '@/lib/utils';

export default function HealthDisplay() {
  const { workouts } = useWorkoutData();
  
  // Calculate current streak
  const workoutDates = workouts.map(w => w.completedAt);
  const currentStreak = calculateStreak(workoutDates);
  
  // Calculate longest streak
  const longestStreak = calculateLongestStreak(workoutDates);
  
  // Calculate streak percentage
  const streakPercentage = longestStreak > 0 ? (currentStreak / longestStreak) * 100 : 0;
  
  // Get streak emoji based on current streak
  const getStreakEmoji = (streak: number) => {
    if (streak === 0) return '🔥';
    if (streak < 7) return '🔥';
    if (streak < 30) return '🔥🔥';
    if (streak < 100) return '🔥🔥🔥';
    return '🔥🔥🔥🔥';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Streak
        </h2>
        <p className="text-gray-600">
          Keep the momentum going!
        </p>
      </div>

      <div className="space-y-6">
        {/* Current Streak Display */}
        <div className="text-center">
          <div className="text-6xl mb-2">
            {getStreakEmoji(currentStreak)}
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-1">
            {currentStreak}
          </div>
          <div className="text-lg text-gray-600">
            {currentStreak === 1 ? 'day' : 'days'} streak
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(streakPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(streakPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 text-center">
            {longestStreak > 0 && `Longest streak: ${longestStreak} days`}
          </div>
        </div>

        {/* Streak Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {workouts.length}
            </div>
            <div className="text-sm text-gray-600">
              Total Workouts
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {longestStreak}
            </div>
            <div className="text-sm text-gray-600">
              Best Streak
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="text-center pt-4 border-t border-gray-100">
          {currentStreak === 0 && (
            <p className="text-orange-600 font-medium">
              Start your fitness journey today!
            </p>
          )}
          {currentStreak > 0 && currentStreak < 7 && (
            <p className="text-blue-600 font-medium">
              Great start! Keep it up for a week!
            </p>
          )}
          {currentStreak >= 7 && currentStreak < 30 && (
            <p className="text-green-600 font-medium">
              Amazing! You're building a solid habit!
            </p>
          )}
          {currentStreak >= 30 && (
            <p className="text-purple-600 font-medium">
              Incredible! You're unstoppable! 🚀
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 