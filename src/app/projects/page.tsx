import SubNavbar from '@/components/SubNavbar'

const ProjectPage = () => {
  return (
    <div className={'pt-24 md:pt-40'}>
      <SubNavbar
        title={'뚝딱뚝딱'}
        subTitle={'개발하며 만든 것들을 모아 놓은 곳'}
      />
      <p
        className={
          'break-keep text-4xl leading-relaxed tracking-wide md:leading-loose'
        }>
        <span className={'decoration-highlight underline underline-offset-4'}>
          뚝딱뚝딱
        </span>
        {''}
        &nbsp; 현재 준비 중 🫥
      </p>
    </div>
  )
}

export default ProjectPage
