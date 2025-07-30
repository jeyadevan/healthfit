'use client';

import { useState, useEffect, useCallback } from 'react';
import { Workout, WorkoutType } from '@/types';

const STORAGE_KEY = 'healthfit_workouts';

interface WorkoutData {
  id: string;
  type: WorkoutType;
  duration: number;
  caloriesBurned?: number;
  notes?: string;
  completedAt: Date;
  createdAt: Date;
}

interface AddWorkoutParams {
  type: WorkoutType;
  duration: number;
  caloriesBurned?: number;
  notes?: string;
  completedAt: Date;
}

export function useWorkoutData() {
  const [workouts, setWorkouts] = useState<WorkoutData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load workouts from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const workoutsWithDates = parsed.map((workout: any) => ({
          ...workout,
          completedAt: new Date(workout.completedAt),
          createdAt: new Date(workout.createdAt),
        }));
        setWorkouts(workoutsWithDates);
      }
    } catch (error) {
      console.error('Error loading workouts from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save workouts to localStorage whenever workouts change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
      } catch (error) {
        console.error('Error saving workouts to localStorage:', error);
      }
    }
  }, [workouts, isLoading]);

  // Add a new workout
  const addWorkout = useCallback(async (params: AddWorkoutParams) => {
    const newWorkout: WorkoutData = {
      id: crypto.randomUUID(),
      ...params,
      createdAt: new Date(),
    };

    setWorkouts(prev => [newWorkout, ...prev]);
    return newWorkout;
  }, []);

  // Delete a workout
  const deleteWorkout = useCallback((id: string) => {
    setWorkouts(prev => prev.filter(workout => workout.id !== id));
  }, []);

  // Update a workout
  const updateWorkout = useCallback((id: string, updates: Partial<WorkoutData>) => {
    setWorkouts(prev => prev.map(workout => 
      workout.id === id ? { ...workout, ...updates } : workout
    ));
  }, []);

  // Get workouts for a specific date range
  const getWorkoutsInRange = useCallback((startDate: Date, endDate: Date) => {
    return workouts.filter(workout => 
      workout.completedAt >= startDate && workout.completedAt <= endDate
    );
  }, [workouts]);

  // Get workouts for today
  const getTodayWorkouts = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return workouts.filter(workout => 
      workout.completedAt >= today && workout.completedAt < tomorrow
    );
  }, [workouts]);

  // Check if today's workout is completed
  const isTodayCompleted = useCallback(() => {
    return getTodayWorkouts().length > 0;
  }, [getTodayWorkouts]);

  // Get workout statistics
  const getStats = useCallback(() => {
    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
    const avgDuration = totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;
    
    // Calculate unique workout days
    const uniqueDays = new Set(
      workouts.map(w => w.completedAt.toDateString())
    ).size;

    return {
      totalWorkouts,
      totalDuration,
      avgDuration,
      uniqueDays,
    };
  }, [workouts]);

  // Clear all workouts (for testing/reset)
  const clearAllWorkouts = useCallback(() => {
    setWorkouts([]);
  }, []);

  return {
    workouts,
    isLoading,
    addWorkout,
    deleteWorkout,
    updateWorkout,
    getWorkoutsInRange,
    getTodayWorkouts,
    isTodayCompleted,
    getStats,
    clearAllWorkouts,
  };
} 