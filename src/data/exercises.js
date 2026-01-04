// Curated exercise catalog matching ExerciseDB
// GIFs hosted on ExerciseDB's public S3 bucket - no authentication required

export const exerciseCatalog = [
  // CHEST
  {
    id: '0025',
    name: 'barbell bench press',
    category: 'chest',
    equipment: 'barbell',
    bodyPart: 'chest',
    target: 'pectorals',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/jgCuUxlqFvWyGJ',
    alternatives: ['0047', '0033', '1301', '0662']
  },
  {
    id: '0033',
    name: 'barbell incline bench press',
    category: 'chest',
    equipment: 'barbell',
    bodyPart: 'chest',
    target: 'pectorals',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/CKi2wbnKCPMdx2',
    alternatives: ['0025', '0047', '0301']
  },
  {
    id: '0047',
    name: 'dumbbell bench press',
    category: 'chest',
    equipment: 'dumbbells',
    bodyPart: 'chest',
    target: 'pectorals',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/r4b2b7YSbAU6w5',
    alternatives: ['0025', '0033', '3545']
  },
  {
    id: '0301',
    name: 'dumbbell incline press',
    category: 'chest',
    equipment: 'dumbbells',
    bodyPart: 'chest',
    target: 'pectorals',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/hKZXMDUvWv62qH',
    alternatives: ['0033', '0047', '0025']
  },
  {
    id: '1301',
    name: 'cable fly',
    category: 'chest',
    equipment: 'cable',
    bodyPart: 'chest',
    target: 'pectorals',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/AakqjUUF0yrD-e',
    alternatives: ['0025', '0047', '0291']
  },
  {
    id: '0662',
    name: 'push-up',
    category: 'chest',
    equipment: 'bodyweight',
    bodyPart: 'chest',
    target: 'pectorals',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/u1q8z3Qtt6tVaJ',
    alternatives: ['0025', '0047', '1467']
  },
  
  // BACK
  {
    id: '0032',
    name: 'barbell deadlift',
    category: 'back',
    equipment: 'barbell',
    bodyPart: 'back',
    target: 'spine',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/S9hKxwQo2ZNUVC',
    alternatives: ['0696', '0046', '0144']
  },
  {
    id: '0046',
    name: 'barbell bent over row',
    category: 'back',
    equipment: 'barbell',
    bodyPart: 'back',
    target: 'lats',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/Bsoe4xmjzxb8Qp',
    alternatives: ['0032', '0144', '0696']
  },
  {
    id: '0144',
    name: 'cable seated row',
    category: 'back',
    equipment: 'cable',
    bodyPart: 'back',
    target: 'lats',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/b4UYPj1-tPETya',
    alternatives: ['0046', '0297', '0696']
  },
  {
    id: '0297',
    name: 'dumbbell bent over row',
    category: 'back',
    equipment: 'dumbbells',
    bodyPart: 'back',
    target: 'lats',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/sNJjM1gITqKvpR',
    alternatives: ['0046', '0144', '0696']
  },
  {
    id: '0609',
    name: 'pull-up',
    category: 'back',
    equipment: 'bodyweight',
    bodyPart: 'back',
    target: 'lats',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/S9nBcvADBICLrL',
    alternatives: ['0696', '0144', '0046']
  },
  {
    id: '0696',
    name: 'lat pulldown',
    category: 'back',
    equipment: 'cable',
    bodyPart: 'back',
    target: 'lats',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/s4MhtLevIzMYFX',
    alternatives: ['0609', '0144', '0046']
  },

  // SHOULDERS
  {
    id: '0555',
    name: 'barbell overhead press',
    category: 'shoulders',
    equipment: 'barbell',
    bodyPart: 'shoulders',
    target: 'delts',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/S1ek56bqzUkfmK',
    alternatives: ['0310', '0292', '0148']
  },
  {
    id: '0310',
    name: 'dumbbell shoulder press',
    category: 'shoulders',
    equipment: 'dumbbells',
    bodyPart: 'shoulders',
    target: 'delts',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/lFvmBOlRy0jBn9',
    alternatives: ['0555', '0292', '0148']
  },
  {
    id: '0292',
    name: 'dumbbell lateral raise',
    category: 'shoulders',
    equipment: 'dumbbells',
    bodyPart: 'shoulders',
    target: 'delts',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/o62Sd4RqWBXJ3b',
    alternatives: ['0310', '0148', '0425']
  },
  {
    id: '0148',
    name: 'cable rear delt fly',
    category: 'shoulders',
    equipment: 'cable',
    bodyPart: 'shoulders',
    target: 'delts',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/Uh52kF8u7w1PX4',
    alternatives: ['0292', '0310', '0304']
  },
  {
    id: '0304',
    name: 'dumbbell reverse fly',
    category: 'shoulders',
    equipment: 'dumbbells',
    bodyPart: 'shoulders',
    target: 'delts',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/ow-XOAaG8mDgxX',
    alternatives: ['0148', '0292', '0310']
  },

  // LEGS
  {
    id: '0043',
    name: 'barbell squat',
    category: 'legs',
    equipment: 'barbell',
    bodyPart: 'upper legs',
    target: 'quads',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/7HJKfJEH1MQQfz',
    alternatives: ['0549', '0606', '0341']
  },
  {
    id: '0549',
    name: 'leg press',
    category: 'legs',
    equipment: 'machine',
    bodyPart: 'upper legs',
    target: 'quads',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/DQI4EgdYy-H9L5',
    alternatives: ['0043', '0606', '0341']
  },
  {
    id: '0035',
    name: 'barbell romanian deadlift',
    category: 'legs',
    equipment: 'barbell',
    bodyPart: 'upper legs',
    target: 'hamstrings',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/OC3RQoCwmgxrZd',
    alternatives: ['0558', '0606', '0043']
  },
  {
    id: '0558',
    name: 'leg curl',
    category: 'legs',
    equipment: 'machine',
    bodyPart: 'upper legs',
    target: 'hamstrings',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/kYXfPmtPBgLW6e',
    alternatives: ['0035', '0043', '0606']
  },
  {
    id: '0606',
    name: 'lunge',
    category: 'legs',
    equipment: 'bodyweight',
    bodyPart: 'upper legs',
    target: 'quads',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/tVGQCLU2uHNPFF',
    alternatives: ['0043', '0549', '0341']
  },
  {
    id: '0341',
    name: 'dumbbell lunge',
    category: 'legs',
    equipment: 'dumbbells',
    bodyPart: 'upper legs',
    target: 'quads',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/xQIY4bX1KXFQdZ',
    alternatives: ['0606', '0043', '0549']
  },
  {
    id: '0872',
    name: 'calf raise',
    category: 'legs',
    equipment: 'bodyweight',
    bodyPart: 'lower legs',
    target: 'calves',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/u0IUL4bUKnDQcN',
    alternatives: ['0871', '0873']
  },

  // ARMS - BICEPS
  {
    id: '0023',
    name: 'barbell curl',
    category: 'arms',
    equipment: 'barbell',
    bodyPart: 'upper arms',
    target: 'biceps',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/8xX-1kXmF5qg3F',
    alternatives: ['0284', '0286', '0138']
  },
  {
    id: '0284',
    name: 'dumbbell curl',
    category: 'arms',
    equipment: 'dumbbells',
    bodyPart: 'upper arms',
    target: 'biceps',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/29bkc-D0RVpOqN',
    alternatives: ['0023', '0286', '0138']
  },
  {
    id: '0286',
    name: 'dumbbell hammer curl',
    category: 'arms',
    equipment: 'dumbbells',
    bodyPart: 'upper arms',
    target: 'biceps',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/ePIyGULU47BM3z',
    alternatives: ['0284', '0023', '0138']
  },
  {
    id: '0138',
    name: 'cable curl',
    category: 'arms',
    equipment: 'cable',
    bodyPart: 'upper arms',
    target: 'biceps',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/QEsmhiKJMczV1N',
    alternatives: ['0023', '0284', '0286']
  },

  // ARMS - TRICEPS
  {
    id: '0749',
    name: 'triceps dip',
    category: 'arms',
    equipment: 'bodyweight',
    bodyPart: 'upper arms',
    target: 'triceps',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/iAZn56PaZd83sS',
    alternatives: ['0124', '0743', '0331']
  },
  {
    id: '0124',
    name: 'cable triceps pushdown',
    category: 'arms',
    equipment: 'cable',
    bodyPart: 'upper arms',
    target: 'triceps',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/puhYQIbZF6lRFm',
    alternatives: ['0749', '0743', '0331']
  },
  {
    id: '0743',
    name: 'close-grip barbell bench press',
    category: 'arms',
    equipment: 'barbell',
    bodyPart: 'upper arms',
    target: 'triceps',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/J4dHXS8QHFxaxj',
    alternatives: ['0124', '0749', '0331']
  },
  {
    id: '0331',
    name: 'dumbbell lying triceps extension',
    category: 'arms',
    equipment: 'dumbbells',
    bodyPart: 'upper arms',
    target: 'triceps',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/n1KJLd2eLLM6l7',
    alternatives: ['0124', '0743', '0749']
  },

  // CORE
  {
    id: '0001',
    name: 'plank',
    category: 'core',
    equipment: 'bodyweight',
    bodyPart: 'waist',
    target: 'abs',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/Nyi5XiQ0R0RuDZ',
    alternatives: ['0685', '0142', '0650']
  },
  {
    id: '0650',
    name: 'crunch',
    category: 'core',
    equipment: 'bodyweight',
    bodyPart: 'waist',
    target: 'abs',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/qVGXGMZ5d1vQdg',
    alternatives: ['0001', '0142', '0685']
  },
  {
    id: '0142',
    name: 'cable crunch',
    category: 'core',
    equipment: 'cable',
    bodyPart: 'waist',
    target: 'abs',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/EWEh87--5rbfXX',
    alternatives: ['0650', '0001', '0685']
  },
  {
    id: '0685',
    name: 'hanging leg raise',
    category: 'core',
    equipment: 'bodyweight',
    bodyPart: 'waist',
    target: 'abs',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/MtQPW2eA5bJbZi',
    alternatives: ['0001', '0650', '0142']
  },
  {
    id: '0748',
    name: 'russian twist',
    category: 'core',
    equipment: 'bodyweight',
    bodyPart: 'waist',
    target: 'abs',
    gifUrl: 'https://v2.exercisedb.io/api/v1/image/S6Y6PY77UMvOMi',
    alternatives: ['0001', '0650', '0142']
  }
]
