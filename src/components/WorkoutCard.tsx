import { Workout, WorkoutType } from '@/types';
import { formatDate, formatDuration } from '@/lib/utils';

interface WorkoutCardProps {
  workout: Workout;
  workoutType: WorkoutType;
}

export default function WorkoutCard({ workout, workoutType }: WorkoutCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {workoutType.name}
          </h3>
          <p className="text-sm text-gray-500">
            {formatDate(workout.completedAt)}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {workoutType.category}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Duration</span>
          <span className="text-sm font-medium text-gray-900">
            {formatDuration(workout.duration)}
          </span>
        </div>
        
        {workout.caloriesBurned && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Calories Burned</span>
            <span className="text-sm font-medium text-gray-900">
              {workout.caloriesBurned} cal
            </span>
          </div>
        )}
        
        {workout.notes && (
          <div className="pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-600">{workout.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
} 