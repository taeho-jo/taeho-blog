import fs from 'fs/promises'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getPostSlug } from '@/lib/getPostSlug'
import SubNavbar from '@/components/SubNavbar'
import formatDate from '@/utils/formatDate'
import Image from 'next/image'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypePrism from 'rehype-prism-plus'
import rehypeCodeTitles from 'rehype-code-titles'

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
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeCodeTitles, rehypePrism], // ⭐ 여기에 꼭 넣어야 함
        format: 'mdx'
      }
    }
  })

  return { content, frontmatter }
}

// ✅ `generateMetadata`에서 중복 호출 없이 메타데이터 설정
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
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
export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { content, frontmatter } = await getPostData(slug)
  // const mdxSource = await parseMDX(fileContent)

  return (
    <>
      <SubNavbar
        title={frontmatter.title}
        subTitle={`by 조태호 | ${formatDate(frontmatter.publishDate)}`}
      />

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

      <div className={'prose dark:prose-invert'}>{content}</div>
      {/*<div className={'prose dark:prose-invert'}>*/}
      {/*  <MDXRemote>{...mdxSource}</MDXRemote>*/}
      {/*  /!*{content}*!/*/}
      {/*</div>*/}
    </>
  )
}

// ✅ 정적 경로 생성 (SSG 지원)
export async function generateStaticParams() {
  return getPostSlug()
}

// ✅ 동적 라우팅 사용 안 함 (SSG 적용)
export const dynamicParams = false
