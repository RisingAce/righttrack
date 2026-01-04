import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Dumbbell, TrendingUp, ChevronRight } from 'lucide-react'
import { useAppStore } from '../store/StoreContext'
import { Card, CardContent } from '../components/Card'
import styles from './History.module.css'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}

const formatDuration = (start, end) => {
  const diff = new Date(end).getTime() - new Date(start).getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (hours > 0) return `${hours}h ${mins}m`
  return `${minutes}m`
}

export const History = () => {
  const { workoutLogs, getWorkoutStats, getExercise } = useAppStore()
  const stats = getWorkoutStats()

  const sortedLogs = useMemo(() => {
    return [...workoutLogs].sort((a, b) => 
      new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
    )
  }, [workoutLogs])

  const groupedLogs = useMemo(() => {
    const groups = {}
    sortedLogs.forEach(log => {
      const date = new Date(log.startedAt)
      const key = date.toISOString().split('T')[0]
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(log)
    })
    return groups
  }, [sortedLogs])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>History</h1>
      </header>

      <div className={styles.statsGrid}>
        <motion.div
          className={styles.statCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Dumbbell className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{stats.totalWorkouts}</span>
            <span className={styles.statLabel}>Total Workouts</span>
          </div>
        </motion.div>

        <motion.div
          className={styles.statCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <TrendingUp className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{stats.totalSets}</span>
            <span className={styles.statLabel}>Sets Completed</span>
          </div>
        </motion.div>

        <motion.div
          className={styles.statCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Calendar className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{stats.thisWeek}</span>
            <span className={styles.statLabel}>This Week</span>
          </div>
        </motion.div>
      </div>

      {workoutLogs.length === 0 ? (
        <Card delay={0.25}>
          <CardContent className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Calendar size={32} />
            </div>
            <h3>No Workouts Yet</h3>
            <p>Complete your first workout to see your history here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className={styles.logList}>
          {Object.entries(groupedLogs).map(([dateKey, logs], groupIdx) => (
            <div key={dateKey} className={styles.logGroup}>
              <h3 className={styles.groupDate}>{formatDate(logs[0].startedAt)}</h3>
              {logs.map((log, logIdx) => {
                const completedSets = log.exercises.reduce(
                  (acc, ex) => acc + ex.sets.filter(s => s.completed).length, 
                  0
                )
                const totalSets = log.exercises.reduce(
                  (acc, ex) => acc + ex.sets.length, 
                  0
                )
                
                return (
                  <Card 
                    key={log.id} 
                    delay={groupIdx * 0.1 + logIdx * 0.05}
                    className={styles.logCard}
                  >
                    <CardContent>
                      <div className={styles.logHeader}>
                        <div className={styles.logInfo}>
                          <h4 className={styles.logName}>{log.templateName}</h4>
                          <div className={styles.logMeta}>
                            <span className={styles.logTime}>
                              <Clock size={14} />
                              {log.finishedAt && formatDuration(log.startedAt, log.finishedAt)}
                            </span>
                            <span className={styles.logSets}>
                              {completedSets}/{totalSets} sets
                            </span>
                          </div>
                        </div>
                        <div className={styles.logProgress}>
                          <div className={styles.logProgressRing}>
                            <svg viewBox="0 0 36 36">
                              <path
                                className={styles.ringBg}
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                className={styles.ringFill}
                                strokeDasharray={`${(completedSets / totalSets) * 100}, 100`}
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                            <span className={styles.ringPercent}>
                              {Math.round((completedSets / totalSets) * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.logExercises}>
                        {log.exercises.slice(0, 3).map((ex, i) => {
                          const exerciseData = getExercise(ex.exerciseId)
                          return (
                            <span key={i} className={styles.logExercise}>
                              {ex.exerciseName || exerciseData?.name}
                            </span>
                          )
                        })}
                        {log.exercises.length > 3 && (
                          <span className={styles.logMore}>
                            +{log.exercises.length - 3} more
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
