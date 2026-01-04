import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Dumbbell, Calendar, BarChart3, User, Plus, RotateCcw, LayoutList } from 'lucide-react'
import styles from './Layout.module.css'
import { usePwaRegistration } from '../hooks/usePwaRegistration'
import { PwaToast } from './PwaToast'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/workout', icon: Dumbbell, label: 'Workout' },
  { path: '/schedule', icon: Calendar, label: 'Schedule' },
  { path: '/templates', icon: LayoutList, label: 'Templates' },
  { path: '/history', icon: BarChart3, label: 'History' },
  { path: '/profile', icon: User, label: 'Profile' },
]

export const Layout = ({ children, cacheStatus }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { offlineReady, needsRefresh, refreshApp, dismiss } = usePwaRegistration()
  const [fabOpen, setFabOpen] = useState(false)
  const fabRef = useRef(null)

  const handleCreateTemplate = () => {
    navigate('/templates', { state: { openCreate: true } })
    setFabOpen(false)
  }

  const handleRefresh = () => {
    window.location.reload()
    setFabOpen(false)
  }

  const handleGo = (path) => {
    navigate(path)
    setFabOpen(false)
  }

  useEffect(() => {
    const onClick = (e) => {
      if (!fabRef.current) return
      if (!fabRef.current.contains(e.target)) {
        setFabOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const primaryItems = navItems.slice(0, 4)
  const menuItems = [
    { label: 'New Template', icon: Plus, action: handleCreateTemplate },
    { label: 'Refresh', icon: RotateCcw, action: handleRefresh },
    { label: 'History', icon: BarChart3, action: () => handleGo('/history') },
    { label: 'Profile', icon: User, action: () => handleGo('/profile') },
  ]

  return (
    <div className={styles.layout}>
      <PwaToast
        offlineReady={offlineReady}
        needsRefresh={needsRefresh}
        onRefresh={refreshApp}
        onDismiss={dismiss}
        cacheStatus={cacheStatus}
      />
      <main className={styles.main}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={styles.content}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className={styles.nav}>
        <div className={styles.navInner}>
          {primaryItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className={styles.navIndicator}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <Icon className={styles.navIcon} size={22} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={styles.navLabel}>{label}</span>
                </>
              )}
            </NavLink>
          ))}

          <div className={styles.fabWrap} ref={fabRef}>
            <motion.button
              className={`${styles.createBtn} ${fabOpen ? styles.createBtnActive : ''}`}
              onClick={() => setFabOpen((v) => !v)}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              aria-expanded={fabOpen}
              aria-haspopup="menu"
            >
              <Plus size={28} strokeWidth={3} />
            </motion.button>
            <AnimatePresence>
              {fabOpen && (
                <motion.div
                  className={styles.fabMenu}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                >
                  {menuItems.map(({ label, icon: Icon, action }) => (
                    <button key={label} className={styles.fabItem} onClick={action}>
                      <Icon size={18} />
                      <span>{label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </div>
  )
}
