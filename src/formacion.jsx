import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FormacionGratis from './FormacionGratis.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormacionGratis />
  </StrictMode>,
)
