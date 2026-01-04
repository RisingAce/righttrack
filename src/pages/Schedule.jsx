import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ChevronRight, X, Check } from 'lucide-react'
import { useAppStore } from '../store/StoreContext'
import { Card, CardContent } from '../components/Card'
import { Modal } from '../components/Modal'
import { Button } from '../components/Button'
import styles from './Schedule.module.css'

const DAYS = [
  { key: 'monday', label: 'Monday', short: 'Mon' },
  { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
  { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
  { key: 'thursday', label: 'Thursday', short: 'Thu' },
  { key: 'friday', label: 'Friday', short: 'Fri' },
  { key: 'saturday', label: 'Saturday', short: 'Sat' },
  { key: 'sunday', label: 'Sunday', short: 'Sun' },
]

export const Schedule = () => {
  const { templates, weeklySchedule, setDayTemplate } = useAppStore()
  const [selectedDay, setSelectedDay] = useState(null)
  const [showPicker, setShowPicker] = useState(false)

  const handleDayClick = (day) => {
    setSelectedDay(day)
    setShowPicker(true)
  }

  const handleSelectTemplate = (templateId) => {
    if (selectedDay) {
      setDayTemplate(selectedDay, templateId)
      setShowPicker(false)
      setSelectedDay(null)
    }
  }

  const handleRemoveTemplate = (day) => {
    setDayTemplate(day, null)
  }

  const getTodayKey = () => {
    const dayIndex = new Date().getDay()
    return DAYS[dayIndex === 0 ? 6 : dayIndex - 1].key
  }

  const todayKey = getTodayKey()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Weekly Schedule</h1>
        <div className={styles.subtitle}>Plan your workout week</div>
      </header>

      <div className={styles.calendar}>
        {DAYS.map((day, index) => {
          const templateId = weeklySchedule[day.key]
          const template = templates.find(t => t.id === templateId)
          const isToday = day.key === todayKey

          return (
            <Card
              key={day.key}
              delay={index * 0.05}
              className={`${styles.dayCard} ${isToday ? styles.today : ''}`}
            >
              <CardContent>
                <div className={styles.dayHeader}>
                  <div className={styles.dayInfo}>
                    <span className={styles.dayShort}>{day.short}</span>
                    <span className={styles.dayLabel}>{day.label}</span>
                  </div>
                  {isToday && (
                    <span className={styles.todayBadge}>Today</span>
                  )}
                </div>

                {template ? (
                  <div className={styles.assignedTemplate}>
                    <button
                      className={styles.templateButton}
                      onClick={() => handleDayClick(day.key)}
                    >
                      <div className={styles.templateInfo}>
                        <span className={styles.templateName}>{template.name}</span>
                        <span className={styles.templateMeta}>
                          {template.exercises.length} exercises
                        </span>
                      </div>
                      <ChevronRight size={16} className={styles.chevron} />
                    </button>
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemoveTemplate(day.key)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    className={styles.emptyDay}
                    onClick={() => handleDayClick(day.key)}
                  >
                    <span className={styles.emptyText}>Rest day</span>
                    <span className={styles.emptyAction}>Tap to schedule</span>
                  </button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Modal
        isOpen={showPicker}
        onClose={() => setShowPicker(false)}
        title={`Schedule ${selectedDay ? DAYS.find(d => d.key === selectedDay)?.label : 'Day'}`}
        size="md"
      >
        <div className={styles.templateList}>
          <button
            className={styles.templateOption}
            onClick={() => handleSelectTemplate(null)}
          >
            <div className={styles.templateOptionInfo}>
              <span className={styles.templateOptionName}>Rest Day</span>
              <span className={styles.templateOptionDesc}>No workout scheduled</span>
            </div>
            {weeklySchedule[selectedDay] === null && (
              <Check size={20} className={styles.checkIcon} />
            )}
          </button>

          {templates.map((template) => {
            const isSelected = weeklySchedule[selectedDay] === template.id
            
            return (
              <button
                key={template.id}
                className={`${styles.templateOption} ${isSelected ? styles.selected : ''}`}
                onClick={() => handleSelectTemplate(template.id)}
              >
                <div className={styles.templateOptionInfo}>
                  <span className={styles.templateOptionName}>
                    {template.name}
                    {template.isDefault && (
                      <span className={styles.defaultBadge}>Default</span>
                    )}
                  </span>
                  <span className={styles.templateOptionDesc}>
                    {template.exercises.length} exercises · {template.description || 'Custom workout'}
                  </span>
                </div>
                {isSelected && (
                  <Check size={20} className={styles.checkIcon} />
                )}
              </button>
            )
          })}
        </div>
      </Modal>
    </div>
  )
}
