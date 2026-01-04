export type Pose =
  | 'bench'
  | 'squat'
  | 'deadlift'
  | 'pulldown'
  | 'ohp'
  | 'row'
  | 'generic'

export type ExercisePreview = {
  name: string
  pose: Pose
  accent?: 'blue' | 'green' | 'yellow'
  notes?: string
}

export const exercises: ExercisePreview[] = [
  { name: 'Bench Press', pose: 'bench', accent: 'green' },
  { name: 'Back Squat', pose: 'squat', accent: 'blue' },
  { name: 'Deadlift', pose: 'deadlift', accent: 'yellow' },
  { name: 'Lat Pulldown', pose: 'pulldown', accent: 'green' },
  { name: 'Shoulder Press', pose: 'ohp', accent: 'blue' },
  { name: 'Seated Cable Row', pose: 'row', accent: 'green' },
]

// To add new exercises, append to the array above:
// { name: 'Incline Bench Press', pose: 'bench', accent: 'blue', notes: 'Incline variant' }

