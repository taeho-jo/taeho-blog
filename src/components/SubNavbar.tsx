'use client'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

const SubNavbar = ({
  title,
  subTitle
}: {
  title: string
  subTitle: string
}) => {
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

      <div className={'mb-24'}>
        <Link
          href={'/'}
          className={
            'hover:text-highlight mr-4 text-xs transition-all duration-300'
          }>
          조각조각
        </Link>

        {title !== '깨작깨작' && (
          <Link
            href={'/blog'}
            className={
              'hover:text-highlight mr-4 text-xs transition-all duration-300'
            }>
            깨작깨작
          </Link>
        )}

        {title !== '뚝딱뚝딱' && (
          <Link
            href={'/projects'}
            className={
              'hover:text-highlight mr-4 text-xs transition-all duration-300'
            }>
            뚝딱뚝딱
          </Link>
        )}

        {title !== '차곡차곡' && (
          <Link
            href={'/resume'}
            className={
              'hover:text-highlight mr-4 text-xs transition-all duration-300'
            }>
            차곡차곡
          </Link>
        )}
      </div>
    </>
  )
}

export default SubNavbar
