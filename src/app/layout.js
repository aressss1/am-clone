'use client'

import { Provider } from 'react-redux'
import './globals.css'
import { Inter } from 'next/font/google'
import { store } from '@/app/store/store'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'E-Commerce App',
  description: 'E-Commerce App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}  >
        <Header />
        {children}
        </Provider>
        </body>
    </html>
  )
}
