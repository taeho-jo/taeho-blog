'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'

// Giscus에게 보낼 메시지의 타입 정의 (타입스크립트)
type GiscusMessage = {
  giscus: {
    setConfig: {
      theme: string
    }
  }
}

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  // 현재 테마를 Giscus가 알아들을 수 있는 값으로 변환합니다.
  const giscusTheme =
    resolvedTheme === 'dark'
      ? 'http://localhost:3000/css/giscus-dark.css'
      : 'http://localhost:3000/css/giscus-light.css'

  // 1️⃣ [최초 1회 실행] Giscus 스크립트를 불러와서 댓글창을 렌더링합니다.
  useEffect(() => {
    // 이미 렌더링 되었다면 중복 실행 방지
    if (!ref.current || ref.current.hasChildNodes()) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'

    // ✅ 아래 값들은 본인의 Giscus 설정값으로 유지해주세요.
    script.setAttribute('data-repo', 'taeho-jo/taeho-blog')
    script.setAttribute('data-repo-id', 'R_kgDOOEm4CQ')
    script.setAttribute('data-category', 'General')
    script.setAttribute('data-category-id', 'DIC_kwDOOEm4Cc4Ct5Yh')

    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-lang', 'ko')
    // script.setAttribute('data-loading', 'lazy')

    // 최초 렌더링 시의 테마를 설정합니다.
    script.setAttribute('data-theme', giscusTheme)

    ref.current.appendChild(script)

    // 컴포넌트가 언마운트될 때 스크립트를 정리할 수 있습니다. (선택사항)
    return () => {
      if (ref.current) ref.current.innerHTML = ''
    }
  }, []) // 의존성 배열이 비어있으므로, 최초 1회만 실행됩니다.

  // 2️⃣ [테마가 변경될 때마다 실행] Giscus iframe에 테마 변경 메시지를 보냅니다.
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame'
    )

    if (!iframe) return

    const message: GiscusMessage = {
      giscus: {
        setConfig: {
          theme: giscusTheme
        }
      }
    }

    // giscus.app으로 메시지를 보냅니다.
    iframe.contentWindow?.postMessage(message, 'https://giscus.app')
  }, [giscusTheme]) // giscusTheme 값이 바뀔 때마다 이 effect가 실행됩니다.

  return <section ref={ref} />
}
