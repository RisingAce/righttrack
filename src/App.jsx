import { Routes, Route } from 'react-router-dom'
import { StoreProvider } from './store/StoreContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Workout } from './pages/Workout'
import { Schedule } from './pages/Schedule'
import { Templates } from './pages/Templates'
import { History } from './pages/History'
import { Profile } from './pages/Profile'
import { useExerciseCache } from './hooks/useExerciseCache'

function App() {
  // Prefetch exercises on app load for offline use
  const cacheStatus = useExerciseCache()

  return (
    <StoreProvider>
      <Layout cacheStatus={cacheStatus}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </StoreProvider>
  )
}

export default App
