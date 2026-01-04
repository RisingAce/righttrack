import { Routes, Route } from 'react-router-dom'
import { StoreProvider } from './store/StoreContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Workout } from './pages/Workout'
import { Templates } from './pages/Templates'
import { History } from './pages/History'
import { Profile } from './pages/Profile'

function App() {
  return (
    <StoreProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </StoreProvider>
  )
}

export default App
