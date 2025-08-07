import Image from 'next/image'
import SubNavbar from '@/components/layout/SubNavbar'

import { getPostSlug } from '@/lib/getPostSlug'
import { getContentData } from '@/lib/getContentData'
import formatDate from '@/utils/formatDate'
import { generateSeoMetadata } from '@/utils/setMeta'
import Giscus from '@/components/ui/giscus'

// ✅ 페이지 컴포넌트 (params는 Promise ❌, 그냥 객체로)
export default async function BlogContent({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { content, frontmatter } = await getContentData(slug)

  return (
    <>
      <SubNavbar
        override={{
          title: `${frontmatter.title}`,
          subTitle: `${`by 조태호 | ${formatDate(frontmatter.publishDate)}`}`
        }}
      />

      {frontmatter.imgUrl && (
        <div className="relative mb-14 h-64 w-full sm:h-96">
          <Image
            src={frontmatter.imgUrl}
            alt={`${frontmatter.title} 포스터 이미지`}
            fill
            placeholder="blur"
            blurDataURL={frontmatter.title}
            className="object-cover"
          />
        </div>
      )}

      <div className="prose dark:prose-invert">{content}</div>

      <Giscus />
    </>
  )
}

// ✅ 메타데이터 생성
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { frontmatter } = await getContentData(slug)

  return generateSeoMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    slug,
    imgUrl: frontmatter.imgUrl
  })
}

// ✅ SSG를 위한 정적 경로 생성
export async function generateStaticParams() {
  return getPostSlug()
}

// ✅ 동적 라우팅 비활성화 (SSG 전용)
export const dynamicParams = false
