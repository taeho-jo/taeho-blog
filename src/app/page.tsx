import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      {/*<header className={'w-full max-w-screen-sm border-4 border-amber-500'}>*/}
      {/*  헤더*/}
      {/*</header>*/}
      <main className="p h-dvh w-full max-w-screen-sm px-4 md:px-0">
        <div className={'pt-24 md:pt-40'}>
          <div className={'flex flex-wrap items-center justify-between'}>
            <h1>
              조태호&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;Jotang 🙃
            </h1>
            <Navbar />
          </div>

          {/*<section className={'mb-14 break-keep leading-normal md:text-base/4'}>*/}
          <section
            className={
              'my-8 break-keep leading-relaxed tracking-wide md:leading-loose'
            }>
            <p>
              사람과의 인연을 소중히 여기며, 함께 성장하는{' '}
              <b className={'text-highlight'}>협업</b>을 중요하게 생각합니다.
            </p>
            <p>
              새로운 기술을 빠르게 익히고 응용하는 것을 즐기며,{' '}
              <b className={'text-highlight'}>직관적이고 심플한 것</b>을
              좋아합니다.
            </p>
            <p>공부하면서 경험한 것을 틈틈이 기록하려 합니다.</p>
          </section>

          {/*<section className={'mb-14 border-2 border-amber-50'}>*/}
          {/*  소셜 링크 들??*/}
          {/*</section>*/}

          <section className={''}>
            <div className={'mb-1'}>
              <Link
                href="/blog"
                className={
                  'hover:text-highlight decoration-highlight underline underline-offset-4'
                }>
                깨작깨작
              </Link>
              <span className={'text-xs opacity-65'}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;공부하면서 배운 것들을 남겨두는 곳
              </span>
            </div>
            <div className={'mb-1'}>
              <Link
                href="/projects"
                className={
                  'hover:text-highlight decoration-highlight underline underline-offset-4'
                }>
                뚝딱뚝딱
              </Link>
              <span className={'text-xs opacity-65'}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;개발하며 만든 것들을 모아 놓은 곳
              </span>
            </div>
            <div className={'mb-1'}>
              <Link
                href="/resume"
                className={
                  'hover:text-highlight decoration-highlight underline underline-offset-4'
                }>
                차곡차곡
              </Link>
              <span className={'text-xs opacity-65'}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;경험과 배움을 쌓아온 여정을
                기록하는 곳
              </span>
            </div>
          </section>
        </div>
      </main>
      {/*<footer className={'w-full max-w-screen-sm border-4 border-amber-500'}>*/}
      {/*  푸터*/}
      {/*</footer>*/}
    </div>
  )
}
