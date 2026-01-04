import { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { exerciseCatalog } from '../data/exercises'
import { defaultTemplates as prebuiltTemplates } from '../data/defaultTemplates'

const STORAGE_KEY = 'righttrack_data'

// Use the real ExerciseDB catalog
const defaultExercises = exerciseCatalog

// Days of the week
const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']


const defaultUser = {
  id: uuidv4(),
  name: '',
  createdAt: new Date().toISOString(),
}

const defaultWeeklySchedule = {
  monday: null,
  tuesday: null,
  wednesday: null,
  thursday: null,
  friday: null,
  saturday: null,
  sunday: null,
}

const buildDefaultSchedule = (templates) => {
  const byName = templates.reduce((acc, t) => {
    acc[t.name.toLowerCase()] = t.id
    return acc
  }, {})

  return {
    monday: byName['chest & shoulders'] || null,
    tuesday: byName['back'] || null,
    wednesday: byName['legs & arms'] || null,
    thursday: byName['push day'] || null,
    friday: byName['back + biceps'] || null,
    saturday: byName['upper'] || null,
    sunday: null,
  }
}

// Initialize default templates with IDs
const initializeDefaultTemplates = () => {
  return prebuiltTemplates.map(template => ({
    ...template,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    isDefault: true,
  }))
}

// Ensure any newly added default templates are present for existing users
const ensureDefaultTemplates = (existing = []) => {
  const nameSet = new Set(existing.map(t => t.name.toLowerCase()))
  const missing = prebuiltTemplates
    .filter(t => !nameSet.has(t.name.toLowerCase()))
    .map(t => ({
      ...t,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      isDefault: true,
    }))
  return [...existing, ...missing]
}

const getInitialData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      data.templates = ensureDefaultTemplates(data.templates || [])
      // Add weekly schedule if it doesn't exist (for existing users)
      if (!data.weeklySchedule) {
        data.weeklySchedule = buildDefaultSchedule(data.templates)
      }
      // Add default templates if user has no templates
      if (!data.templates || data.templates.length === 0) {
        data.templates = initializeDefaultTemplates()
        data.weeklySchedule = buildDefaultSchedule(data.templates)
      }
      return data
    }
  } catch (e) {
    console.error('Failed to load data from localStorage:', e)
  }
  
  const templates = initializeDefaultTemplates()
  const weeklySchedule = buildDefaultSchedule(templates)

  return {
    user: defaultUser,
    exercises: defaultExercises,
    templates,
    workoutLogs: [],
    currentWorkout: null,
    weeklySchedule,
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

  const updateSetValue = useCallback((exerciseIndex, setIndex, field, value) => {
    setData(prev => {
      if (!prev.currentWorkout) return prev
      const updatedExercises = [...prev.currentWorkout.exercises]
      const exercise = { ...updatedExercises[exerciseIndex] }
      const sets = [...exercise.sets]
      sets[setIndex] = { ...sets[setIndex], [field]: value }
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

  const updateExerciseNote = useCallback((exerciseIndex, note) => {
    setData(prev => {
      if (!prev.currentWorkout) return prev
      const updatedExercises = [...prev.currentWorkout.exercises]
      updatedExercises[exerciseIndex] = {
        ...updatedExercises[exerciseIndex],
        note,
      }
      return {
        ...prev,
        currentWorkout: {
          ...prev.currentWorkout,
          exercises: updatedExercises,
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

  // Weekly schedule functions
  const setDayTemplate = useCallback((day, templateId) => {
    setData(prev => ({
      ...prev,
      weeklySchedule: {
        ...prev.weeklySchedule,
        [day]: templateId
      }
    }))
  }, [])

  const getTodayTemplate = useCallback(() => {
    const today = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]
    const templateId = data.weeklySchedule[today]
    if (!templateId) return null
    return data.templates.find(t => t.id === templateId)
  }, [data.weeklySchedule, data.templates])

  const applyDefaultSchedule = useCallback(() => {
    setData(prev => {
      const mergedTemplates = ensureDefaultTemplates(prev.templates)
      return {
        ...prev,
        templates: mergedTemplates,
        weeklySchedule: buildDefaultSchedule(mergedTemplates)
      }
    })
  }, [])

  return {
    user: data.user,
    exercises: data.exercises,
    templates: data.templates,
    workoutLogs: data.workoutLogs,
    currentWorkout: data.currentWorkout,
    weeklySchedule: data.weeklySchedule,
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
    updateSetValue,
    updateExerciseNote,
    getWorkoutStats,
    setDayTemplate,
    getTodayTemplate,
    applyDefaultSchedule,
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
