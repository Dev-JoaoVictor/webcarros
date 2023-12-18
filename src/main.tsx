import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './App.tsx'
import { Toaster } from 'react-hot-toast'
import './index.css'

import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
