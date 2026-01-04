import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, Square, Check, RefreshCw, ChevronRight, 
  Timer, Flame, ArrowLeft, X, Repeat, Info, AlertTriangle
} from 'lucide-react'
import { useAppStore } from '../store/StoreContext'
import { findExerciseByName } from '../services/exerciseDb'
import { previewMap } from '../data/previewMap'
import { Button } from '../components/Button'
import { Card, CardContent } from '../components/Card'
import { Modal } from '../components/Modal'
import { ExerciseGif } from '../components/ExerciseGif'
import { ExerciseDetailModal } from '../components/ExerciseDetailModal'
import styles from './Workout.module.css'

export const Workout = () => {
  const navigate = useNavigate()
  const location = useLocation()
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
    getAlternatives,
    updateSetValue,
    updateExerciseNote,
  } = useAppStore()

  const [showTemplates, setShowTemplates] = useState(!currentWorkout)
  const [activeExercise, setActiveExercise] = useState(0)
const [showAlternatives, setShowAlternatives] = useState(false)
const [showFinishConfirm, setShowFinishConfirm] = useState(false)
const [showDetailModal, setShowDetailModal] = useState(false)
const [exerciseGifs, setExerciseGifs] = useState({})
const [autoStartError, setAutoStartError] = useState(null)
const [initializing, setInitializing] = useState(!!(location.state?.startTemplateId))
const startIdRef = useRef(location.state?.startTemplateId || null)
const fetchCountRef = useRef(0)
const gifCacheRef = useRef(null)

