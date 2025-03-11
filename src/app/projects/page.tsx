import SubNavbar from '@/components/layout/SubNavbar'
// import Link from 'next/link'
// import formatDate from '@/utils/formatDate'
import ProjectList from '@/components/project/ProjectList'

const ProjectPage = () => {
  return (
    <>
      <SubNavbar
        title={'뚝딱뚝딱'}
        subTitle={'개발하며 만든 것들을 모아 놓은 곳'}
      />

      <ProjectList />

      {/*  <article className="group pb-8 transition-all duration-300 ease-out">*/}
      {/*    <Link*/}
      {/*      href={`/`}*/}
      {/*      className="flex flex-wrap items-center justify-between">*/}
      {/*      /!* 제목 *!/*/}
      {/*      <h3 className="max-w-[80%] overflow-hidden truncate whitespace-nowrap text-base transition-all duration-200 sm:group-hover:text-highlight sm:group-hover:underline sm:group-hover:underline-offset-4">*/}
      {/*        뚝딱뚝딱1, 이런 버튼 보셨나요? 애니메이션 끝판왕 뚝딱뚝딱1, 이런*/}
      {/*        버튼 보셨나요? 애니메이션 끝판왕 뚝딱뚝딱1, 이런 버튼 보셨나요?*/}
      {/*        애니메이션 끝판왕*/}
      {/*      </h3>*/}

      {/*      /!* 날짜 *!/*/}
      {/*      <p className="text-xs transition-all duration-200 sm:group-hover:text-highlight sm:group-hover:underline sm:group-hover:underline-offset-4">*/}
      {/*        25.01.23*/}
      {/*      </p>*/}
      {/*    </Link>*/}
      {/*  </article>*/}

      {/*  <p*/}
      {/*    className={*/}
      {/*      'break-keep text-4xl leading-relaxed tracking-wide md:leading-loose'*/}
      {/*    }>*/}
      {/*    <span className={'underline decoration-highlight underline-offset-4'}>*/}
      {/*      뚝딱뚝딱*/}
      {/*    </span>*/}
      {/*    {''}*/}
      {/*    &nbsp; 현재 준비 중 🫥*/}
      {/*  </p>*/}
    </>
  )
}

export default ProjectPage
