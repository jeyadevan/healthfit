export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  profileImage?: string;
}

export interface Workout {
  id: string;
  userId: string;
  type: WorkoutType;
  duration: number; // in minutes
  caloriesBurned?: number;
  notes?: string;
  completedAt: Date;
  createdAt: Date;
}

export interface WorkoutType {
  id: string;
  name: string;
  category: WorkoutCategory;
  description?: string;
  icon?: string;
}

export enum WorkoutCategory {
  CARDIO = 'cardio',
  STRENGTH = 'strength',
  FLEXIBILITY = 'flexibility',
  SPORTS = 'sports',
  OTHER = 'other'
}

export interface WorkoutStreak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastWorkoutDate: Date;
  streakStartDate: Date;
}

export interface ProgressStats {
  userId: string;
  totalWorkouts: number;
  totalDuration: number; // in minutes
  averageWorkoutsPerWeek: number;
  currentWeekWorkouts: number;
  monthlyGoal?: number;
  monthlyProgress?: number;
}

export interface WorkoutGoal {
  id: string;
  userId: string;
  type: 'weekly' | 'monthly' | 'yearly';
  target: number; // number of workouts
  current: number;
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
}

// New types for the components
export interface WorkoutData {
  id: string;
  type: WorkoutType;
  duration: number;
  caloriesBurned?: number;
  notes?: string;
  completedAt: Date;
  createdAt: Date;
}

export interface AddWorkoutParams {
  type: WorkoutType;
  duration: number;
  caloriesBurned?: number;
  notes?: string;
  completedAt: Date;
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalDuration: number;
  avgDuration: number;
  uniqueDays: number;
}

export interface ConsistencyData {
  weekConsistency: number;
  monthConsistency: number;
  avgWorkoutsPerWeek: number;
  currentStreak: number;
  longestStreak: number;
}

export interface DayWorkoutData {
  date: Date;
  workouts: WorkoutData[];
  totalDuration: number;
  intensity: number; // 0-4 scale
} 