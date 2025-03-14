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
    </>
  )
}

export default ProjectPage
