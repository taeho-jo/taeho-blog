import { getMdxMetadata } from '@/lib/getPostMetadata'
import Link from 'next/link'
import formatDate from '@/utils/formatDate'
import SubNavbar from '@/components/SubNavbar'

const allBlogData = await getMdxMetadata()

const BlogList = () => {
  return (
    <div className={'pt-24 md:pt-40'}>
      <SubNavbar
        title={'깨작깨작'}
        subTitle={'공부하면서 배운 것들을 남겨두는 곳'}
      />

      {allBlogData.map(blogData => (
        <article
          key={blogData.slug}
          className="group my-8 transition-all duration-300 ease-out hover:opacity-100">
          <Link
            href={`/blog/${blogData.slug}`}
            className="flex flex-wrap items-center justify-between">
            {/* 제목 */}
            <h3 className="group-hover:text-highlight decoration-highlight transition-all duration-200 group-hover:scale-110 group-hover:underline group-hover:underline-offset-4">
              {blogData.title}
            </h3>

            {/* 날짜 */}
            <p className="group-hover:text-highlight decoration-highlight text-xs transition-all duration-200 group-hover:underline group-hover:underline-offset-4">
              {formatDate(blogData.publishDate)}
            </p>
          </Link>
        </article>
      ))}
    </div>
  )
}

export default BlogList
