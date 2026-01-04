import { AnimatePresence, motion } from 'framer-motion'
import { RefreshCw, Download, X, WifiOff } from 'lucide-react'
import styles from './PwaToast.module.css'

export const PwaToast = ({
  offlineReady,
  needsRefresh,
  onRefresh,
  onDismiss,
  cacheStatus,
}) => {
  const { isPrefetching, cachedCount } = cacheStatus || {}

  const offlineMessage = isPrefetching
    ? `Caching exercises${cachedCount ? ` (${cachedCount} saved)` : ''}...`
    : offlineReady
      ? 'Ready to keep going offline'
      : null

  return (
    <div className={styles.wrapper} aria-live="polite">
      <AnimatePresence>
        {needsRefresh && (
          <motion.div
            key="update"
            className={`${styles.toast} ${styles.update}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.iconWrap}>
              <RefreshCw size={18} />
            </div>
            <div className={styles.copy}>
              <p className={styles.title}>Update ready</p>
              <p className={styles.subtitle}>Reload to get the latest workout flow.</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.actionButton} onClick={onRefresh}>
                Reload
              </button>
              <button
                className={styles.dismiss}
                onClick={onDismiss}
                aria-label="Dismiss update notice"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}

        {offlineMessage && (
          <motion.div
            key="offline"
            className={`${styles.toast} ${styles.offline}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.iconWrap}>
              {isPrefetching ? <Download size={18} /> : <WifiOff size={18} />}
            </div>
            <div className={styles.copy}>
              <p className={styles.title}>
                {isPrefetching ? 'Preparing offline mode' : 'Offline ready'}
              </p>
              <p className={styles.subtitle}>{offlineMessage}</p>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.dismiss}
                onClick={onDismiss}
                aria-label="Dismiss offline notice"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

