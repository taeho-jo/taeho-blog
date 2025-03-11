import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypePrism from 'rehype-prism-plus'
import rehypeCodeTitles from 'rehype-code-titles'

import fs from 'fs/promises'
import path from 'path'

// ✅ 중복 없이 MDX 데이터를 불러오는 함수
export async function getContentData(slug: string) {
  if (!slug) {
    throw new Error('❌ 슬러그가 제공되지 않았습니다')
  }

  const filePath = path.join(process.cwd(), `src/contents/${slug}.mdx`)
  const fileContent = await fs.readFile(filePath, 'utf8')

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
        rehypePlugins: [rehypeCodeTitles, rehypePrism],
        format: 'mdx'
      }
    }
  })

  return { content, frontmatter }
}
