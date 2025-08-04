import { Inter } from 'next/font/google'
import './globals.css'
import ToastProvider from '../components/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Wallet System - Your Money. Your Control.',
  description: 'Secure wallet system for recharging, storing, and spending money seamlessly.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}