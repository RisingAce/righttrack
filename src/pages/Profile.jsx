import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Edit3, Check, Download, Trash2, Info } from 'lucide-react'
import { useAppStore } from '../store/StoreContext'
import { Button } from '../components/Button'
import { Card, CardContent } from '../components/Card'
import { Input } from '../components/Input'
import { Modal } from '../components/Modal'
import styles from './Profile.module.css'

export const Profile = () => {
  const { user, updateUser, workoutLogs, templates, getWorkoutStats } = useAppStore()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user.name || '')
  const [showAbout, setShowAbout] = useState(false)
  const stats = getWorkoutStats()

  const handleSave = () => {
    updateUser({ name: name.trim() })
    setIsEditing(false)
  }

  const handleExport = () => {
    const data = {
      user,
      templates,
      workoutLogs,
      exportedAt: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `righttrack-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleClearData = () => {
    if (confirm('This will delete all your data. Are you sure?')) {
      localStorage.removeItem('righttrack_data')
      window.location.reload()
    }
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Profile</h1>
        <button className={styles.infoBtn} onClick={() => setShowAbout(true)}>
          <Info size={20} />
        </button>
      </header>

      <motion.div
        className={styles.profileCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className={styles.avatar}>
          <User size={40} />
        </div>
        
        {isEditing ? (
          <div className={styles.editForm}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              autoFocus
            />
            <div className={styles.editActions}>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button size="sm" icon={Check} onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.profileInfo}>
            <h2 className={styles.profileName}>{user.name || 'Athlete'}</h2>
            <p className={styles.memberSince}>Member since {memberSince}</p>
            <Button
              variant="ghost"
              size="sm"
              icon={Edit3}
              onClick={() => setIsEditing(true)}
            >
              Edit Name
            </Button>
          </div>
        )}
      </motion.div>

      <section className={styles.statsSection}>
        <h3 className={styles.sectionTitle}>Your Stats</h3>
        <div className={styles.statsGrid}>
          <Card delay={0.15} className={styles.statCard}>
            <CardContent>
              <span className={styles.statValue}>{stats.totalWorkouts}</span>
              <span className={styles.statLabel}>Workouts</span>
            </CardContent>
          </Card>
          <Card delay={0.2} className={styles.statCard}>
            <CardContent>
              <span className={styles.statValue}>{stats.totalSets}</span>
              <span className={styles.statLabel}>Sets</span>
            </CardContent>
          </Card>
          <Card delay={0.25} className={styles.statCard}>
            <CardContent>
              <span className={styles.statValue}>{templates.length}</span>
              <span className={styles.statLabel}>Templates</span>
            </CardContent>
          </Card>
          <Card delay={0.3} className={styles.statCard}>
            <CardContent>
              <span className={styles.statValue}>{stats.streak}</span>
              <span className={styles.statLabel}>Day Streak</span>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className={styles.actionsSection}>
        <h3 className={styles.sectionTitle}>Data</h3>
        <Card delay={0.35}>
          <CardContent className={styles.actionsList}>
            <button className={styles.actionItem} onClick={handleExport}>
              <Download size={20} />
              <div className={styles.actionInfo}>
                <span className={styles.actionName}>Export Data</span>
                <span className={styles.actionDesc}>Download your workout history</span>
              </div>
            </button>
            <button className={`${styles.actionItem} ${styles.danger}`} onClick={handleClearData}>
              <Trash2 size={20} />
              <div className={styles.actionInfo}>
                <span className={styles.actionName}>Clear All Data</span>
                <span className={styles.actionDesc}>Delete all workouts and templates</span>
              </div>
            </button>
          </CardContent>
        </Card>
      </section>

      <Modal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
        title="About RightTrack"
        size="sm"
      >
        <div className={styles.aboutContent}>
          <div className={styles.aboutLogo}>
            <svg viewBox="0 0 100 100" className={styles.aboutIcon}>
              <defs>
                <linearGradient id="aboutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#6ee7b7' }} />
                  <stop offset="100%" style={{ stopColor: '#34d399' }} />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="45" fill="var(--color-bg-primary)"/>
              <path d="M30 50 L45 65 L70 35" stroke="url(#aboutGrad)" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>RightTrack</h3>
          <p className={styles.aboutVersion}>Version 1.0.0</p>
          <p className={styles.aboutDesc}>
            Your personal workout companion. Track exercises, manage templates, 
            and never miss a workout even when equipment is busy.
          </p>
          <div className={styles.aboutFeatures}>
            {[
              'Workout Templates',
              'Exercise Alternatives',
              'Progress Tracking',
              'Works Offline',
            ].map((label) => (
              <span key={label}>
                <Check size={14} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}
