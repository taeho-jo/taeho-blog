type SectionInfoType = {
  route: string
  title: string
  subTitle: string
}

export const sectionInfo: SectionInfoType[] = [
  {
    route: '/blog',
    title: '깨작깨작',
    subTitle: '공부하면서 배운 것들을 남겨두는 곳'
  },
  {
    route: '/projects',
    title: '뚝딱뚝딱',
    subTitle: '개발하며 만든 것들을 모아 놓은 곳'
  },
  {
    route: '/resume',
    title: '차곡차곡',
    subTitle: '경험과 배움을 쌓아온 여정'
  }
]
