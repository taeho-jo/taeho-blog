import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { BlogMetadataType } from '@/types'

export async function getMdxMetadata() {
  const contentDir = path.join(process.cwd(), 'src/contents/')

  const files = fs.readdirSync(contentDir)

  const metadataList = await Promise.all(
    files.map(async filename => {
      const filePath = path.join(contentDir, filename)
      const fileContent = fs.readFileSync(filePath, 'utf8')

      const { frontmatter } = await compileMDX<BlogMetadataType>({
        source: fileContent,
        options: { parseFrontmatter: true }
      })

      return {
        slug: filename.replace('.mdx', ''), // 파일명 기반으로 slug 생성
        ...frontmatter // frontmatter에서 메타데이터 가져오기
      }
    })
  )
  return metadataList.sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  )
}
