import Link from 'next/link'
import { projectsData } from '@/data/projects'

const ProjectList = () => {
  return (
    <>
      {projectsData.map(data => (
        <article
          key={data.slug}
          className="group pb-8 transition-all duration-300 ease-out">
          <Link
            href={`/projects/${data.slug}`}
            className="flex flex-wrap items-center justify-between">
            {/* 제목 */}
            <h3 className="max-w-[80%] overflow-hidden truncate whitespace-nowrap text-base transition-all duration-200 sm:group-hover:text-highlight sm:group-hover:underline sm:group-hover:underline-offset-4">
              {data.title}
            </h3>

            {/* 날짜 */}
            <p className="text-xs transition-all duration-200 sm:group-hover:text-highlight sm:group-hover:underline sm:group-hover:underline-offset-4">
              {data.date}
            </p>
          </Link>
        </article>
      ))}
    </>
  )
}

export default ProjectList
