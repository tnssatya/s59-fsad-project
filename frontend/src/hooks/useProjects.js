import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export function useProjects() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useProjects must be used within AppProvider')
  }
  return context;
}
