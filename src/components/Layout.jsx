import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Dumbbell, Calendar, BarChart3, User, Plus } from 'lucide-react'
import styles from './Layout.module.css'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/workout', icon: Dumbbell, label: 'Workout' },
  { path: '/schedule', icon: Calendar, label: 'Schedule' },
  { path: '/history', icon: BarChart3, label: 'History' },
  { path: '/profile', icon: User, label: 'Profile' },
]

export const Layout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleCreateTemplate = () => {
    navigate('/templates', { state: { openCreate: true } })
  }

  return (
    <div className={styles.layout}>
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
          {navItems.slice(0, 2).map(({ path, icon: Icon, label }) => (
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
          
          <motion.button
            className={styles.createBtn}
            onClick={handleCreateTemplate}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            <Plus size={28} strokeWidth={3} />
          </motion.button>

          {navItems.slice(2).map(({ path, icon: Icon, label }) => (
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
        </div>
      </nav>
    </div>
  )
}
