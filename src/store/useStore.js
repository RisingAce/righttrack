import { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'righttrack_data'

const defaultExercises = [
  // Chest
  { id: 'bench-press', name: 'Bench Press', category: 'chest', equipment: 'barbell', alternatives: ['dumbbell-press', 'push-ups', 'cable-fly'] },
  { id: 'dumbbell-press', name: 'Dumbbell Press', category: 'chest', equipment: 'dumbbells', alternatives: ['bench-press', 'push-ups', 'machine-press'] },
  { id: 'incline-press', name: 'Incline Press', category: 'chest', equipment: 'barbell', alternatives: ['incline-dumbbell', 'cable-fly-high'] },
  { id: 'push-ups', name: 'Push-Ups', category: 'chest', equipment: 'bodyweight', alternatives: ['bench-press', 'dumbbell-press'] },
  { id: 'cable-fly', name: 'Cable Fly', category: 'chest', equipment: 'cable', alternatives: ['dumbbell-fly', 'pec-deck'] },
  
  // Back
  { id: 'deadlift', name: 'Deadlift', category: 'back', equipment: 'barbell', alternatives: ['romanian-deadlift', 'rack-pull'] },
  { id: 'barbell-row', name: 'Barbell Row', category: 'back', equipment: 'barbell', alternatives: ['dumbbell-row', 'cable-row'] },
  { id: 'lat-pulldown', name: 'Lat Pulldown', category: 'back', equipment: 'cable', alternatives: ['pull-ups', 'assisted-pullup'] },
  { id: 'pull-ups', name: 'Pull-Ups', category: 'back', equipment: 'bodyweight', alternatives: ['lat-pulldown', 'assisted-pullup'] },
  { id: 'dumbbell-row', name: 'Dumbbell Row', category: 'back', equipment: 'dumbbells', alternatives: ['barbell-row', 'cable-row'] },
  { id: 'cable-row', name: 'Seated Cable Row', category: 'back', equipment: 'cable', alternatives: ['barbell-row', 'dumbbell-row'] },
  
  // Shoulders
  { id: 'overhead-press', name: 'Overhead Press', category: 'shoulders', equipment: 'barbell', alternatives: ['dumbbell-shoulder', 'machine-press'] },
  { id: 'dumbbell-shoulder', name: 'Dumbbell Shoulder Press', category: 'shoulders', equipment: 'dumbbells', alternatives: ['overhead-press', 'arnold-press'] },
  { id: 'lateral-raise', name: 'Lateral Raise', category: 'shoulders', equipment: 'dumbbells', alternatives: ['cable-lateral', 'machine-lateral'] },
  { id: 'face-pull', name: 'Face Pull', category: 'shoulders', equipment: 'cable', alternatives: ['reverse-fly', 'band-pull-apart'] },
  { id: 'reverse-fly', name: 'Reverse Fly', category: 'shoulders', equipment: 'dumbbells', alternatives: ['face-pull', 'cable-rear-delt'] },
  
  // Legs
  { id: 'squat', name: 'Barbell Squat', category: 'legs', equipment: 'barbell', alternatives: ['leg-press', 'goblet-squat', 'hack-squat'] },
  { id: 'leg-press', name: 'Leg Press', category: 'legs', equipment: 'machine', alternatives: ['squat', 'goblet-squat'] },
  { id: 'romanian-deadlift', name: 'Romanian Deadlift', category: 'legs', equipment: 'barbell', alternatives: ['leg-curl', 'dumbbell-rdl'] },
  { id: 'leg-curl', name: 'Leg Curl', category: 'legs', equipment: 'machine', alternatives: ['romanian-deadlift', 'nordic-curl'] },
  { id: 'leg-extension', name: 'Leg Extension', category: 'legs', equipment: 'machine', alternatives: ['sissy-squat', 'split-squat'] },
  { id: 'calf-raise', name: 'Calf Raise', category: 'legs', equipment: 'machine', alternatives: ['standing-calf', 'seated-calf'] },
  { id: 'lunges', name: 'Lunges', category: 'legs', equipment: 'dumbbells', alternatives: ['split-squat', 'step-ups'] },
  
  // Arms
  { id: 'barbell-curl', name: 'Barbell Curl', category: 'arms', equipment: 'barbell', alternatives: ['dumbbell-curl', 'cable-curl'] },
  { id: 'dumbbell-curl', name: 'Dumbbell Curl', category: 'arms', equipment: 'dumbbells', alternatives: ['barbell-curl', 'hammer-curl'] },
  { id: 'hammer-curl', name: 'Hammer Curl', category: 'arms', equipment: 'dumbbells', alternatives: ['dumbbell-curl', 'rope-curl'] },
  { id: 'tricep-pushdown', name: 'Tricep Pushdown', category: 'arms', equipment: 'cable', alternatives: ['skull-crusher', 'dips'] },
  { id: 'skull-crusher', name: 'Skull Crusher', category: 'arms', equipment: 'barbell', alternatives: ['tricep-pushdown', 'overhead-tricep'] },
  { id: 'dips', name: 'Dips', category: 'arms', equipment: 'bodyweight', alternatives: ['tricep-pushdown', 'close-grip-bench'] },
  
  // Core
  { id: 'plank', name: 'Plank', category: 'core', equipment: 'bodyweight', alternatives: ['dead-bug', 'hollow-hold'] },
  { id: 'hanging-leg-raise', name: 'Hanging Leg Raise', category: 'core', equipment: 'bodyweight', alternatives: ['lying-leg-raise', 'cable-crunch'] },
  { id: 'cable-crunch', name: 'Cable Crunch', category: 'core', equipment: 'cable', alternatives: ['weighted-crunch', 'ab-wheel'] },
  { id: 'russian-twist', name: 'Russian Twist', category: 'core', equipment: 'dumbbells', alternatives: ['woodchop', 'pallof-press'] },
]

const defaultUser = {
  id: uuidv4(),
  name: '',
  createdAt: new Date().toISOString(),
}

const getInitialData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to load data from localStorage:', e)
  }
  
  return {
    user: defaultUser,
    exercises: defaultExercises,
    templates: [],
    workoutLogs: [],
    currentWorkout: null,
  }
}

