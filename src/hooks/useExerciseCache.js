import { useEffect, useState, useRef } from 'react'
import { prefetchCommonExercises, getCachedExerciseCount } from '../services/exerciseDb'

export const useExerciseCache = () => {
  const [isPrefetching, setIsPrefetching] = useState(false)
  const [cachedCount, setCachedCount] = useState(0)
  const hasRunRef = useRef(false)

  useEffect(() => {
    if (hasRunRef.current) return
    hasRunRef.current = true

    let cancelled = false
    const loadCache = async () => {
      const count = await getCachedExerciseCount()
      if (cancelled) return
      setCachedCount(count)

      // Prefetch if cache is empty or small
      if (count < 50) {
        setIsPrefetching(true)
        try {
          await prefetchCommonExercises()
          const newCount = await getCachedExerciseCount()
          if (!cancelled) {
            setCachedCount(newCount)
          }
        } catch (error) {
          console.error('Prefetch failed:', error)
        } finally {
          if (!cancelled) {
            setIsPrefetching(false)
          }
        }
      }
    }

    loadCache()
    return () => {
      cancelled = true
    }
  }, [])

  return { isPrefetching, cachedCount }
}
