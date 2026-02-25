import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root1')).render(
  <div>
   <h1>Hello World</h1>
  </div>
)

createRoot(document.getElementById('root2')).render(
  <div>
   <h1>Hello World 2</h1>
  </div>
)
