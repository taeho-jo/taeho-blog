import fs from 'fs/promises'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getPostSlug } from '@/lib/getPostSlug'

// ✅ 중복 없이 MDX 데이터를 불러오는 함수
async function getPostData(slug: string) {
  const filePath = path.join(process.cwd(), `src/contents/${slug}.mdx`)
  const fileContent = await fs.readFile(filePath, 'utf8')

  // ✅ MDX 파싱: Frontmatter + 본문 분리
  const { content, frontmatter } = await compileMDX<{
    title: string
    description: string
    publishDate: string
    imgUrl: string
  }>({
    source: fileContent,
    options: { parseFrontmatter: true }
  })

  return { content, frontmatter }
}

// ✅ `generateMetadata`에서 중복 호출 없이 메타데이터 설정
export async function generateMetadata({
  params
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const { frontmatter } = await getPostData(slug)

  return {
    title: `${frontmatter.title} | 조각조각`,
    description:
      frontmatter.description ||
      '개발과 작업물을 기록하고, 쌓아가며 성장의 흔적을 남기는 공간!',
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `https://taeho-blog.vercel.app/blog/${slug}`,
      images: [
        {
          url: frontmatter.imgUrl || '/jogakjogak.png',
          width: 1200,
          height: 630,
          alt: frontmatter.title
        }
      ]
    }
  }
}

// ✅ `Page` 컴포넌트에서 동일한 데이터 재사용
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { content } = await getPostData(slug)

  return (
    <>
      <div>{content}</div>
    </>
  )
}

// ✅ 정적 경로 생성 (SSG 지원)
export async function generateStaticParams() {
  return getPostSlug()
}

// ✅ 동적 라우팅 사용 안 함 (SSG 적용)
export const dynamicParams = false