export const useStore = () => {
  const [data, setData] = useState(getInitialData)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (e) {
      console.error('Failed to save data to localStorage:', e)
    }
  }, [data])

  // User functions
  const updateUser = useCallback((updates) => {
    setData(prev => ({
      ...prev,
      user: { ...prev.user, ...updates }
    }))
  }, [])

  // Template functions
  const createTemplate = useCallback((template) => {
    const newTemplate = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...template,
    }
    setData(prev => ({
      ...prev,
      templates: [...prev.templates, newTemplate]
    }))
    return newTemplate
  }, [])

  const updateTemplate = useCallback((id, updates) => {
    setData(prev => ({
      ...prev,
      templates: prev.templates.map(t => 
        t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
      )
    }))
  }, [])

  const deleteTemplate = useCallback((id) => {
    setData(prev => ({
      ...prev,
      templates: prev.templates.filter(t => t.id !== id)
    }))
  }, [])

  // Workout session functions
  const startWorkout = useCallback((templateId) => {
    const template = data.templates.find(t => t.id === templateId)
    if (!template) return null

    const workout = {
      id: uuidv4(),
      templateId,
      templateName: template.name,
      startedAt: new Date().toISOString(),
      exercises: template.exercises.map(ex => ({
        ...ex,
        exerciseId: ex.exerciseId,
        sets: ex.sets.map(set => ({
          ...set,
          completed: false,
          actualReps: null,
          actualWeight: null,
        }))
      })),
      completed: false,
    }

    setData(prev => ({
      ...prev,
      currentWorkout: workout
    }))

    return workout
  }, [data.templates])

  const updateCurrentWorkout = useCallback((updates) => {
    setData(prev => ({
      ...prev,
      currentWorkout: prev.currentWorkout ? { ...prev.currentWorkout, ...updates } : null
    }))
  }, [])

  const completeSet = useCallback((exerciseIndex, setIndex, actualReps, actualWeight) => {
    setData(prev => {
      if (!prev.currentWorkout) return prev

      const updatedExercises = [...prev.currentWorkout.exercises]
      const exercise = { ...updatedExercises[exerciseIndex] }
      const sets = [...exercise.sets]
      
      sets[setIndex] = {
        ...sets[setIndex],
        completed: true,
        actualReps,
        actualWeight,
        completedAt: new Date().toISOString(),
      }
      
      exercise.sets = sets
      updatedExercises[exerciseIndex] = exercise

      return {
        ...prev,
        currentWorkout: {
          ...prev.currentWorkout,
          exercises: updatedExercises
        }
      }
    })
  }, [])

  const swapExercise = useCallback((exerciseIndex, newExerciseId) => {
    setData(prev => {
      if (!prev.currentWorkout) return prev

      const newExercise = prev.exercises.find(e => e.id === newExerciseId)
      if (!newExercise) return prev

      const updatedExercises = [...prev.currentWorkout.exercises]
      const currentEx = updatedExercises[exerciseIndex]
      
      updatedExercises[exerciseIndex] = {
        ...currentEx,
        exerciseId: newExerciseId,
        swappedFrom: currentEx.exerciseId,
        exerciseName: newExercise.name,
      }

      return {
        ...prev,
        currentWorkout: {
          ...prev.currentWorkout,
          exercises: updatedExercises
        }
      }
    })
  }, [])

  const finishWorkout = useCallback(() => {
    setData(prev => {
      if (!prev.currentWorkout) return prev

      const completedWorkout = {
        ...prev.currentWorkout,
        completed: true,
        finishedAt: new Date().toISOString(),
      }

      return {
        ...prev,
        workoutLogs: [...prev.workoutLogs, completedWorkout],
        currentWorkout: null,
      }
    })
  }, [])

  const cancelWorkout = useCallback(() => {
    setData(prev => ({
      ...prev,
      currentWorkout: null
    }))
  }, [])

  // Exercise lookup
  const getExercise = useCallback((id) => {
    return data.exercises.find(e => e.id === id)
  }, [data.exercises])

  const getAlternatives = useCallback((exerciseId) => {
    const exercise = data.exercises.find(e => e.id === exerciseId)
    if (!exercise) return []
    return exercise.alternatives
      .map(altId => data.exercises.find(e => e.id === altId))
      .filter(Boolean)
  }, [data.exercises])

  // Stats
  const getWorkoutStats = useCallback(() => {
    const logs = data.workoutLogs
    const totalWorkouts = logs.length
    const thisWeek = logs.filter(l => {
      const date = new Date(l.startedAt)
      const now = new Date()
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      return date >= weekAgo
    }).length

    const totalSets = logs.reduce((acc, log) => {
      return acc + log.exercises.reduce((exAcc, ex) => {
        return exAcc + ex.sets.filter(s => s.completed).length
      }, 0)
    }, 0)

    const streak = calculateStreak(logs)

    return { totalWorkouts, thisWeek, totalSets, streak }
  }, [data.workoutLogs])

  return {
    user: data.user,
    exercises: data.exercises,
    templates: data.templates,
    workoutLogs: data.workoutLogs,
    currentWorkout: data.currentWorkout,
    updateUser,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    startWorkout,
    updateCurrentWorkout,
    completeSet,
    swapExercise,
    finishWorkout,
    cancelWorkout,
    getExercise,
    getAlternatives,
    getWorkoutStats,
  }
}

function calculateStreak(logs) {
  if (logs.length === 0) return 0
  
  const sortedLogs = [...logs].sort((a, b) => 
    new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
  )

  let streak = 0
  let currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  for (const log of sortedLogs) {
    const logDate = new Date(log.startedAt)
    logDate.setHours(0, 0, 0, 0)
    
    const diffDays = Math.floor((currentDate.getTime() - logDate.getTime()) / (24 * 60 * 60 * 1000))
    
    if (diffDays <= 1) {
      streak++
      currentDate = logDate
    } else {
      break
    }
  }

  return streak
}

export default useStore
