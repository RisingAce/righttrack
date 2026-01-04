import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit3, Trash2, GripVertical, X, Save, ChevronDown, ChevronUp } from 'lucide-react'
import { useAppStore } from '../store/StoreContext'
import { Button } from '../components/Button'
import { Card, CardContent } from '../components/Card'
import { Modal } from '../components/Modal'
import { Input, Select } from '../components/Input'
import { ExercisePicker } from '../components/ExercisePicker'
import styles from './Templates.module.css'

export const Templates = () => {
  const location = useLocation()
  const { templates, exercises, createTemplate, updateTemplate, deleteTemplate, getExercise } = useAppStore()
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showPicker, setShowPicker] = useState(false)
  const [expandedId, setExpandedId] = useState(null)

  // Auto-open create modal if navigated from plus button
  useEffect(() => {
    if (location.state?.openCreate) {
      setIsCreating(true)
      // Clear the state so it doesn't reopen on refresh
      window.history.replaceState({}, document.title)
    }
  }, [location])

  const [form, setForm] = useState({
    name: '',
    exercises: []
  })

  const resetForm = () => {
    setForm({ name: '', exercises: [] })
    setIsCreating(false)
    setEditingId(null)
    setShowPicker(false)
  }

  const handleStartEdit = (template) => {
    setForm({
      name: template.name,
      exercises: template.exercises.map(ex => ({
        ...ex,
        exercise: getExercise(ex.exerciseId)
      }))
    })
    setEditingId(template.id)
    setIsCreating(true)
  }

  const handleAddExercise = (exercise) => {
    const newExercise = {
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      exercise,
      sets: [
        { reps: 10, weight: 0, type: 'normal' }
      ]
    }
    setForm(prev => ({
      ...prev,
      exercises: [...prev.exercises, newExercise]
    }))
    setShowPicker(false)
  }

  const handleRemoveExercise = (index) => {
    setForm(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }))
  }

  const handleUpdateSet = (exerciseIndex, setIndex, field, value) => {
    setForm(prev => {
      const newExercises = [...prev.exercises]
      const exercise = { ...newExercises[exerciseIndex] }
      const sets = [...exercise.sets]
      sets[setIndex] = { ...sets[setIndex], [field]: value }
      exercise.sets = sets
      newExercises[exerciseIndex] = exercise
      return { ...prev, exercises: newExercises }
    })
  }

  const handleAddSet = (exerciseIndex) => {
    setForm(prev => {
      const newExercises = [...prev.exercises]
      const exercise = { ...newExercises[exerciseIndex] }
      const lastSet = exercise.sets[exercise.sets.length - 1] || { reps: 10, weight: 0, type: 'normal' }
      exercise.sets = [...exercise.sets, { ...lastSet }]
      newExercises[exerciseIndex] = exercise
      return { ...prev, exercises: newExercises }
    })
  }

  const handleRemoveSet = (exerciseIndex, setIndex) => {
    setForm(prev => {
      const newExercises = [...prev.exercises]
      const exercise = { ...newExercises[exerciseIndex] }
      exercise.sets = exercise.sets.filter((_, i) => i !== setIndex)
      newExercises[exerciseIndex] = exercise
      return { ...prev, exercises: newExercises }
    })
  }

  const handleSave = () => {
    if (!form.name.trim() || form.exercises.length === 0) return

    const templateData = {
      name: form.name,
      exercises: form.exercises.map(({ exercise, ...rest }) => rest)
    }

    if (editingId) {
      updateTemplate(editingId, templateData)
    } else {
      createTemplate(templateData)
    }
    resetForm()
  }

  const handleDelete = (id) => {
    if (confirm('Delete this template?')) {
      deleteTemplate(id)
    }
  }

  const selectedIds = form.exercises.map(e => e.exerciseId)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Templates</h1>
        <Button
          icon={Plus}
          size="sm"
          onClick={() => setIsCreating(true)}
        >
          New
        </Button>
      </header>

      {templates.length === 0 && !isCreating ? (
        <Card delay={0.1}>
          <CardContent className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Plus size={32} />
            </div>
            <h3>No Templates Yet</h3>
            <p>Create workout templates to quickly start your training sessions.</p>
            <Button onClick={() => setIsCreating(true)}>Create Template</Button>
          </CardContent>
        </Card>
      ) : (
        <div className={styles.list}>
          {templates.map((template, i) => (
            <Card key={template.id} delay={i * 0.05} className={styles.templateCard}>
              <CardContent>
                <div className={styles.templateHeader}>
                  <button
                    className={styles.expandBtn}
                    onClick={() => setExpandedId(expandedId === template.id ? null : template.id)}
                  >
                    <div>
                      <h3 className={styles.templateName}>{template.name}</h3>
                      <p className={styles.templateMeta}>
                        {template.exercises.length} exercises
                      </p>
                    </div>
                    {expandedId === template.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <div className={styles.templateActions}>
                    <button className={styles.actionBtn} onClick={() => handleStartEdit(template)}>
                      <Edit3 size={18} />
                    </button>
                    <button className={styles.actionBtn} onClick={() => handleDelete(template.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === template.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={styles.exerciseList}
                    >
                      {template.exercises.map((ex, idx) => {
                        const exerciseData = getExercise(ex.exerciseId)
                        return (
                          <div key={idx} className={styles.exercisePreview}>
                            <span className={styles.exerciseIndex}>{idx + 1}</span>
                            <div className={styles.exerciseInfo}>
                              <span className={styles.exerciseNameSmall}>
                                {ex.exerciseName || exerciseData?.name}
                              </span>
                              <span className={styles.exerciseSets}>
                                {ex.sets.length} sets
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={isCreating}
        onClose={resetForm}
        title={editingId ? 'Edit Template' : 'New Template'}
        size="lg"
      >
        <div className={styles.form}>
          <Input
            label="Template Name"
            placeholder="e.g., Push Day, Leg Day"
            value={form.name}
            onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
          />

          <div className={styles.formSection}>
            <div className={styles.formSectionHeader}>
              <h4>Exercises</h4>
              <Button
                variant="ghost"
                size="sm"
                icon={Plus}
                onClick={() => setShowPicker(true)}
              >
                Add
              </Button>
            </div>

            {form.exercises.length === 0 ? (
              <div className={styles.noExercises}>
                <p>No exercises added yet</p>
              </div>
            ) : (
              <div className={styles.formExercises}>
                {form.exercises.map((ex, exIdx) => (
                  <div key={exIdx} className={styles.formExercise}>
                    <div className={styles.formExerciseHeader}>
                      <div className={styles.formExerciseInfo}>
                        <GripVertical size={16} className={styles.grip} />
                        <span className={styles.formExerciseName}>
                          {ex.exerciseName || ex.exercise?.name}
                        </span>
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => handleRemoveExercise(exIdx)}
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className={styles.setsGrid}>
                      <div className={styles.setHeader}>
                        <span>Set</span>
                        <span>Reps</span>
                        <span>Weight (kg)</span>
                        <span></span>
                      </div>
                      {ex.sets.map((set, setIdx) => (
                        <div key={setIdx} className={styles.setRow}>
                          <span className={styles.setNum}>{setIdx + 1}</span>
                          <input
                            type="number"
                            value={set.reps}
                            onChange={(e) => handleUpdateSet(exIdx, setIdx, 'reps', parseInt(e.target.value) || 0)}
                            className={styles.setInput}
                          />
                          <input
                            type="number"
                            value={set.weight}
                            onChange={(e) => handleUpdateSet(exIdx, setIdx, 'weight', parseFloat(e.target.value) || 0)}
                            className={styles.setInput}
                          />
                          <button
                            className={styles.removeSetBtn}
                            onClick={() => handleRemoveSet(exIdx, setIdx)}
                            disabled={ex.sets.length === 1}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      className={styles.addSetBtn}
                      onClick={() => handleAddSet(exIdx)}
                    >
                      + Add Set
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.formActions}>
            <Button variant="ghost" onClick={resetForm}>Cancel</Button>
            <Button
              icon={Save}
              onClick={handleSave}
              disabled={!form.name.trim() || form.exercises.length === 0}
            >
              Save Template
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showPicker}
        onClose={() => setShowPicker(false)}
        title="Add Exercise"
        size="lg"
      >
        <ExercisePicker onSelect={handleAddExercise} selectedIds={selectedIds} />
      </Modal>
    </div>
  )
}
