import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Target, Dumbbell, Zap, Info, AlertCircle } from 'lucide-react'
import { getExerciseById, findExerciseByName } from '../services/exerciseDb'
import { ExerciseGif } from './ExerciseGif'
import { Button } from './Button'
import styles from './ExerciseDetailModal.module.css'

export const ExerciseDetailModal = ({ isOpen, onClose, exerciseName, exerciseId }) => {
  const [exerciseData, setExerciseData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && (exerciseId || exerciseName)) {
      loadExerciseData()
    }
  }, [isOpen, exerciseId, exerciseName])

  const loadExerciseData = async () => {
    setLoading(true)
    try {
      let data = null
      
      if (exerciseId) {
        data = await getExerciseById(exerciseId)
      } else if (exerciseName) {
        data = await findExerciseByName(exerciseName)
      }
      
      setExerciseData(data)
    } catch (error) {
      console.error('Failed to load exercise:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
            <p>Loading exercise details...</p>
          </div>
        ) : exerciseData ? (
          <div className={styles.content}>
            <div className={styles.header}>
              <h2 className={styles.title}>{exerciseData.name}</h2>
              <div className={styles.tags}>
                <span className={styles.tag}>
                  {exerciseData.bodyPart || 'Body Part'}
                </span>
                <span className={styles.tag}>
                  {exerciseData.equipment || 'Equipment'}
                </span>
              </div>
            </div>

            <div className={styles.gifSection}>
              <ExerciseGif 
                gifUrl={exerciseData.gifUrl}
                name={exerciseData.name}
                size="xl"
              />
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <Target className={styles.infoIcon} />
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Primary Target</span>
                  <span className={styles.infoValue}>
                    {exerciseData.target || 'N/A'}
                  </span>
                </div>
              </div>

              {exerciseData.secondaryMuscles && exerciseData.secondaryMuscles.length > 0 && (
                <div className={styles.infoCard}>
                  <Zap className={styles.infoIcon} />
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>Secondary</span>
                    <span className={styles.infoValue}>
                      {exerciseData.secondaryMuscles.join(', ')}
                    </span>
                  </div>
                </div>
              )}

              <div className={styles.infoCard}>
                <Dumbbell className={styles.infoIcon} />
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Equipment</span>
                  <span className={styles.infoValue}>
                    {exerciseData.equipment || 'None'}
                  </span>
                </div>
              </div>
            </div>

            {exerciseData.instructions && exerciseData.instructions.length > 0 && (
              <div className={styles.instructionsSection}>
                <div className={styles.instructionsHeader}>
                  <Info size={18} />
                  <h3>How to Perform</h3>
                </div>
                <ol className={styles.instructionsList}>
                  {exerciseData.instructions.map((instruction, idx) => (
                    <li key={idx}>{instruction}</li>
                  ))}
                </ol>
              </div>
            )}

            <Button fullWidth onClick={onClose}>
              Got it!
            </Button>
          </div>
        ) : (
          <div className={styles.noData}>
            <AlertCircle size={48} />
            <h3>Exercise Not Found</h3>
            <p>We couldn't load the details for this exercise.</p>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
