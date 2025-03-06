import { getPostSlug } from '@/lib/getPostSlug'
import { getMdxMetadata } from '@/lib/getPostMetadata'
import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { BlogMetadataType } from '@/types'

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const filePath = path.join(process.cwd(), `src/content/${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')

  // ✅ MDX 파싱: Frontmatter + 본문 분리
  const { content } = await compileMDX<{ frontmatter: BlogMetadataType }>({
    source: fileContent,
    options: { parseFrontmatter: true }
  })

  // const { default: Post } = await import(`@/content/${slug}.mdx`)
  // return <Post />
  return <div>{content} 123</div>
}

export async function generateStaticParams() {
  return getPostSlug()
}

export const dynamicParams = false
