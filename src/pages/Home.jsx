import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Plus, Flame, Trophy, Calendar, ChevronRight, Sparkles, Dumbbell, CheckCircle2 } from 'lucide-react'
import { useAppStore } from '../store/StoreContext'
import { Button } from '../components/Button'
import { Card, CardContent } from '../components/Card'
import styles from './Home.module.css'

const DAY_KEYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const DAY_LABELS = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

export const Home = () => {
  const navigate = useNavigate()
  const { user, templates, currentWorkout, getWorkoutStats, getTodayTemplate, startWorkout, weeklySchedule } = useAppStore()
  const stats = getWorkoutStats()

  const todayWorkout = getTodayTemplate()
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
  const [selectedDay, setSelectedDay] = useState(DAY_KEYS[todayIdx])

  const getTemplateForDay = (dayKey) => {
    const templateId = weeklySchedule?.[dayKey]
    if (!templateId) return null
    return templates.find(t => t.id === templateId) || null
  }

  const selectedTemplate = getTemplateForDay(selectedDay)

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const handleStartSelectedWorkout = () => {
    const template = selectedTemplate || todayWorkout
    if (template) {
      // Pass the template ID to the workout page so it can self-start safely
      startWorkout(template.id)
      navigate('/workout', { state: { startTemplateId: template.id, from: 'home' } })
    }
  }

  const handleChooseDifferentWorkout = () => {
    // Navigate to workout page without starting a workout
    // The workout page will show template selection
    navigate('/workout')
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.greeting}>{greeting()}</p>
          <h1 className={styles.name}>{user.name || 'Athlete'}</h1>
        </motion.div>
        <motion.div
          className={styles.logo}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Sparkles className={styles.logoIcon} />
        </motion.div>
      </header>

      {currentWorkout && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className={styles.activeWorkout} onClick={() => navigate('/workout')}>
            <CardContent>
              <div className={styles.activeHeader}>
                <div className={styles.activeIndicator}>
                  <span className={styles.activePulse} />
                  <span>In Progress</span>
                </div>
                <ChevronRight size={20} />
              </div>
              <h3 className={styles.activeTitle}>{currentWorkout.templateName}</h3>
              <p className={styles.activeSubtitle}>
                Pick up where you left off
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <section className={styles.stats}>
        <motion.div
          className={styles.statCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Flame className={styles.statIcon} />
          <div className={styles.statContent}>
            <span className={styles.statValue}>{stats.streak}</span>
            <span className={styles.statLabel}>Day Streak</span>
          </div>
        </motion.div>

        <motion.div
          className={styles.statCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Calendar className={styles.statIcon} />
          <div className={styles.statContent}>
            <span className={styles.statValue}>{stats.thisWeek}</span>
            <span className={styles.statLabel}>This Week</span>
          </div>
        </motion.div>

        <motion.div
          className={styles.statCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Trophy className={styles.statIcon} />
          <div className={styles.statContent}>
            <span className={styles.statValue}>{stats.totalWorkouts}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
        </motion.div>
      </section>

      <section className={styles.quickStart}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Plan</h2>
          <div className={styles.dayChips}>
            {DAY_KEYS.map((day) => (
              <button
                key={day}
                className={`${styles.dayChip} ${selectedDay === day ? styles.dayChipActive : ''}`}
                onClick={() => setSelectedDay(day)}
              >
                {DAY_LABELS[day].slice(0, 3)}
              </button>
            ))}
          </div>
        </div>
        
        {selectedTemplate && !currentWorkout ? (
          <Card delay={0.2} className={styles.todayCard}>
            <CardContent>
              <div className={styles.todayHeader}>
                <span className={styles.todayBadge}>
                  <Calendar size={14} />
                  {DAY_LABELS[selectedDay]} Workout
                </span>
              </div>
              <h3 className={styles.todayTitle}>{selectedTemplate.name}</h3>
              {selectedTemplate.description && (
                <p className={styles.todayDescription}>{selectedTemplate.description}</p>
              )}
              
              <div className={styles.todayExercises}>
                <div className={styles.exercisesHeader}>
                  <Dumbbell size={18} />
                  <span>{selectedTemplate.exercises.length} Exercises</span>
                </div>
                
                {selectedTemplate.exercises.map((exercise, idx) => (
                  <motion.div
                    key={idx}
                    className={styles.exerciseItem}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                  >
                    <div className={styles.exerciseNumber}>{idx + 1}</div>
                    <div className={styles.exerciseDetails}>
                      <span className={styles.exerciseName}>{exercise.exerciseName}</span>
                      <div className={styles.exerciseSets}>
                        {exercise.sets.map((set, setIdx) => (
                          <span key={setIdx} className={styles.setInfo}>
                            {set.reps} reps
                            {set.weight > 0 && ` x ${set.weight}kg`}
                          </span>
                        ))}
                      </div>
                    </div>
                    <CheckCircle2 size={16} className={styles.exerciseCheck} />
                  </motion.div>
                ))}
              </div>
              
              <div className={styles.workoutActions}>
                <Button
                  icon={Play}
                  onClick={handleStartSelectedWorkout}
                  fullWidth
                  className={styles.startBtn}
                >
                  Start {DAY_LABELS[selectedDay]}
                </Button>
                <button 
                  className={styles.altWorkoutBtn}
                  onClick={handleChooseDifferentWorkout}
                >
                  or choose a different workout
                </button>
              </div>
            </CardContent>
          </Card>
        ) : !currentWorkout ? (
          <Card delay={0.2}>
            <CardContent className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <Calendar size={32} />
              </div>
              <h3>No Workout Scheduled</h3>
              <p>Plan your week with pre-built templates or create your own.</p>
              <div className={styles.emptyActions}>
                <Button onClick={() => navigate('/schedule')} fullWidth>
                  View Schedule
                </Button>
                <Button variant="secondary" onClick={() => navigate('/templates')} fullWidth>
                  Browse Templates
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </section>

      {templates.length > 0 && (
        <section className={styles.templates}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Your Templates</h2>
            <button className={styles.viewAll} onClick={() => navigate('/templates')}>
              View All
            </button>
          </div>
          <div className={styles.templateGrid}>
            {templates.slice(0, 3).map((template, i) => (
              <Card
                key={template.id}
                variant="compact"
                delay={0.1 + i * 0.05}
                onClick={() => navigate('/templates')}
                className={styles.templateCard}
              >
                <CardContent>
                  <h4 className={styles.templateName}>{template.name}</h4>
                  <p className={styles.templateExercises}>
                    {template.exercises.length} exercises
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
