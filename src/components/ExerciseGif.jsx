import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Dumbbell } from 'lucide-react'
import { getFallbackIcon } from '../assets/exercise-fallbacks'
import styles from './ExerciseGif.module.css'

export const ExerciseGif = ({ 
  gifUrl, 
  name, 
  category,
  equipment,
  size = 'md',
  showName = false,
  className = '',
  altSources = [],
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)
  const [useFallback, setUseFallback] = useState(false)

  const sourcesKey = useMemo(() => `${gifUrl || ''}|${JSON.stringify(altSources || [])}`, [gifUrl, altSources])
  const sources = useMemo(() => [gifUrl, ...(altSources || [])].filter(Boolean), [sourcesKey])
  const [sourceIndex, setSourceIndex] = useState(0)

  useEffect(() => {
    if (!sources.length) {
      setError(true)
      setLoading(false)
      return
    }
    setUseFallback(false)
    setSourceIndex(0)
  }, [sourcesKey, sources.length])

  useEffect(() => {
    if (!sources.length) {
      setError(true)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(false)

    // Preload image
    const img = new Image()
    img.referrerPolicy = 'no-referrer'
    img.crossOrigin = 'anonymous'
    img.src = sources[sourceIndex] || ''
    
    img.onload = () => {
      setImageSrc(sources[sourceIndex])
      setLoading(false)
    }
    
    img.onerror = () => {
      const nextIndex = sourceIndex + 1
      if (nextIndex < sources.length) {
        setSourceIndex(nextIndex)
      } else {
        // Try fallback icon instead of showing error
        const fallbackSrc = getFallbackIcon(category, equipment)
        if (fallbackSrc && !useFallback) {
          setUseFallback(true)
          setImageSrc(fallbackSrc)
          setLoading(false)
        } else {
          setError(true)
          setLoading(false)
        }
      }
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [sourcesKey, sources, sourceIndex, category, equipment, useFallback])

  return (
    <div className={`${styles.container} ${styles[size]} ${className}`}>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.loader}
          >
            <Loader2 className={styles.spinner} size={size === 'sm' ? 24 : 32} />
            <span className={styles.loadingText}>Loading...</span>
          </motion.div>
        )}

        {error && !loading && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.error}
          >
            <Dumbbell size={size === 'sm' ? 24 : 32} className={styles.fallbackIcon} />
          </motion.div>
        )}

        {!loading && !error && imageSrc && (
          <motion.div
            key="image"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`${styles.imageWrapper} ${useFallback ? styles.fallback : ''}`}
          >
            <img 
              src={imageSrc} 
              alt={name}
              className={styles.gif}
              loading="lazy"
            />
            {showName && (
              <div className={styles.nameOverlay}>
                <span>{name}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
