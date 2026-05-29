import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import store from './store/store.js'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: 'Lato, sans-serif',
            fontSize: '0.9rem',
            backgroundColor: '#2e1a00',
            color: '#fff8e7',
            border: '1px solid rgba(212,160,23,0.3)',
            borderRadius: '12px',
            padding: '0.8rem 1.2rem',
          },
          success: {
            iconTheme: {
              primary: '#d4a017',
              secondary: '#1c0f00',
            },
          },
          error: {
            iconTheme: {
              primary: '#dc2626',
              secondary: '#fff8e7',
            },
          },
        }}
      />
      <App />
    </Provider>
  </StrictMode>,
)
