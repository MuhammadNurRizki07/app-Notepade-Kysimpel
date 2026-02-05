import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from '@/lib/theme-context'
import { ThemeProvider as NextThemesProvider } from '@/components/theme-provider'

const geist = Geist({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'KySimpel - Catatan & Link Belajar',
  description: 'Aplikasi catatan dan link pembelajaran yang menarik',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${geist.className} font-sans antialiased`} suppressHydrationWarning>
        <NextThemesProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </NextThemesProvider>
        <Analytics />
      </body>
    </html>
  )
}
