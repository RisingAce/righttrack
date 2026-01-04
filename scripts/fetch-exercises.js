// Script to fetch exercises from ExerciseDB and generate our catalog
import dotenv from 'dotenv'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const API_KEY = process.env.VITE_RAPIDAPI_KEY
const API_HOST = 'exercisedb.p.rapidapi.com'
const BASE_URL = `https://${API_HOST}`

const fetchFromAPI = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  })
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }
  
  return response.json()
}

// Map ExerciseDB body parts to our categories
const bodyPartToCategory = {
  'chest': 'chest',
  'back': 'back',
  'shoulders': 'shoulders',
  'upper legs': 'legs',
  'lower legs': 'legs',
  'upper arms': 'arms',
  'lower arms': 'arms',
  'waist': 'core',
  'cardio': 'cardio',
  'neck': 'other'
}

// Map ExerciseDB equipment to our simplified version
const normalizeEquipment = (equipment) => {
  if (equipment.includes('barbell')) return 'barbell'
  if (equipment.includes('dumbbell')) return 'dumbbells'
  if (equipment.includes('cable')) return 'cable'
  if (equipment.includes('machine') || equipment.includes('leverage')) return 'machine'
  if (equipment === 'body weight') return 'bodyweight'
  if (equipment.includes('band')) return 'band'
  if (equipment.includes('kettlebell')) return 'kettlebell'
  return equipment
}

async function main() {
  console.log('🔄 Fetching exercises from ExerciseDB...\n')

  // Fetch exercises by body part
  const bodyParts = ['chest', 'back', 'shoulders', 'upper legs', 'upper arms', 'waist']
  const allExercises = []
  
  for (const bodyPart of bodyParts) {
    console.log(`Fetching ${bodyPart}...`)
    const exercises = await fetchFromAPI(`/exercises/bodyPart/${bodyPart}?limit=20`)
    allExercises.push(...exercises)
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  console.log(`\n✅ Fetched ${allExercises.length} exercises\n`)

  // Process and categorize
  const processedExercises = {}
  const alternativesMap = {}

  allExercises.forEach(ex => {
    const category = bodyPartToCategory[ex.bodyPart] || 'other'
    const equipment = normalizeEquipment(ex.equipment)
    
    const exercise = {
      id: ex.id,
      name: ex.name,
      category,
      equipment,
      bodyPart: ex.bodyPart,
      target: ex.target,
      gifUrl: ex.gifUrl,
      secondaryMuscles: ex.secondaryMuscles || [],
      instructions: ex.instructions || []
    }

    if (!processedExercises[category]) {
      processedExercises[category] = []
    }
    
    processedExercises[category].push(exercise)
    
    // Track for alternatives mapping
    if (!alternativesMap[category]) {
      alternativesMap[category] = {}
    }
    if (!alternativesMap[category][equipment]) {
      alternativesMap[category][equipment] = []
    }
    alternativesMap[category][equipment].push(ex.id)
  })

  // Generate alternatives based on same category, different equipment
  const exercisesWithAlternatives = []
  
  Object.values(processedExercises).flat().forEach(exercise => {
    const alternatives = []
    const category = exercise.category
    const currentEquipment = exercise.equipment
    
    // Find exercises in same category with different equipment
    if (alternativesMap[category]) {
      Object.entries(alternativesMap[category]).forEach(([equip, ids]) => {
        if (equip !== currentEquipment) {
          alternatives.push(...ids.slice(0, 3))
        }
      })
    }
    
    exercisesWithAlternatives.push({
      ...exercise,
      alternatives: alternatives.slice(0, 5) // Max 5 alternatives
    })
  })

  // Generate the JavaScript code
  const code = `// Auto-generated exercise catalog from ExerciseDB
// Generated on: ${new Date().toISOString()}

export const exerciseCatalog = ${JSON.stringify(exercisesWithAlternatives, null, 2)}
`

  // Write to file
  const outputPath = join(__dirname, '..', 'src', 'data', 'exercises.js')
  writeFileSync(outputPath, code)

  console.log(`📝 Wrote ${exercisesWithAlternatives.length} exercises to src/data/exercises.js\n`)
  
  // Print summary
  const summary = {}
  exercisesWithAlternatives.forEach(ex => {
    summary[ex.category] = (summary[ex.category] || 0) + 1
  })
  
  console.log('📊 Summary by category:')
  Object.entries(summary).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} exercises`)
  })
  
  console.log('\n✨ Done! Restart your dev server to see the new exercises.')
}

main().catch(console.error)
