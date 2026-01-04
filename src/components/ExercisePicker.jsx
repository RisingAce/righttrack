import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Dumbbell, Target, Cable, User, Cog, Info } from 'lucide-react'
import { useAppStore } from '../store/StoreContext'
import { Input } from './Input'
import { ExerciseGif } from './ExerciseGif'
import { ExerciseDetailModal } from './ExerciseDetailModal'
import styles from './ExercisePicker.module.css'

const categoryIcons = {
  chest: Target,
  back: Target,
  shoulders: Target,
  legs: Target,
  arms: Dumbbell,
  core: User,
}

const equipmentLabels = {
  barbell: 'Barbell',
  dumbbells: 'Dumbbells',
  cable: 'Cable',
  machine: 'Machine',
  bodyweight: 'Bodyweight',
}

export const ExercisePicker = ({ onSelect, selectedIds = [] }) => {
  const { exercises } = useAppStore()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState(null)

  const categories = useMemo(() => {
    const cats = [...new Set(exercises.map(e => e.category))]
    return ['all', ...cats]
  }, [exercises])

  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      const matchesSearch = exercise.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = activeCategory === 'all' || exercise.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [exercises, search, activeCategory])

  const groupedExercises = useMemo(() => {
    const grouped = {}
    filteredExercises.forEach(exercise => {
      if (!grouped[exercise.category]) {
        grouped[exercise.category] = []
      }
      grouped[exercise.category].push(exercise)
    })
    return grouped
  }, [filteredExercises])

  const handleShowDetail = (exercise, e) => {
    e.stopPropagation()
    setSelectedExercise(exercise)
    setDetailModalOpen(true)
  }

  return (
    <div className={styles.picker}>
      <Input
        placeholder="Search exercises..."
        icon={Search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={styles.categories}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {Object.entries(groupedExercises).map(([category, exs]) => (
          <div key={category} className={styles.group}>
            <h4 className={styles.groupTitle}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h4>
            <div className={styles.exercises}>
              {exs.map((exercise, index) => {
                const Icon = categoryIcons[exercise.category] || Cog
                const isSelected = selectedIds.includes(exercise.id)
                
                return (
                  <motion.button
                    key={exercise.id}
                    className={`${styles.exercise} ${isSelected ? styles.selected : ''}`}
                    onClick={() => onSelect(exercise)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExerciseGif 
                      gifUrl={exercise.gifUrl}
                      name={exercise.name}
                      size="sm"
                    />
                    <div className={styles.exerciseInfo}>
                      <span className={styles.exerciseName}>{exercise.name}</span>
                      <span className={styles.exerciseMeta}>
                        {equipmentLabels[exercise.equipment] || exercise.equipment}
                      </span>
                    </div>
                    <button 
                      className={styles.infoBtn}
                      onClick={(e) => handleShowDetail(exercise, e)}
                    >
                      <Info size={16} />
                    </button>
                    {isSelected && (
                      <div className={styles.checkmark}>✓</div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <ExerciseDetailModal 
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        exerciseName={selectedExercise?.name}
      />
    </div>
  )
}
