// lib/seo.ts
import { HOSTNAME } from '@/constants'

export function generateSeoMetadata({
  title,
  description,
  slug,
  imgUrl
}: {
  title: string
  description?: string
  slug: string
  imgUrl?: string
}) {
  return {
    title: `${title} | 조각조각`,
    description:
      description ||
      '개발과 작업물을 기록하고, 쌓아가며 성장의 흔적을 남기는 공간!',
    openGraph: {
      title,
      description,
      url: `${HOSTNAME}/blog/${slug}`,
      images: [
        {
          url: imgUrl || '/jogakjogak.png',
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    }
  }
}
