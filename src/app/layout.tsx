import type { Metadata } from 'next'
import { Noto_Sans_KR, Gowun_Batang } from 'next/font/google'
import '../styles/globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
// import Navbar from '@/components/Navbar'

const notoSansFont = Noto_Sans_KR({
  subsets: ['latin'],
  weight: '700'
})

const gowonFont = Gowun_Batang({
  subsets: ['latin'],
  weight: '700'
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={`h-dvh w-full ${gowonFont.className} ${notoSansFont.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem>
          {/*<Navbar />*/}
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
