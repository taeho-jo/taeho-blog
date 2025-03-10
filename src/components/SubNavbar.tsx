'use client'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { Link as LinkIcon } from 'lucide-react'

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

      <div className={'mb-24 flex items-center justify-start'}>
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

        <div
          className={
            'flex items-center justify-start transition-all duration-300 hover:text-highlight'
          }>
          {title !== '깨작깨작' && (
            <>
              <LinkIcon size={10} />
              <Link
                href={'/blog'}
                className={'mr-4 text-xs'}>
                깨작깨작
              </Link>
            </>
          )}
        </div>

        <div
          className={
            'flex items-center justify-start transition-all duration-300 hover:text-highlight'
          }>
          {title !== '뚝딱뚝딱' && (
            <>
              <LinkIcon size={10} />
              <Link
                href={'/projects'}
                className={'mr-4 text-xs'}>
                뚝딱뚝딱
              </Link>
            </>
          )}
        </div>

        <div
          className={
            'flex items-center justify-start transition-all duration-300 hover:text-highlight'
          }>
          {title !== '차곡차곡' && (
            <>
              <LinkIcon size={10} />
              <Link
                href={'/resume'}
                className={'mr-4 text-xs'}>
                차곡차곡
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default SubNavbar
