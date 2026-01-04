import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, Square, Check, RefreshCw, ChevronRight, 
  Timer, Flame, ArrowLeft, X, Repeat, Info
} from 'lucide-react'
import { useAppStore } from '../store/StoreContext'
import { findExerciseByName } from '../services/exerciseDb'
import { Button } from '../components/Button'
import { Card, CardContent } from '../components/Card'
import { Modal } from '../components/Modal'
import { ExerciseGif } from '../components/ExerciseGif'
import { ExerciseDetailModal } from '../components/ExerciseDetailModal'
import styles from './Workout.module.css'

export const Workout = () => {
  const navigate = useNavigate()
  const { 
    templates, 
    currentWorkout, 
    exercises,
    startWorkout, 
    completeSet, 
    swapExercise,
    finishWorkout,
    cancelWorkout,
    getExercise,
    getAlternatives
  } = useAppStore()

  const [showTemplates, setShowTemplates] = useState(!currentWorkout)
  const [activeExercise, setActiveExercise] = useState(0)
  const [showAlternatives, setShowAlternatives] = useState(false)
  const [showFinishConfirm, setShowFinishConfirm] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [exerciseGifs, setExerciseGifs] = useState({})

  const handleStartWorkout = (templateId) => {
    startWorkout(templateId)
    setShowTemplates(false)
  }

  // Load exercise GIFs when workout starts
  useEffect(() => {
    if (currentWorkout && currentWorkout.exercises) {
      currentWorkout.exercises.forEach(async (ex) => {
        const data = await findExerciseByName(ex.exerciseName)
        if (data && data.gifUrl) {
          setExerciseGifs(prev => ({
            ...prev,
            [ex.exerciseId]: data.gifUrl
          }))
        }
      })
    }
  }, [currentWorkout])

  const handleCompleteSet = (exerciseIndex, setIndex) => {
    const exercise = currentWorkout.exercises[exerciseIndex]
    const set = exercise.sets[setIndex]
    completeSet(exerciseIndex, setIndex, set.reps, set.weight)
  }

  const handleSwapExercise = (newExerciseId) => {
    swapExercise(activeExercise, newExerciseId)
    setShowAlternatives(false)
  }

  const handleFinish = () => {
    finishWorkout()
    navigate('/')
  }

  const handleCancel = () => {
    if (confirm('Cancel this workout? Progress will be lost.')) {
      cancelWorkout()
      navigate('/')
    }
  }

  const getProgress = () => {
    if (!currentWorkout) return { completed: 0, total: 0, percent: 0 }
    let completed = 0
    let total = 0
    currentWorkout.exercises.forEach(ex => {
      ex.sets.forEach(set => {
        total++
        if (set.completed) completed++
      })
    })
    return { completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0 }
  }

  const progress = getProgress()

  // Template selection view
  if (!currentWorkout || showTemplates) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Start Workout</h1>
        </header>

        {templates.length === 0 ? (
          <Card>
            <CardContent className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <Play size={32} />
              </div>
              <h3>No Templates</h3>
              <p>Create a workout template first to start your session.</p>
              <Button onClick={() => navigate('/templates')}>Create Template</Button>
            </CardContent>
          </Card>
        ) : (
          <div className={styles.templateList}>
            <p className={styles.subtitle}>Choose a workout template to begin:</p>
            {templates.map((template, i) => (
              <Card
                key={template.id}
                delay={i * 0.05}
                onClick={() => handleStartWorkout(template.id)}
                className={styles.templateCard}
              >
                <CardContent className={styles.templateContent}>
                  <div className={styles.templateInfo}>
                    <h3 className={styles.templateName}>{template.name}</h3>
                    <p className={styles.templateMeta}>
                      {template.exercises.length} exercises
                    </p>
                  </div>
                  <div className={styles.templateAction}>
                    <Play size={20} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Active workout view
  const currentEx = currentWorkout.exercises[activeExercise]
  const exerciseData = getExercise(currentEx.exerciseId)
  const alternatives = getAlternatives(currentEx.exerciseId)

  return (
    <div className={styles.page}>
      <header className={styles.workoutHeader}>
        <button className={styles.backBtn} onClick={() => setShowTemplates(true)}>
          <ArrowLeft size={20} />
        </button>
        <div className={styles.workoutInfo}>
          <h1 className={styles.workoutTitle}>{currentWorkout.templateName}</h1>
          <div className={styles.progressBar}>
            <motion.div 
              className={styles.progressFill}
              initial={{ width: 0 }}
              animate={{ width: `${progress.percent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className={styles.progressText}>{progress.completed}/{progress.total} sets</span>
        </div>
        <button className={styles.cancelBtn} onClick={handleCancel}>
          <X size={20} />
        </button>
      </header>

      <div className={styles.exerciseNav}>
        {currentWorkout.exercises.map((ex, i) => {
          const allCompleted = ex.sets.every(s => s.completed)
          const someCompleted = ex.sets.some(s => s.completed)
          return (
            <button
              key={i}
              className={`${styles.exerciseTab} ${i === activeExercise ? styles.active : ''} ${allCompleted ? styles.completed : someCompleted ? styles.partial : ''}`}
              onClick={() => setActiveExercise(i)}
            >
              {allCompleted ? <Check size={14} /> : i + 1}
            </button>
          )
        })}
      </div>

      <motion.div
        key={activeExercise}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className={styles.exerciseCard}
      >
        <div className={styles.exerciseHeader}>
          <div className={styles.exerciseTitle}>
            <h2 className={styles.exerciseName}>
              {currentEx.exerciseName || exerciseData?.name}
            </h2>
            {currentEx.swappedFrom && (
              <span className={styles.swappedBadge}>
                <Repeat size={12} /> Swapped
              </span>
            )}
          </div>
          <div className={styles.exerciseActions}>
            <button 
              className={styles.infoIconBtn}
              onClick={() => setShowDetailModal(true)}
            >
              <Info size={18} />
            </button>
            {alternatives.length > 0 && (
              <button 
                className={styles.swapBtn}
                onClick={() => setShowAlternatives(true)}
              >
                <RefreshCw size={16} />
                <span>Swap</span>
              </button>
            )}
          </div>
        </div>

        {exerciseGifs[currentEx.exerciseId] && (
          <div className={styles.gifPreview}>
            <ExerciseGif 
              gifUrl={exerciseGifs[currentEx.exerciseId]}
              name={currentEx.exerciseName}
              size="lg"
            />
          </div>
        )}

        <div className={styles.setsContainer}>
          <div className={styles.setsHeader}>
            <span>Set</span>
            <span>Target</span>
            <span>Weight</span>
            <span></span>
          </div>
          {currentEx.sets.map((set, setIdx) => (
            <motion.div
              key={setIdx}
              className={`${styles.setRow} ${set.completed ? styles.setCompleted : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: setIdx * 0.05 }}
            >
              <span className={styles.setNum}>{setIdx + 1}</span>
              <span className={styles.setTarget}>{set.reps} reps</span>
              <span className={styles.setWeight}>
                {set.weight > 0 ? `${set.weight} kg` : 'BW'}
              </span>
              <button
                className={`${styles.setBtn} ${set.completed ? styles.done : ''}`}
                onClick={() => !set.completed && handleCompleteSet(activeExercise, setIdx)}
                disabled={set.completed}
              >
                {set.completed ? <Check size={18} /> : 'Done'}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className={styles.workoutActions}>
        {activeExercise < currentWorkout.exercises.length - 1 ? (
          <Button
            fullWidth
            icon={ChevronRight}
            iconPosition="right"
            onClick={() => setActiveExercise(prev => prev + 1)}
          >
            Next Exercise
          </Button>
        ) : (
          <Button
            fullWidth
            onClick={() => setShowFinishConfirm(true)}
            disabled={progress.completed === 0}
          >
            Finish Workout
          </Button>
        )}
      </div>

      <Modal
        isOpen={showAlternatives}
        onClose={() => setShowAlternatives(false)}
        title="Equipment Busy?"
        size="md"
      >
        <div className={styles.alternativesList}>
          <p className={styles.alternativesSubtitle}>
            Try one of these alternatives:
          </p>
          {alternatives.map((alt) => (
            <button
              key={alt.id}
              className={styles.alternativeItem}
              onClick={() => handleSwapExercise(alt.id)}
            >
              <div className={styles.alternativeInfo}>
                <span className={styles.alternativeName}>{alt.name}</span>
                <span className={styles.alternativeEquipment}>{alt.equipment}</span>
              </div>
              <ChevronRight size={18} />
            </button>
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={showFinishConfirm}
        onClose={() => setShowFinishConfirm(false)}
        title="Finish Workout?"
        size="sm"
      >
        <div className={styles.finishModal}>
          <div className={styles.finishStats}>
            <div className={styles.finishStat}>
              <Flame className={styles.finishStatIcon} />
              <span className={styles.finishStatValue}>{progress.completed}</span>
              <span className={styles.finishStatLabel}>Sets Completed</span>
            </div>
          </div>
          <p className={styles.finishText}>
            Great work! Ready to log this workout?
          </p>
          <div className={styles.finishActions}>
            <Button variant="ghost" onClick={() => setShowFinishConfirm(false)}>
              Keep Going
            </Button>
            <Button onClick={handleFinish}>
              Complete
            </Button>
          </div>
        </div>
      </Modal>

      <ExerciseDetailModal 
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        exerciseName={currentEx?.exerciseName}
      />
    </div>
  )
}