const GIF_CACHE_KEY = 'rt_gif_cache'
const cdnGifUrl = (id) => `https://v2.exercisedb.io/image/${id}.gif`
const cdnLegacyUrl = (tokenOrId) => `https://v2.exercisedb.io/api/v1/image/${tokenOrId}`
const slugify = (name) =>
  name
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const guessPoseSlugs = (name = '') => {
  const n = name.toLowerCase()
  if (n.includes('bench')) return ['bench-press']
  if (n.includes('squat')) return ['back-squat']
  if (n.includes('deadlift')) return ['deadlift']
  if (n.includes('pulldown') || n.includes('pull down')) return ['lat-pulldown']
  if (n.includes('press')) return ['shoulder-press']
  if (n.includes('row')) return ['seated-cable-row']
  return []
}

  // Handle starting workout from navigation state (e.g., from home page)
  useEffect(() => {
    if (!startIdRef.current) return

    // If we already have the workout for this template, stop the spinner
    if (currentWorkout?.templateId === startIdRef.current) {
      setInitializing(false)
      startIdRef.current = null
      window.history.replaceState({}, document.title)
      return
    }

    setInitializing(true)

    const workout = startWorkout(startIdRef.current)
    if (workout) {
      setShowTemplates(false)
      setAutoStartError(null)
    } else {
      setAutoStartError('Scheduled workout template is missing. Pick another template.')
      setShowTemplates(true)
    }
    setInitializing(false)
    startIdRef.current = null
    // Clear the location state so it doesn't start again on refresh
    window.history.replaceState({}, document.title)
  }, [startWorkout, currentWorkout])

  const handleStartWorkout = (templateId) => {
    setInitializing(true)
    startWorkout(templateId)
    setShowTemplates(false)
    setInitializing(false)
  }

  const handleCompleteSet = (exerciseIndex, setIndex) => {
    const exercise = exercisesList?.[exerciseIndex]
    const set = exercise?.sets?.[setIndex]
    if (!set) return
    completeSet(exerciseIndex, setIndex, set.reps, set.weight)
  }

  const handleUpdateSet = (exerciseIndex, setIndex, field, value) => {
    updateSetValue(exerciseIndex, setIndex, field, value)
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
    const list = Array.isArray(currentWorkout?.exercises) ? currentWorkout.exercises : []
    if (!list.length) return { completed: 0, total: 0, percent: 0 }
    let completed = 0
    let total = 0
    list.forEach(ex => {
      (ex.sets || []).forEach(set => {
        total++
        if (set?.completed) completed++
      })
    })
    return { completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0 }
  }

  const progress = getProgress()
  const exercisesList = Array.isArray(currentWorkout?.exercises) ? currentWorkout.exercises : []
  const hasExercises = exercisesList.length > 0

  useEffect(() => {
    if (currentWorkout && activeExercise >= (currentWorkout.exercises?.length || 0)) {
      setActiveExercise(0)
    }
  }, [currentWorkout, activeExercise])

  // If a workout just became available and we came from a scheduled start, hide templates view
  useEffect(() => {
    if (currentWorkout && showTemplates) {
      setShowTemplates(false)
    }
  }, [currentWorkout, showTemplates])

  // Load exercise GIFs with cache-first, CDN fallback, and API rate limiting
  useEffect(() => {
    if (!currentWorkout?.exercises) return

    if (!gifCacheRef.current) {
      try {
        gifCacheRef.current = JSON.parse(localStorage.getItem(GIF_CACHE_KEY) || '{}')
      } catch {
        gifCacheRef.current = {}
      }
    }

    const loadGifs = async () => {
      for (const ex of currentWorkout.exercises) {
        const exerciseData = getExercise(ex.exerciseId)
        const cachedGif = gifCacheRef.current?.[ex.exerciseId]
        const localGif = exerciseData?.gifUrl

        if (cachedGif || localGif) {
          const gifUrl = cachedGif || localGif
          setExerciseGifs(prev => ({ ...prev, [ex.exerciseId]: gifUrl }))
          if (!cachedGif) {
            gifCacheRef.current[ex.exerciseId] = gifUrl
            localStorage.setItem(GIF_CACHE_KEY, JSON.stringify(gifCacheRef.current))
          }
          continue
        }

        if (fetchCountRef.current >= 2) {
          continue
        }

        try {
          fetchCountRef.current += 1

          // Try free CDN first
          const cdnUrl = cdnGifUrl(ex.exerciseId)
          const cdnResp = await fetch(cdnUrl, { method: 'HEAD' })
          if (cdnResp.ok) {
            setExerciseGifs(prev => ({ ...prev, [ex.exerciseId]: cdnUrl }))
            gifCacheRef.current[ex.exerciseId] = cdnUrl
            localStorage.setItem(GIF_CACHE_KEY, JSON.stringify(gifCacheRef.current))
            continue
          }

          // Try legacy token-based URL if we have one on record
          const legacyToken = exerciseData?.gifUrl ? exerciseData.gifUrl.split('/').pop() : null
          if (legacyToken) {
            const legacyUrl = cdnLegacyUrl(legacyToken)
            const legacyResp = await fetch(legacyUrl, { method: 'HEAD' })
            if (legacyResp.ok) {
              setExerciseGifs(prev => ({ ...prev, [ex.exerciseId]: legacyUrl }))
              gifCacheRef.current[ex.exerciseId] = legacyUrl
              localStorage.setItem(GIF_CACHE_KEY, JSON.stringify(gifCacheRef.current))
              continue
            }
          }

          // Fallback to API lookup (rate-limited)
          const result = await findExerciseByName(ex.exerciseName)
          if (result?.gifUrl) {
            setExerciseGifs(prev => ({ ...prev, [ex.exerciseId]: result.gifUrl }))
            gifCacheRef.current[ex.exerciseId] = result.gifUrl
            localStorage.setItem(GIF_CACHE_KEY, JSON.stringify(gifCacheRef.current))
          }
        } catch (err) {
          console.warn('GIF lookup failed for', ex.exerciseName, err)
        }
      }
    }

    loadGifs()
  }, [currentWorkout, getExercise])

  // Template selection view
  if (initializing && !currentWorkout) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Starting workout...</h1>
        </header>
        <Card>
          <CardContent className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Play size={32} />
            </div>
            <h3>Loading your scheduled session</h3>
            <p>Hang tight while we set up your workout.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!currentWorkout || showTemplates) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Start Workout</h1>
        </header>

        {autoStartError && (
          <div className={styles.errorBanner}>
            <AlertTriangle size={16} />
            <span>{autoStartError}</span>
          </div>
        )}

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

  if (!hasExercises) {
    return (
      <div className={styles.page}>
        <header className={styles.workoutHeader}>
          <button className={styles.backBtn} onClick={() => setShowTemplates(true)}>
            <ArrowLeft size={20} />
          </button>
          <div className={styles.workoutInfo}>
            <h1 className={styles.workoutTitle}>{currentWorkout?.templateName || 'Workout'}</h1>
            <span className={styles.progressText}>No exercises in this template</span>
          </div>
          <button className={styles.cancelBtn} onClick={handleCancel}>
            <X size={20} />
          </button>
        </header>

        <Card>
          <CardContent className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <AlertTriangle size={32} />
            </div>
            <h3>No exercises to show</h3>
            <p>Add exercises to this template or pick a different workout.</p>
            <Button onClick={() => setShowTemplates(true)}>Choose Template</Button>
            <Button variant="secondary" onClick={() => navigate('/templates')}>
              Edit Templates
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Active workout view
  const currentEx = exercisesList[activeExercise]

  if (!currentEx) {
    return (
      <div className={styles.page}>
        <header className={styles.workoutHeader}>
          <button className={styles.backBtn} onClick={() => setShowTemplates(true)}>
            <ArrowLeft size={20} />
          </button>
          <div className={styles.workoutInfo}>
            <h1 className={styles.workoutTitle}>{currentWorkout?.templateName || 'Workout'}</h1>
            <span className={styles.progressText}>We couldn&apos;t load this exercise.</span>
          </div>
          <button className={styles.cancelBtn} onClick={handleCancel}>
            <X size={20} />
          </button>
        </header>

        <Card>
          <CardContent className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <AlertTriangle size={32} />
            </div>
            <h3>Exercise data missing</h3>
            <p>Reload the workout or pick a different template.</p>
            <Button onClick={() => window.location.reload()}>Reload</Button>
            <Button variant="secondary" onClick={() => setShowTemplates(true)}>
              Choose Template
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const exerciseData = getExercise(currentEx.exerciseId)
  const alternatives = getAlternatives(currentEx.exerciseId)
  const exerciseNote = currentEx.note || ''

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
        {exercisesList.map((ex, i) => {
          const allCompleted = (ex.sets || []).every(s => s.completed)
          const someCompleted = (ex.sets || []).some(s => s.completed)
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

        {(exerciseGifs[currentEx.exerciseId] || exerciseData?.gifUrl) && (
          <div className={styles.gifPreview}>
            <ExerciseGif 
              gifUrl={exerciseGifs[currentEx.exerciseId] || exerciseData?.gifUrl}
              altSources={[
                previewMap[currentEx.exerciseId],
                previewMap[slugify(currentEx.exerciseName || '')],
                `/previews/${currentEx.exerciseId}.gif`,
                `/previews/${currentEx.exerciseId}.png`,
                `/previews/${slugify(currentEx.exerciseName || '')}.gif`,
                `/previews/${slugify(currentEx.exerciseName || '')}.png`,
                ...guessPoseSlugs(currentEx.exerciseName).map(slug => `/previews/${slug}.gif`),
                previewMap[exerciseData?.category],
                '/previews/generic.svg',
                cdnGifUrl(currentEx.exerciseId),
                exerciseData?.gifUrl ? cdnLegacyUrl(exerciseData.gifUrl.split('/').pop()) : null,
              ]}
              name={currentEx.exerciseName}
              category={exerciseData?.category}
              equipment={exerciseData?.equipment}
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
          {(currentEx.sets || []).map((set, setIdx) => (
            <motion.div
              key={setIdx}
              className={`${styles.setRow} ${set?.completed ? styles.setCompleted : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: setIdx * 0.05 }}
            >
              <span className={styles.setNum}>{setIdx + 1}</span>
              <span className={styles.setTarget}>{set?.reps} reps</span>
              <div className={styles.setWeight}>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={set?.weight ?? 0}
                  onChange={(e) => handleUpdateSet(activeExercise, setIdx, 'weight', parseFloat(e.target.value) || 0)}
                />
                <span className={styles.weightUnit}>kg</span>
              </div>
              <button
                className={`${styles.setBtn} ${set?.completed ? styles.done : ''}`}
                onClick={() => !set?.completed && handleCompleteSet(activeExercise, setIdx)}
                disabled={!!set?.completed}
              >
                {set?.completed ? <Check size={18} /> : 'Done'}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className={styles.notesCard}>
        <div className={styles.notesHeader}>
          <span>Notes & modifications</span>
          <span className={styles.notesHint}>Optional</span>
        </div>
        <textarea
          value={exerciseNote}
          onChange={(e) => updateExerciseNote(activeExercise, e.target.value)}
          placeholder="Record form cues, equipment changes, or weights used..."
        />
      </div>

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
              {(exerciseGifs[alt.id] || alt.gifUrl) && (
                <ExerciseGif 
                  gifUrl={exerciseGifs[alt.id] || alt.gifUrl}
                  altSources={[
                    previewMap[alt.id],
                    previewMap[slugify(alt.name || '')],
                    `/previews/${alt.id}.gif`,
                    `/previews/${alt.id}.png`,
                    `/previews/${slugify(alt.name || '')}.gif`,
                    `/previews/${slugify(alt.name || '')}.png`,
                    ...guessPoseSlugs(alt.name).map(slug => `/previews/${slug}.gif`),
                    previewMap[alt.category],
                    '/previews/generic.svg',
                    cdnGifUrl(alt.id),
                    alt.gifUrl ? cdnLegacyUrl(alt.gifUrl.split('/').pop()) : null,
                  ]}
                  name={alt.name}
                  category={alt.category}
                  equipment={alt.equipment}
                  size="sm"
                />
              )}
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
