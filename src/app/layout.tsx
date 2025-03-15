import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR, Gowun_Batang } from 'next/font/google'
import '../styles/globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import Footer from '@/components/layout/Footer'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { HOSTNAME } from '@/constants'

const notoSansFont = Noto_Sans_KR({
  subsets: ['latin'],
  weight: '700'
})

const gowonFont = Gowun_Batang({
  subsets: ['latin'],
  weight: '700'
})

export const metadata: Metadata = {
  title: '조각조각 | 기록이 모여 흔적이 되는 공간',
  description:
    '조각조각은 개발과 작업물을 기록하고, 쌓아가며 성장의 흔적을 남기는 공간! 부담 없이 들러서 개발자의 여정을 보고 가세요!',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon-180x180.png'
  },
  manifest: '/manifest.json',
  keywords:
    'React, JavaScript, TypeScript, Next.js, SEO, 웹 개발, 개발 블로그, 기술 블로그, 프로젝트 공유, 개발 기록',
  authors: [{ name: '조각조각', url: `${HOSTNAME}` }],
  metadataBase: new URL('https://taeho-blog.vercel.app'),
  openGraph: {
    title: '조각조각 | 기록이 모여 흔적이 되는 공간',
    description:
      '조각조각은 개발과 작업물을 기록하고, 쌓아가며 성장의 흔적을 남기는 공간! 부담 없이 들러서 개발자의 여정을 보고 가세요!',
    url: `${HOSTNAME}`,
    siteName: '조각조각 | 기록이 모여 흔적이 되는 공간',
    images: [
      {
        url: '/jogakjogak.png',
        width: 1280,
        height: 720,
        alt: '조각조각 | 기록이 모여 흔적이 되는 공간'
      }
    ],
    type: 'website'
  }
  // twitter: {
  //   card: 'summary_large_image',
  //   title: '조각조각 | 기록이 모여 흔적이 되는 공간',
  //   description:
  //     '조각조각은 개발과 작업물을 기록하고, 쌓아가며 성장의 흔적을 남기는 공간! 부담 없이 들러서 개발자의 여정을 보고 가세요!',
  //   images: ['/jogakjogak.png']
  // }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F9FA' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' }
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' // 노치 영역을 고려한 설정
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={`min-h-[100svh] w-full min-w-[320px] ${gowonFont.className} ${notoSansFont.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem>
          {/*<Navbar />*/}
          <div className="flex min-h-screen w-full flex-col items-center">
            <main className="w-full max-w-screen-sm flex-1 px-4 pb-16 pt-16 md:px-0 md:pt-40">
              {children}
              <SpeedInsights />
            </main>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
