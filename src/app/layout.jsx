'use client'

import { Provider } from 'react-redux'
import './globals.css'
import { persistor, store } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react'




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Provider store={store} >
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
