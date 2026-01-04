// Pre-built workout templates for quick start

export const defaultTemplates = [
  {
    name: 'Push Day',
    description: 'Chest, shoulders, and triceps workout',
    isDefault: true,
    exercises: [
      {
        exerciseId: '0025',
        exerciseName: 'barbell bench press',
        sets: [
          { reps: 8, weight: 60, type: 'warmup' },
          { reps: 6, weight: 80, type: 'working' },
          { reps: 6, weight: 80, type: 'working' },
          { reps: 6, weight: 80, type: 'working' },
        ]
      },
      {
        exerciseId: '0033',
        exerciseName: 'barbell incline bench press',
        sets: [
          { reps: 8, weight: 50, type: 'working' },
          { reps: 8, weight: 50, type: 'working' },
          { reps: 8, weight: 50, type: 'working' },
        ]
      },
      {
        exerciseId: '0310',
        exerciseName: 'dumbbell shoulder press',
        sets: [
          { reps: 10, weight: 20, type: 'working' },
          { reps: 10, weight: 20, type: 'working' },
          { reps: 10, weight: 20, type: 'working' },
        ]
      },
      {
        exerciseId: '0292',
        exerciseName: 'dumbbell lateral raise',
        sets: [
          { reps: 12, weight: 10, type: 'working' },
          { reps: 12, weight: 10, type: 'working' },
          { reps: 12, weight: 10, type: 'working' },
        ]
      },
      {
        exerciseId: '0124',
        exerciseName: 'cable triceps pushdown',
        sets: [
          { reps: 12, weight: 30, type: 'working' },
          { reps: 12, weight: 30, type: 'working' },
          { reps: 12, weight: 30, type: 'working' },
        ]
      },
    ]
  },
  {
    name: 'Pull Day',
    description: 'Back and biceps workout',
    isDefault: true,
    exercises: [
      {
        exerciseId: '0032',
        exerciseName: 'barbell deadlift',
        sets: [
          { reps: 5, weight: 100, type: 'working' },
          { reps: 5, weight: 100, type: 'working' },
          { reps: 5, weight: 100, type: 'working' },
        ]
      },
      {
        exerciseId: '0696',
        exerciseName: 'lat pulldown',
        sets: [
          { reps: 10, weight: 50, type: 'working' },
          { reps: 10, weight: 50, type: 'working' },
          { reps: 10, weight: 50, type: 'working' },
        ]
      },
      {
        exerciseId: '0046',
        exerciseName: 'barbell bent over row',
        sets: [
          { reps: 8, weight: 60, type: 'working' },
          { reps: 8, weight: 60, type: 'working' },
          { reps: 8, weight: 60, type: 'working' },
        ]
      },
      {
        exerciseId: '0297',
        exerciseName: 'dumbbell bent over row',
        sets: [
          { reps: 10, weight: 25, type: 'working' },
          { reps: 10, weight: 25, type: 'working' },
        ]
      },
      {
        exerciseId: '0023',
        exerciseName: 'barbell curl',
        sets: [
          { reps: 10, weight: 30, type: 'working' },
          { reps: 10, weight: 30, type: 'working' },
          { reps: 10, weight: 30, type: 'working' },
        ]
      },
      {
        exerciseId: '0286',
        exerciseName: 'dumbbell hammer curl',
        sets: [
          { reps: 12, weight: 15, type: 'working' },
          { reps: 12, weight: 15, type: 'working' },
        ]
      },
    ]
  },
  {
    name: 'Leg Day',
    description: 'Complete lower body workout',
    isDefault: true,
    exercises: [
      {
        exerciseId: '0043',
        exerciseName: 'barbell squat',
        sets: [
          { reps: 10, weight: 60, type: 'warmup' },
          { reps: 6, weight: 100, type: 'working' },
          { reps: 6, weight: 100, type: 'working' },
          { reps: 6, weight: 100, type: 'working' },
        ]
      },
      {
        exerciseId: '0035',
        exerciseName: 'barbell romanian deadlift',
        sets: [
          { reps: 10, weight: 60, type: 'working' },
          { reps: 10, weight: 60, type: 'working' },
          { reps: 10, weight: 60, type: 'working' },
        ]
      },
      {
        exerciseId: '0549',
        exerciseName: 'leg press',
        sets: [
          { reps: 12, weight: 120, type: 'working' },
          { reps: 12, weight: 120, type: 'working' },
          { reps: 12, weight: 120, type: 'working' },
        ]
      },
      {
        exerciseId: '0558',
        exerciseName: 'leg curl',
        sets: [
          { reps: 12, weight: 40, type: 'working' },
          { reps: 12, weight: 40, type: 'working' },
          { reps: 12, weight: 40, type: 'working' },
        ]
      },
      {
        exerciseId: '0872',
        exerciseName: 'calf raise',
        sets: [
          { reps: 15, weight: 0, type: 'working' },
          { reps: 15, weight: 0, type: 'working' },
          { reps: 15, weight: 0, type: 'working' },
        ]
      },
    ]
  },
  {
    name: 'Upper Body',
    description: 'Chest, back, shoulders, and arms',
    isDefault: true,
    exercises: [
      {
        exerciseId: '0025',
        exerciseName: 'barbell bench press',
        sets: [
          { reps: 8, weight: 60, type: 'working' },
          { reps: 8, weight: 60, type: 'working' },
          { reps: 8, weight: 60, type: 'working' },
        ]
      },
      {
        exerciseId: '0046',
        exerciseName: 'barbell bent over row',
        sets: [
          { reps: 8, weight: 60, type: 'working' },
          { reps: 8, weight: 60, type: 'working' },
          { reps: 8, weight: 60, type: 'working' },
        ]
      },
      {
        exerciseId: '0310',
        exerciseName: 'dumbbell shoulder press',
        sets: [
          { reps: 10, weight: 20, type: 'working' },
          { reps: 10, weight: 20, type: 'working' },
          { reps: 10, weight: 20, type: 'working' },
        ]
      },
      {
        exerciseId: '0023',
        exerciseName: 'barbell curl',
        sets: [
          { reps: 10, weight: 30, type: 'working' },
          { reps: 10, weight: 30, type: 'working' },
        ]
      },
      {
        exerciseId: '0124',
        exerciseName: 'cable triceps pushdown',
        sets: [
          { reps: 12, weight: 30, type: 'working' },
          { reps: 12, weight: 30, type: 'working' },
        ]
      },
    ]
  },
  {
    name: 'Lower Body',
    description: 'Legs and core',
    isDefault: true,
    exercises: [
      {
        exerciseId: '0043',
        exerciseName: 'barbell squat',
        sets: [
          { reps: 8, weight: 80, type: 'working' },
          { reps: 8, weight: 80, type: 'working' },
          { reps: 8, weight: 80, type: 'working' },
        ]
      },
      {
        exerciseId: '0035',
        exerciseName: 'barbell romanian deadlift',
        sets: [
          { reps: 10, weight: 60, type: 'working' },
          { reps: 10, weight: 60, type: 'working' },
          { reps: 10, weight: 60, type: 'working' },
        ]
      },
      {
        exerciseId: '0341',
        exerciseName: 'dumbbell lunge',
        sets: [
          { reps: 12, weight: 20, type: 'working' },
          { reps: 12, weight: 20, type: 'working' },
        ]
      },
      {
        exerciseId: '0872',
        exerciseName: 'calf raise',
        sets: [
          { reps: 15, weight: 0, type: 'working' },
          { reps: 15, weight: 0, type: 'working' },
          { reps: 15, weight: 0, type: 'working' },
        ]
      },
      {
        exerciseId: '0001',
        exerciseName: 'plank',
        sets: [
          { reps: 60, weight: 0, type: 'working' },
          { reps: 60, weight: 0, type: 'working' },
        ]
      },
    ]
  },
  {
    name: 'Full Body Strength',
    description: 'Complete workout hitting all major muscle groups',
    isDefault: true,
    exercises: [
      {
        exerciseId: '0043',
        exerciseName: 'barbell squat',
        sets: [
          { reps: 8, weight: 80, type: 'working' },
          { reps: 8, weight: 80, type: 'working' },
          { reps: 8, weight: 80, type: 'working' },
        ]
      },
      {
        exerciseId: '0025',
        exerciseName: 'barbell bench press',
        sets: [
          { reps: 8, weight: 60, type: 'working' },
          { reps: 8, weight: 60, type: 'working' },
          { reps: 8, weight: 60, type: 'working' },
        ]
      },
      {
        exerciseId: '0046',
        exerciseName: 'barbell bent over row',
        sets: [
          { reps: 8, weight: 60, type: 'working' },
          { reps: 8, weight: 60, type: 'working' },
          { reps: 8, weight: 60, type: 'working' },
        ]
      },
      {
        exerciseId: '0310',
        exerciseName: 'dumbbell shoulder press',
        sets: [
          { reps: 10, weight: 20, type: 'working' },
          { reps: 10, weight: 20, type: 'working' },
        ]
      },
      {
        exerciseId: '0023',
        exerciseName: 'barbell curl',
        sets: [
          { reps: 10, weight: 30, type: 'working' },
          { reps: 10, weight: 30, type: 'working' },
        ]
      },
      {
        exerciseId: '0124',
        exerciseName: 'cable triceps pushdown',
        sets: [
          { reps: 12, weight: 30, type: 'working' },
          { reps: 12, weight: 30, type: 'working' },
        ]
      },
    ]
  },
  {
    name: 'Quick 30min',
    description: 'Time-efficient full body workout',
    isDefault: true,
    exercises: [
      {
        exerciseId: '0043',
        exerciseName: 'barbell squat',
        sets: [
          { reps: 10, weight: 80, type: 'working' },
          { reps: 10, weight: 80, type: 'working' },
        ]
      },
      {
        exerciseId: '0662',
        exerciseName: 'push-up',
        sets: [
          { reps: 15, weight: 0, type: 'working' },
          { reps: 15, weight: 0, type: 'working' },
          { reps: 15, weight: 0, type: 'working' },
        ]
      },
      {
        exerciseId: '0609',
        exerciseName: 'pull-up',
        sets: [
          { reps: 8, weight: 0, type: 'working' },
          { reps: 8, weight: 0, type: 'working' },
          { reps: 8, weight: 0, type: 'working' },
        ]
      },
      {
        exerciseId: '0001',
        exerciseName: 'plank',
        sets: [
          { reps: 60, weight: 0, type: 'working' },
          { reps: 60, weight: 0, type: 'working' },
        ]
      },
    ]
  },
  {
    name: 'Chest & Shoulders Split',
    description: 'Bench-focused chest with delt accessories',
    isDefault: true,
    exercises: [
      {
        exerciseId: '0025',
        exerciseName: 'barbell bench press',
        sets: [
          { reps: 4, weight: 60, type: 'working' },
          { reps: 4, weight: 60, type: 'working' },
          { reps: 4, weight: 60, type: 'working' },
        ]
      },
      {
        exerciseId: '0301',
        exerciseName: 'dumbbell incline press',
        sets: [
          { reps: 10, weight: 20, type: 'working' },
          { reps: 10, weight: 20, type: 'working' },
          { reps: 10, weight: 20, type: 'working' },
        ]
      },
      {
        exerciseId: '1301',
        exerciseName: 'cable fly',
        sets: [
          { reps: 10, weight: 15, type: 'working' },
          { reps: 10, weight: 15, type: 'working' },
          { reps: 10, weight: 15, type: 'working' },
        ]
      },
      {
        exerciseId: '0033',
        exerciseName: 'barbell incline bench press',
        sets: [
          { reps: 10, weight: 50, type: 'working' },
          { reps: 10, weight: 50, type: 'working' },
          { reps: 10, weight: 50, type: 'working' },
        ]
      },
      {
        exerciseId: '0310',
        exerciseName: 'dumbbell shoulder press',
        sets: [
          { reps: 5, weight: 20, type: 'working' },
          { reps: 5, weight: 20, type: 'working' },
          { reps: 5, weight: 20, type: 'working' },
        ]
      },
      {
        exerciseId: '0292',
        exerciseName: 'dumbbell lateral raise',
        sets: [
          { reps: 10, weight: 10, type: 'working' },
          { reps: 10, weight: 10, type: 'working' },
          { reps: 10, weight: 10, type: 'working' },
        ]
      },
      {
        exerciseId: '0555',
        exerciseName: 'barbell overhead press',
        sets: [
          { reps: 10, weight: 30, type: 'working' },
          { reps: 10, weight: 30, type: 'working' },
          { reps: 10, weight: 30, type: 'working' },
        ]
      },
      {
        exerciseId: '0148',
        exerciseName: 'cable rear delt fly',
        sets: [
          { reps: 10, weight: 10, type: 'working' },
          { reps: 10, weight: 10, type: 'working' },
          { reps: 10, weight: 10, type: 'working' },
        ]
      },
    ]
  },
  {
    name: 'Back Strength',
    description: 'Deadlift-first back session with rows and pulldowns',
    isDefault: true,
    exercises: [
      {
        exerciseId: '0032',
        exerciseName: 'barbell deadlift',
        sets: [
          { reps: 4, weight: 100, type: 'working' },
          { reps: 4, weight: 100, type: 'working' },
          { reps: 4, weight: 100, type: 'working' },
        ]
      },
      {
        exerciseId: '0035',
        exerciseName: 'barbell romanian deadlift',
        sets: [
          { reps: 10, weight: 60, type: 'working' },
          { reps: 10, weight: 60, type: 'working' },
          { reps: 10, weight: 60, type: 'working' },
        ]
      },
      {
        exerciseId: '0297',
        exerciseName: 'dumbbell bent over row',
        sets: [
          { reps: 10, weight: 25, type: 'working' },
          { reps: 10, weight: 25, type: 'working' },
          { reps: 10, weight: 25, type: 'working' },
        ]
      },
      {
        exerciseId: '0696',
        exerciseName: 'lat pulldown',
        sets: [
          { reps: 10, weight: 50, type: 'working' },
          { reps: 10, weight: 50, type: 'working' },
          { reps: 10, weight: 50, type: 'working' },
        ]
      },
      {
        exerciseId: '0144',
        exerciseName: 'cable seated row',
        sets: [
          { reps: 10, weight: 45, type: 'working' },
          { reps: 10, weight: 45, type: 'working' },
          { reps: 10, weight: 45, type: 'working' },
        ]
      },
      {
        exerciseId: '0148',
        exerciseName: 'cable rear delt fly',
        sets: [
          { reps: 10, weight: 10, type: 'working' },
          { reps: 10, weight: 10, type: 'working' },
          { reps: 10, weight: 10, type: 'working' },
        ]
      },
    ]
  },
  {
    name: 'Legs & Arms',
    description: 'Squat-led day with curls and pushdowns',
    isDefault: true,
    exercises: [
      {
        exerciseId: '0043',
        exerciseName: 'barbell squat',
        sets: [
          { reps: 4, weight: 100, type: 'working' },
          { reps: 4, weight: 100, type: 'working' },
          { reps: 4, weight: 100, type: 'working' },
        ]
      },
      {
        exerciseId: '0549',
        exerciseName: 'leg press',
        sets: [
          { reps: 10, weight: 120, type: 'working' },
          { reps: 10, weight: 120, type: 'working' },
          { reps: 10, weight: 120, type: 'working' },
        ]
      },
      {
        exerciseId: '0558',
        exerciseName: 'leg curl',
        sets: [
          { reps: 10, weight: 40, type: 'working' },
          { reps: 10, weight: 40, type: 'working' },
          { reps: 10, weight: 40, type: 'working' },
        ]
      },
      {
        exerciseId: '0341',
        exerciseName: 'dumbbell lunge',
        sets: [
          { reps: 10, weight: 20, type: 'working' },
          { reps: 10, weight: 20, type: 'working' },
          { reps: 10, weight: 20, type: 'working' },
        ]
      },
      {
        exerciseId: '0872',
        exerciseName: 'calf raise',
        sets: [
          { reps: 10, weight: 0, type: 'working' },
          { reps: 10, weight: 0, type: 'working' },
          { reps: 10, weight: 0, type: 'working' },
        ]
      },
      {
        exerciseId: '0023',
        exerciseName: 'barbell curl',
        sets: [
          { reps: 10, weight: 30, type: 'working' },
          { reps: 10, weight: 30, type: 'working' },
          { reps: 10, weight: 30, type: 'working' },
        ]
      },
      {
        exerciseId: '0138',
        exerciseName: 'cable curl',
        sets: [
          { reps: 10, weight: 20, type: 'working' },
          { reps: 10, weight: 20, type: 'working' },
          { reps: 10, weight: 20, type: 'working' },
        ]
      },
      {
        exerciseId: '0124',
        exerciseName: 'cable triceps pushdown',
        sets: [
          { reps: 10, weight: 30, type: 'working' },
          { reps: 10, weight: 30, type: 'working' },
          { reps: 10, weight: 30, type: 'working' },
        ]
      },
      {
        exerciseId: '0331',
        exerciseName: 'dumbbell lying triceps extension',
        sets: [
          { reps: 10, weight: 15, type: 'working' },
          { reps: 10, weight: 15, type: 'working' },
          { reps: 10, weight: 15, type: 'working' },
        ]
      },
    ]
  },
  {
    name: 'Push Power',
    description: 'Incline press, delts, and triceps emphasis',
    isDefault: true,
    exercises: [
      {
        exerciseId: '0301',
        exerciseName: 'dumbbell incline press',
        sets: [
          { reps: 6, weight: 30, type: 'working' },
          { reps: 6, weight: 30, type: 'working' },
          { reps: 6, weight: 30, type: 'working' },
        ]
      },
      {
        exerciseId: '1301',
        exerciseName: 'cable fly',
        sets: [
          { reps: 10, weight: 15, type: 'working' },
          { reps: 10, weight: 15, type: 'working' },
          { reps: 10, weight: 15, type: 'working' },
        ]
      },
      {
        exerciseId: '0033',
        exerciseName: 'barbell incline bench press',
        sets: [
          { reps: 10, weight: 60, type: 'working' },
          { reps: 10, weight: 60, type: 'working' },
          { reps: 10, weight: 60, type: 'working' },
        ]
      },
      {
        exerciseId: '0025',
        exerciseName: 'barbell bench press',
        sets: [
          { reps: 10, weight: 60, type: 'working' },
          { reps: 10, weight: 60, type: 'working' },
          { reps: 10, weight: 60, type: 'working' },
        ]
      },
      {
        exerciseId: '0310',
        exerciseName: 'dumbbell shoulder press',
        sets: [
          { reps: 6, weight: 22.5, type: 'working' },
          { reps: 6, weight: 22.5, type: 'working' },
          { reps: 6, weight: 22.5, type: 'working' },
        ]
      },
      {
        exerciseId: '0292',
        exerciseName: 'dumbbell lateral raise',
        sets: [
          { reps: 10, weight: 10, type: 'working' },
          { reps: 10, weight: 10, type: 'working' },
          { reps: 10, weight: 10, type: 'working' },
        ]
      },
      {
        exerciseId: '0555',
        exerciseName: 'barbell overhead press',
        sets: [
          { reps: 10, weight: 35, type: 'working' },
          { reps: 10, weight: 35, type: 'working' },
        ]
      },
      {
        exerciseId: '0124',
        exerciseName: 'cable triceps pushdown',
        sets: [
          { reps: 10, weight: 30, type: 'working' },
          { reps: 10, weight: 30, type: 'working' },
          { reps: 10, weight: 30, type: 'working' },
        ]
      },
      {
        exerciseId: '0331',
        exerciseName: 'dumbbell lying triceps extension',
        sets: [
          { reps: 10, weight: 15, type: 'working' },
          { reps: 10, weight: 15, type: 'working' },
          { reps: 10, weight: 15, type: 'working' },
        ]
      },
      {
        exerciseId: '0148',
        exerciseName: 'cable rear delt fly',
        sets: [
          { reps: 10, weight: 10, type: 'working' },
          { reps: 10, weight: 10, type: 'working' },
          { reps: 10, weight: 10, type: 'working' },
        ]
      },
    ]
  },
  {
    name: 'Back & Biceps Volume',
    description: 'Rows, pulldowns, and curls for biceps',
    isDefault: true,
    exercises: [
      {
        exerciseId: '0032',
        exerciseName: 'barbell deadlift',
        sets: [
          { reps: 4, weight: 110, type: 'working' },
          { reps: 4, weight: 110, type: 'working' },
          { reps: 4, weight: 110, type: 'working' },
        ]
      },
      {
        exerciseId: '0609',
        exerciseName: 'pull-up',
        sets: [
          { reps: 10, weight: 0, type: 'working' },
          { reps: 10, weight: 0, type: 'working' },
          { reps: 10, weight: 0, type: 'working' },
        ]
      },
      {
        exerciseId: '0144',
        exerciseName: 'cable seated row',
        sets: [
          { reps: 10, weight: 45, type: 'working' },
          { reps: 10, weight: 45, type: 'working' },
          { reps: 10, weight: 45, type: 'working' },
        ]
      },
      {
        exerciseId: '0696',
        exerciseName: 'lat pulldown',
        sets: [
          { reps: 10, weight: 50, type: 'working' },
          { reps: 10, weight: 50, type: 'working' },
          { reps: 10, weight: 50, type: 'working' },
        ]
      },
      {
        exerciseId: '0286',
        exerciseName: 'dumbbell hammer curl',
        sets: [
          { reps: 10, weight: 15, type: 'working' },
          { reps: 10, weight: 15, type: 'working' },
          { reps: 10, weight: 15, type: 'working' },
        ]
      },
      {
        exerciseId: '0023',
        exerciseName: 'barbell curl',
        sets: [
          { reps: 10, weight: 30, type: 'working' },
          { reps: 10, weight: 30, type: 'working' },
          { reps: 10, weight: 30, type: 'working' },
        ]
      },
      {
        exerciseId: '0138',
        exerciseName: 'cable curl',
        sets: [
          { reps: 10, weight: 20, type: 'working' },
          { reps: 10, weight: 20, type: 'working' },
          { reps: 10, weight: 20, type: 'working' },
        ]
      },
      {
        exerciseId: '0148',
        exerciseName: 'cable rear delt fly',
        sets: [
          { reps: 10, weight: 10, type: 'working' },
          { reps: 10, weight: 10, type: 'working' },
          { reps: 10, weight: 10, type: 'working' },
        ]
      },
    ]
  },
  {
    name: 'Upper Power',
    description: 'Upper compound focus with delt and arm finishers',
    isDefault: true,
    exercises: [
      {
        exerciseId: '0025',
        exerciseName: 'barbell bench press',
        sets: [
          { reps: 5, weight: 70, type: 'working' },
          { reps: 5, weight: 70, type: 'working' },
          { reps: 5, weight: 70, type: 'working' },
        ]
      },
      {
        exerciseId: '0047',
        exerciseName: 'dumbbell bench press',
        sets: [
          { reps: 5, weight: 30, type: 'working' },
          { reps: 5, weight: 30, type: 'working' },
          { reps: 5, weight: 30, type: 'working' },
        ]
      },
      {
        exerciseId: '0310',
        exerciseName: 'dumbbell shoulder press',
        sets: [
          { reps: 10, weight: 20, type: 'working' },
          { reps: 10, weight: 20, type: 'working' },
          { reps: 10, weight: 20, type: 'working' },
        ]
      },
      {
        exerciseId: '0292',
        exerciseName: 'dumbbell lateral raise',
        sets: [
          { reps: 10, weight: 10, type: 'working' },
          { reps: 10, weight: 10, type: 'working' },
          { reps: 10, weight: 10, type: 'working' },
        ]
      },
      {
        exerciseId: '0148',
        exerciseName: 'cable rear delt fly',
        sets: [
          { reps: 10, weight: 10, type: 'working' },
          { reps: 10, weight: 10, type: 'working' },
          { reps: 10, weight: 10, type: 'working' },
        ]
      },
      {
        exerciseId: '0124',
        exerciseName: 'cable triceps pushdown',
        sets: [
          { reps: 10, weight: 30, type: 'working' },
          { reps: 10, weight: 30, type: 'working' },
          { reps: 10, weight: 30, type: 'working' },
        ]
      },
      {
        exerciseId: '0286',
        exerciseName: 'dumbbell hammer curl',
        sets: [
          { reps: 10, weight: 15, type: 'working' },
          { reps: 10, weight: 15, type: 'working' },
          { reps: 10, weight: 15, type: 'working' },
        ]
      },
    ]
  },
]
