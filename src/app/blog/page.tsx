import { getMdxMetadata } from '@/lib/getPostMetadata'
import Link from 'next/link'

// interface BlogDataType {
//   title: string
//   description: string
//   publishDate: string
//   posterImage: string
//   categories: [string]
// }

const allBlogData = await getMdxMetadata()

const BlogList = () => {
  return (
    <>
      <h2>리스트 페이지</h2>
      {allBlogData.map(blogData => {
        return (
          <div
            key={blogData.slug}
            className={'my-8'}>
            <Link href={`/blog/${blogData.slug}`}>
              <h3>{blogData.title}</h3>
              <p>{blogData.description}</p>
              <p>{blogData.publishDate}</p>
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default BlogList
