// Pre-built workout templates for quick start (updated split)

export const defaultTemplates = [
  {
    name: 'Chest & Shoulders',
    description: 'Bench focus with fly variations and delts',
    isDefault: true,
    exercises: [
      { exerciseId: '0025', exerciseName: 'barbell bench press', sets: [
        { reps: 4, weight: 0, type: 'working' },
        { reps: 4, weight: 0, type: 'working' },
        { reps: 4, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0301', exerciseName: 'dumbbell incline press', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '1301', exerciseName: 'cable fly', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0033', exerciseName: 'barbell incline bench press', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0555', exerciseName: 'barbell overhead press', sets: [
        { reps: 5, weight: 0, type: 'working' },
        { reps: 5, weight: 0, type: 'working' },
        { reps: 5, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0292', exerciseName: 'dumbbell lateral raise', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0292', exerciseName: 'dumbbell front raise', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0148', exerciseName: 'cable rear delt fly', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
    ],
  },
  {
    name: 'Back',
    description: 'Hinges, rows, pulldowns, and face pulls',
    isDefault: true,
    exercises: [
      { exerciseId: '0032', exerciseName: 'barbell deadlift', sets: [
        { reps: 4, weight: 0, type: 'working' },
        { reps: 4, weight: 0, type: 'working' },
        { reps: 4, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0035', exerciseName: 'barbell romanian deadlift', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0046', exerciseName: 'barbell bent over row', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0696', exerciseName: 'lat pulldown', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0144', exerciseName: 'cable seated row', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0148', exerciseName: 'cable face pull', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0001', exerciseName: 'plank', sets: [
        { reps: 60, weight: 0, type: 'working' },
        { reps: 60, weight: 0, type: 'working' },
      ]},
    ],
  },
  {
    name: 'Legs & Arms',
    description: 'Squat-led day with curls and pushdowns',
    isDefault: true,
    exercises: [
      { exerciseId: '0043', exerciseName: 'barbell squat', sets: [
        { reps: 4, weight: 0, type: 'working' },
        { reps: 4, weight: 0, type: 'working' },
        { reps: 4, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0549', exerciseName: 'leg press', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0558', exerciseName: 'leg curl', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0341', exerciseName: 'dumbbell lunge', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0872', exerciseName: 'calf raise', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0023', exerciseName: 'barbell curl', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0286', exerciseName: 'dumbbell hammer curl', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0138', exerciseName: 'cable curl', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0331', exerciseName: 'dumbbell lying triceps extension', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0124', exerciseName: 'cable triceps pushdown', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0124', exerciseName: 'single arm pushdown', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
    ],
  },
  {
    name: 'Push Day',
    description: 'Incline press, flys, delts, and triceps',
    isDefault: true,
    exercises: [
      { exerciseId: '0033', exerciseName: 'barbell incline bench press', sets: [
        { reps: 6, weight: 0, type: 'working' },
        { reps: 6, weight: 0, type: 'working' },
        { reps: 6, weight: 0, type: 'working' },
      ]},
      { exerciseId: '1301', exerciseName: 'cable fly', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0301', exerciseName: 'dumbbell incline press', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '1301', exerciseName: 'seated chest fly', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0555', exerciseName: 'barbell overhead press', sets: [
        { reps: 6, weight: 0, type: 'working' },
        { reps: 6, weight: 0, type: 'working' },
        { reps: 6, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0292', exerciseName: 'dumbbell lateral raise', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0292', exerciseName: 'barbell front raise', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0124', exerciseName: 'cable triceps pushdown', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0124', exerciseName: 'single arm pushdown', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0331', exerciseName: 'dumbbell lying triceps extension', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0148', exerciseName: 'cable face pull', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
    ],
  },
  {
    name: 'Back + Biceps',
    description: 'Deadlift plus pulls, rows, and curls',
    isDefault: true,
    exercises: [
      { exerciseId: '0032', exerciseName: 'barbell deadlift', sets: [
        { reps: 4, weight: 0, type: 'working' },
        { reps: 4, weight: 0, type: 'working' },
        { reps: 4, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0609', exerciseName: 'pull-up', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0144', exerciseName: 'single arm seated row', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0696', exerciseName: 'close grip lat pulldown', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0696', exerciseName: 'wide grip lat pulldown', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0286', exerciseName: 'dumbbell hammer curl', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0023', exerciseName: 'barbell curl', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0286', exerciseName: 'focus curl', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0138', exerciseName: 'cable curl', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
    ],
  },
  {
    name: 'Upper',
    description: 'Press focus with delts and triceps finish',
    isDefault: true,
    exercises: [
      { exerciseId: '0025', exerciseName: 'barbell bench press', sets: [
        { reps: 5, weight: 0, type: 'working' },
        { reps: 5, weight: 0, type: 'working' },
        { reps: 5, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0047', exerciseName: 'dumbbell bench press', sets: [
        { reps: 5, weight: 0, type: 'working' },
        { reps: 5, weight: 0, type: 'working' },
        { reps: 5, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0555', exerciseName: 'barbell overhead press', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0292', exerciseName: 'dumbbell lateral raise', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0148', exerciseName: 'cable rear delt fly', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0148', exerciseName: 'cable face pull', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
      { exerciseId: '0124', exerciseName: 'triceps finisher', sets: [
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
        { reps: 10, weight: 0, type: 'working' },
      ]},
    ],
  },
]
