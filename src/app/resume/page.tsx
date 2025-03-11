import SubNavbar from '@/components/SubNavbar'

const ResumePage = () => {
  return (
    <>
      <SubNavbar
        title={'차곡차곡'}
        subTitle={'경험과 배움을 쌓아온 여정을 기록하는 곳'}
      />
      <p
        className={
          'break-keep text-4xl leading-relaxed tracking-wide md:leading-loose'
        }>
        <span className={'underline decoration-highlight underline-offset-4'}>
          차곡차곡
        </span>
        {''}
        &nbsp; 현재 준비 중 🫥
      </p>
    </>
  )
}

export default ResumePage
