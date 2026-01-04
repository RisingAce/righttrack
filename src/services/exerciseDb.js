// ExerciseDB API Service with deep caching
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY
const API_HOST = 'exercisedb.p.rapidapi.com'
const BASE_URL = `https://${API_HOST}`

const DB_NAME = 'righttrack_exercise_cache'
const DB_VERSION = 1
const STORE_NAME = 'exercises'
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

// Initialize IndexedDB
const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        store.createIndex('name', 'name', { unique: false })
        store.createIndex('equipment', 'equipment', { unique: false })
        store.createIndex('target', 'target', { unique: false })
        store.createIndex('bodyPart', 'bodyPart', { unique: false })
      }
    }
  })
}

// Get from IndexedDB
const getFromCache = async (key) => {
  try {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.get(key)
      
      request.onsuccess = () => {
        const data = request.result
        if (data && data.timestamp && Date.now() - data.timestamp < CACHE_DURATION) {
          resolve(data)
        } else {
          resolve(null)
        }
      }
      request.onerror = () => reject(request.error)
    })
  } catch (error) {
    console.error('Cache read error:', error)
    return null
  }
}

// Save to IndexedDB
const saveToCache = async (data) => {
  try {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const dataWithTimestamp = { ...data, timestamp: Date.now() }
      const request = store.put(dataWithTimestamp)
      
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  } catch (error) {
    console.error('Cache write error:', error)
  }
}

// Save all exercises to cache
const saveAllToCache = async (exercises) => {
  try {
    const db = await initDB()
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    
    for (const exercise of exercises) {
      store.put({ ...exercise, timestamp: Date.now() })
    }
    
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve()
      transaction.onerror = () => reject(transaction.error)
    })
  } catch (error) {
    console.error('Batch cache error:', error)
  }
}

// Get all from cache
const getAllFromCache = async () => {
  try {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getAll()
      
      request.onsuccess = () => {
        const exercises = request.result.filter(
          ex => ex.timestamp && Date.now() - ex.timestamp < CACHE_DURATION
        )
        resolve(exercises)
      }
      request.onerror = () => reject(request.error)
    })
  } catch (error) {
    console.error('Cache read all error:', error)
    return []
  }
}

// Make API request with headers
const fetchFromAPI = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  })
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }
  
  return response.json()
}

// Get exercise by ID
export const getExerciseById = async (id) => {
  // Try cache first
  const cached = await getFromCache(id)
  if (cached) {
    console.log('📦 Exercise from cache:', id)
    return cached
  }
  
  // Fetch from API
  try {
    console.log('🌐 Fetching exercise from API:', id)
    const data = await fetchFromAPI(`/exercises/exercise/${id}`)
    await saveToCache(data)
    return data
  } catch (error) {
    console.error('Failed to fetch exercise:', error)
    return null
  }
}

// Search exercises by name
export const searchExercises = async (query) => {
  try {
    const data = await fetchFromAPI(`/exercises/name/${query}`)
    await saveAllToCache(data)
    return data
  } catch (error) {
    console.error('Search error:', error)
    // Fallback to cache
    const cached = await getAllFromCache()
    return cached.filter(ex => 
      ex.name.toLowerCase().includes(query.toLowerCase())
    )
  }
}

// Get exercises by body part
export const getExercisesByBodyPart = async (bodyPart) => {
  try {
    const data = await fetchFromAPI(`/exercises/bodyPart/${bodyPart}`)
    await saveAllToCache(data)
    return data
  } catch (error) {
    console.error('Body part fetch error:', error)
    const cached = await getAllFromCache()
    return cached.filter(ex => ex.bodyPart === bodyPart)
  }
}

// Get exercises by equipment
export const getExercisesByEquipment = async (equipment) => {
  try {
    const data = await fetchFromAPI(`/exercises/equipment/${equipment}`)
    await saveAllToCache(data)
    return data
  } catch (error) {
    console.error('Equipment fetch error:', error)
    const cached = await getAllFromCache()
    return cached.filter(ex => ex.equipment === equipment)
  }
}

// Get all exercises (paginated)
export const getAllExercises = async (limit = 100, offset = 0) => {
  try {
    const data = await fetchFromAPI(`/exercises?limit=${limit}&offset=${offset}`)
    await saveAllToCache(data)
    return data
  } catch (error) {
    console.error('Get all error:', error)
    return await getAllFromCache()
  }
}

// Map our exercise names to ExerciseDB
export const findExerciseByName = async (name) => {
  // Try cache first
  const cached = await getAllFromCache()
  const found = cached.find(ex => 
    ex.name.toLowerCase().includes(name.toLowerCase()) ||
    name.toLowerCase().includes(ex.name.toLowerCase())
  )
  
  if (found) {
    return found
  }
  
  // Search API
  try {
    const results = await searchExercises(name.split(' ')[0])
    return results[0] || null
  } catch (error) {
    return null
  }
}

// Prefetch common exercises for offline use
export const prefetchCommonExercises = async () => {
  const commonBodyParts = ['chest', 'back', 'shoulders', 'upper legs', 'upper arms']
  
  try {
    for (const part of commonBodyParts) {
      await getExercisesByBodyPart(part)
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    console.log('✅ Prefetch complete')
  } catch (error) {
    console.error('Prefetch error:', error)
  }
}

// Get cached count (for stats)
export const getCachedExerciseCount = async () => {
  const cached = await getAllFromCache()
  return cached.length
}
