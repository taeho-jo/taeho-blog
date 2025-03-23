// 'use client'
// import Navbar from '@/components/layout/Navbar'
// import Link from 'next/link'
// import { Link as LinkIcon } from 'lucide-react'
//
// const SubNavbar = ({
//   title = '제목입니다',
//   subTitle = '부제목입니다.'
// }: {
//   title: string
//   subTitle: string
// }) => {
//   return (
//     <>
//       <div
//         className={
//           'mb-4 flex flex-wrap items-center justify-between max-[425px]:block'
//         }>
//         <div className={'max-[425px]: mb-4'}>
//           <h1 className={'mb-2'}>{title}</h1>
//           <h2 className={'text-xs opacity-65'}>{subTitle}</h2>
//         </div>
//         <Navbar />
//       </div>
//
//       <div className={'mb-12 flex items-center justify-start md:mb-24'}>
//         <div
//           className={
//             'flex items-center justify-start transition-all duration-300 hover:text-highlight'
//           }>
//           <LinkIcon size={10} />
//           <Link
//             href={'/'}
//             className={'mr-4 text-xs'}>
//             조각조각
//           </Link>
//         </div>
//
//         <div
//           className={
//             'flex items-center justify-start transition-all duration-300 hover:text-highlight'
//           }>
//           {title !== '깨작깨작' && (
//             <>
//               <LinkIcon size={10} />
//               <Link
//                 href={'/blog'}
//                 className={'mr-4 text-xs'}>
//                 깨작깨작
//               </Link>
//             </>
//           )}
//         </div>
//
//         <div
//           className={
//             'flex items-center justify-start transition-all duration-300 hover:text-highlight'
//           }>
//           {title !== '뚝딱뚝딱' && (
//             <>
//               <LinkIcon size={10} />
//               <Link
//                 href={'/projects'}
//                 className={'mr-4 text-xs'}>
//                 뚝딱뚝딱
//               </Link>
//             </>
//           )}
//         </div>
//
//         <div
//           className={
//             'flex items-center justify-start transition-all duration-300 hover:text-highlight'
//           }>
//           {title !== '차곡차곡' && (
//             <>
//               <LinkIcon size={10} />
//               <Link
//                 href={'/resume'}
//                 className={'mr-4 text-xs'}>
//                 차곡차곡
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }
//
// export default SubNavbar

'use client'

import { usePathname } from 'next/navigation'
import { getProjectBySlug } from '@/utils/getProjectBySlug'
import { ProjectDataType } from '@/types'
import { sectionInfo } from '@/data/sectionInfo'
import Navbar from '@/components/layout/Navbar'
import { LinkIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
  slug?: string
  override?: {
    title?: string
    subTitle?: string
  }
}

export default function SubNavbar({ slug, override }: Props) {
  const pathname: string = usePathname()

  const project: undefined | ProjectDataType | null = slug
    ? getProjectBySlug(slug)
    : null
  const section = sectionInfo.find(s => pathname.startsWith(s.route))

  const title =
    override?.title || project?.title || section?.title || '제목입니다'

  const subTitle =
    override?.subTitle || project?.date || section?.subTitle || '부제목입니다.'

  const filteredSections = sectionInfo.filter(
    section => section.route !== pathname && section.title !== title
  )

  return (
    <>
      <div
        className={
          'mb-4 flex flex-wrap items-center justify-between max-[425px]:block'
        }>
        <div className={'max-[425px]: mb-4'}>
          <h1 className={'mb-2'}>{title}</h1>
          <h2 className={'text-xs opacity-65'}>{subTitle}</h2>
        </div>
        <Navbar />
      </div>

      <div className={'mb-12 flex items-center justify-start md:mb-24'}>
        <div
          className={
            'flex items-center justify-start transition-all duration-300 hover:text-highlight'
          }>
          <LinkIcon size={10} />
          <Link
            href={'/'}
            className={'mr-4 text-xs'}>
            조각조각
          </Link>
        </div>

        {filteredSections.map(section => (
          <div
            key={section.route}
            className="flex items-center justify-start transition-all duration-300 hover:text-highlight">
            <LinkIcon size={10} />
            <Link
              href={section.route}
              className="mr-4 text-xs">
              {section.title}
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
