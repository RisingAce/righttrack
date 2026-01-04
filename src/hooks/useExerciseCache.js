import { useEffect, useState } from 'react'
import { prefetchCommonExercises, getCachedExerciseCount } from '../services/exerciseDb'

export const useExerciseCache = () => {
  const [isPrefetching, setIsPrefetching] = useState(false)
  const [cachedCount, setCachedCount] = useState(0)

  useEffect(() => {
    const loadCache = async () => {
      const count = await getCachedExerciseCount()
      setCachedCount(count)

      // Prefetch if cache is empty or small
      if (count < 50) {
        setIsPrefetching(true)
        try {
          await prefetchCommonExercises()
          const newCount = await getCachedExerciseCount()
          setCachedCount(newCount)
        } catch (error) {
          console.error('Prefetch failed:', error)
        } finally {
          setIsPrefetching(false)
        }
      }
    }

    loadCache()
  }, [])

  return { isPrefetching, cachedCount }
}
