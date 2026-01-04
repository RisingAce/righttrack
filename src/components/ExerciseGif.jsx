import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, AlertCircle } from 'lucide-react'
import styles from './ExerciseGif.module.css'

export const ExerciseGif = ({ 
  gifUrl, 
  name, 
  size = 'md',
  showName = false,
  className = '' 
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    if (!gifUrl) {
      setError(true)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(false)

    // Preload image
    const img = new Image()
    img.src = gifUrl
    
    img.onload = () => {
      setImageSrc(gifUrl)
      setLoading(false)
    }
    
    img.onerror = () => {
      setError(true)
      setLoading(false)
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [gifUrl])

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
            <AlertCircle size={size === 'sm' ? 24 : 32} />
            <span className={styles.errorText}>No preview</span>
          </motion.div>
        )}

        {!loading && !error && imageSrc && (
          <motion.div
            key="image"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={styles.imageWrapper}
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
