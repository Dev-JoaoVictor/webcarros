import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './App.tsx'
import { Toaster } from 'react-hot-toast'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
