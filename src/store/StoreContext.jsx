import { createContext, useContext } from 'react'
import { useStore } from './useStore'

const StoreContext = createContext(null)

export const StoreProvider = ({ children }) => {
  const store = useStore()
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

export const useAppStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useAppStore must be used within a StoreProvider')
  }
  return context
}
