'use client';

import { useWorkoutData } from '@/hooks/useWorkoutData';
import { getStartOfWeek, getEndOfWeek, getDaysInMonth } from '@/lib/utils';

export default function ProgressStats() {
  const { workouts } = useWorkoutData();
  
  // Calculate current week stats
  const now = new Date();
  const weekStart = getStartOfWeek(now);
  const weekEnd = getEndOfWeek(now);
  
  const weekWorkouts = workouts.filter(w => 
    w.completedAt >= weekStart && w.completedAt <= weekEnd
  );
  
  const weekConsistency = Math.round((weekWorkouts.length / 7) * 100);
  
  // Calculate current month stats
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const daysInMonth = getDaysInMonth(now.getFullYear(), now.getMonth());
  
  const monthWorkouts = workouts.filter(w => 
    w.completedAt >= monthStart && w.completedAt <= monthEnd
  );
  
  const monthConsistency = Math.round((monthWorkouts.length / daysInMonth) * 100);
  
  // Calculate average workouts per week
  const totalWeeks = Math.ceil((now.getTime() - new Date(2024, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
  const avgWorkoutsPerWeek = totalWeeks > 0 ? Math.round(workouts.length / totalWeeks) : 0;
  
  // Calculate total duration
  const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
  const avgDuration = workouts.length > 0 ? Math.round(totalDuration / workouts.length) : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Progress Stats
        </h2>
        <p className="text-gray-600">
          Your consistency metrics
        </p>
      </div>

      <div className="space-y-6">
        {/* Weekly Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">This Week</h3>
            <span className="text-sm text-gray-600">
              {weekWorkouts.length}/7 days
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Consistency</span>
              <span>{weekConsistency}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${weekConsistency}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Monthly Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">This Month</h3>
            <span className="text-sm text-gray-600">
              {monthWorkouts.length}/{daysInMonth} days
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Consistency</span>
              <span>{monthConsistency}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${monthConsistency}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {avgWorkoutsPerWeek}
            </div>
            <div className="text-sm text-gray-600">
              Avg Workouts/Week
            </div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {avgDuration}m
            </div>
            <div className="text-sm text-gray-600">
              Avg Duration
            </div>
          </div>
        </div>

        {/* Weekly Breakdown */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Weekly Breakdown</h3>
          <div className="space-y-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const dayWorkouts = weekWorkouts.filter(w => {
                const dayOfWeek = w.completedAt.getDay();
                return dayOfWeek === (index + 1) % 7; // Adjust for Monday start
              });
              
              return (
                <div key={day} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 w-8">{day}</span>
                  <div className="flex-1 mx-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: dayWorkouts.length > 0 ? '100%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">
                    {dayWorkouts.length > 0 ? '✓' : ''}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Achievements</h3>
          <div className="flex flex-wrap gap-2">
            {weekConsistency >= 100 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                🏆 Perfect Week
              </span>
            )}
            {monthConsistency >= 80 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                🌟 Consistent Month
              </span>
            )}
            {workouts.length >= 50 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                💪 50 Workouts
              </span>
            )}
            {totalDuration >= 1000 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                ⏱️ 1000+ Minutes
              </span>
            )}
            {workouts.length === 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                🚀 Ready to Start
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 