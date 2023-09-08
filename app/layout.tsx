import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stage Guinée',
  description: 'Une plateforme numérique novatrice et inclusive qui transforme la manière dont les jeunes dipômés guinéens accèdent à des opportinités stages locaux pertinant.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
  )
}
