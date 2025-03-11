import { getAllBlogData } from '@/lib/getAllBlogData'
import Link from 'next/link'
import formatDate from '@/utils/formatDate'

const allBlogData = await getAllBlogData()

const BlogListComponent = () => {
  return (
    <>
      {allBlogData.map(blogData => (
        <article
          key={blogData.slug}
          className="group pb-6 transition-all duration-300 ease-out">
          <Link
            href={`/blog/${blogData.slug}`}
            className="flex flex-wrap items-center justify-between">
            {/* 제목 */}
            <h3 className="max-w-[80%] overflow-hidden truncate whitespace-nowrap text-base transition-all duration-200 sm:group-hover:text-highlight sm:group-hover:underline sm:group-hover:underline-offset-4">
              {blogData.title}
            </h3>

            {/* 날짜 */}
            <p className="text-xs transition-all duration-200 sm:group-hover:text-highlight sm:group-hover:underline sm:group-hover:underline-offset-4">
              {formatDate(blogData.publishDate)}
            </p>
          </Link>
        </article>
      ))}
    </>
  )
}

export default BlogListComponent
