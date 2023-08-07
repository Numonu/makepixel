import React from 'react'
import ReactDOM from 'react-dom/client'
import './global/styles/defaults.css'
import Routing from './pages/routing'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routing/>
  </React.StrictMode>,
)
