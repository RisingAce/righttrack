import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Dumbbell, ClipboardList, BarChart3, User } from 'lucide-react'
import styles from './Layout.module.css'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/workout', icon: Dumbbell, label: 'Workout' },
  { path: '/templates', icon: ClipboardList, label: 'Templates' },
  { path: '/history', icon: BarChart3, label: 'History' },
  { path: '/profile', icon: User, label: 'Profile' },
]

export const Layout = ({ children }) => {
  const location = useLocation()

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
          {navItems.map(({ path, icon: Icon, label }) => (
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
