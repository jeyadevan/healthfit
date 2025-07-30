'use client';

import { useWorkoutData } from '@/hooks/useWorkoutData';
import { isToday, isYesterday, formatShortDate } from '@/lib/utils';

export default function ConsistencyGrid() {
  const { workouts } = useWorkoutData();
  
  // Generate last 365 days
  const generateDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    
    return days;
  };

  const days = generateDays();
  
  // Create a set of workout dates for quick lookup
  const workoutDates = new Set(
    workouts.map(w => w.completedAt.toDateString())
  );

  // Get intensity level for a day
  const getIntensityLevel = (date: Date) => {
    const dateString = date.toDateString();
    if (!workoutDates.has(dateString)) return 0;
    
    // Find workouts for this date
    const dayWorkouts = workouts.filter(w => 
      w.completedAt.toDateString() === dateString
    );
    
    // Calculate total duration for the day
    const totalDuration = dayWorkouts.reduce((sum, w) => sum + w.duration, 0);
    
    if (totalDuration >= 60) return 4; // High intensity
    if (totalDuration >= 45) return 3; // Medium-high
    if (totalDuration >= 30) return 2; // Medium
    return 1; // Low
  };

  // Get color class based on intensity
  const getColorClass = (intensity: number) => {
    switch (intensity) {
      case 0: return 'bg-gray-100';
      case 1: return 'bg-green-200';
      case 2: return 'bg-green-300';
      case 3: return 'bg-green-400';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-100';
    }
  };

  // Get tooltip content
  const getTooltipContent = (date: Date) => {
    const dateString = date.toDateString();
    const dayWorkouts = workouts.filter(w => 
      w.completedAt.toDateString() === dateString
    );
    
    if (dayWorkouts.length === 0) {
      return `No workout on ${formatShortDate(date)}`;
    }
    
    const totalDuration = dayWorkouts.reduce((sum, w) => sum + w.duration, 0);
    return `${dayWorkouts.length} workout${dayWorkouts.length > 1 ? 's' : ''} (${totalDuration} min) on ${formatShortDate(date)}`;
  };

  // Group days by weeks
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Workout History
        </h2>
        <p className="text-gray-600">
          Your consistency over the last year
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex space-x-1 min-w-max">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col space-y-1">
              {week.map((day, dayIndex) => {
                const intensity = getIntensityLevel(day);
                const isCurrentDay = isToday(day);
                const isYesterdayDay = isYesterday(day);
                
                return (
                  <div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-sm transition-all duration-200 cursor-pointer hover:scale-125 ${
                      getColorClass(intensity)
                    } ${
                      isCurrentDay ? 'ring-2 ring-blue-500' : ''
                    }`}
                    title={getTooltipContent(day)}
                  >
                    {isCurrentDay && (
                      <div className="w-full h-full bg-blue-500 rounded-sm"></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
        <span>Less</span>
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
        </div>
        <span>More</span>
      </div>

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {workouts.length}
            </div>
            <div className="text-xs text-gray-600">Total Workouts</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {Math.round((workoutDates.size / 365) * 100)}%
            </div>
            <div className="text-xs text-gray-600">Consistency</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {workouts.reduce((sum, w) => sum + w.duration, 0)}
            </div>
            <div className="text-xs text-gray-600">Total Minutes</div>
          </div>
        </div>
      </div>
    </div>
  );
} 