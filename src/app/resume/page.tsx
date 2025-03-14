import SubNavbar from '@/components/layout/SubNavbar'
import Timeline from '@/components/resume/Timeline'

const ResumePage = () => {
  return (
    <>
      <SubNavbar
        title={'차곡차곡'}
        subTitle={'경험과 배움을 쌓아온 여정을 기록하는 곳'}
      />

      <Timeline />
    </>
  )
}

export default ResumePage
