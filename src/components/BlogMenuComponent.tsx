import Link from 'next/link'

const BlogIntroComponent = () => {
  return (
    <section className={''}>
      <div className={'mb-3'}>
        <Link
          href="/blog"
          className={
            'underline decoration-highlight underline-offset-4 hover:text-highlight'
          }>
          깨작깨작
        </Link>
        <span className={'text-xs opacity-65'}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;공부하면서 배운 것들을 남겨두는 곳
        </span>
      </div>
      <div className={'mb-3'}>
        <Link
          href="/projects"
          className={
            'underline decoration-highlight underline-offset-4 hover:text-highlight'
          }>
          뚝딱뚝딱
        </Link>
        <span className={'text-xs opacity-65'}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;개발하며 만든 것들을 모아 놓은 곳
        </span>
      </div>
      <div className={'mb-3'}>
        <Link
          href="/resume"
          className={
            'underline decoration-highlight underline-offset-4 hover:text-highlight'
          }>
          차곡차곡
        </Link>
        <span className={'text-xs opacity-65'}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;경험과 배움을 쌓아온 여정을 기록하는 곳
        </span>
      </div>
    </section>
  )
}

export default BlogIntroComponent
