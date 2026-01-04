import { useEffect, useState } from 'react'
import { registerSW } from 'virtual:pwa-register'

export const usePwaRegistration = () => {
  const [offlineReady, setOfflineReady] = useState(false)
  const [needsRefresh, setNeedsRefresh] = useState(false)
  const [updateServiceWorker, setUpdateServiceWorker] = useState(null)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const updateSW = registerSW({
      immediate: true,
      onOfflineReady: () => setOfflineReady(true),
      onNeedRefresh: () => setNeedsRefresh(true),
    })

    setUpdateServiceWorker(() => updateSW)

    return () => {
      setOfflineReady(false)
      setNeedsRefresh(false)
    }
  }, [])

  const refreshApp = () => {
    if (updateServiceWorker) {
      updateServiceWorker(true)
    } else if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  const dismiss = () => {
    setOfflineReady(false)
    setNeedsRefresh(false)
  }

  return { offlineReady, needsRefresh, refreshApp, dismiss }
}

