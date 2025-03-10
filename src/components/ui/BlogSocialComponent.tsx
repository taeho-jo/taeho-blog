import { Github, Instagram, Mail, UserSearch } from 'lucide-react'

import Link from 'next/link'

const BlogSocialComponent = () => {
  return (
    <section className={'flex items-center justify-start pb-8 pt-4'}>
      {/*메일*/}
      <a
        href="mailto:jotang3726@gmail.com"
        className={'mr-2'}>
        <Mail className="h-4 w-4 text-foreground transition-all duration-300 hover:text-highlight dark:text-foreground hover:dark:text-highlight" />
      </a>

      {/*깃헙*/}
      <a
        href={'https://github.com/taeho-jo'}
        className={'mr-2'}>
        <Github className="h-4 w-4 text-foreground transition-all duration-300 hover:text-highlight dark:text-foreground hover:dark:text-highlight" />
      </a>

      {/*인스타그램*/}
      <a
        href={'https://www.instagram.com/joootang/'}
        className={'mr-2'}>
        <Instagram className="h-4 w-4 text-foreground transition-all duration-300 hover:text-highlight dark:text-foreground hover:dark:text-highlight" />
      </a>

      <Link href={'/resume'}>
        <UserSearch className="h-4 w-4 text-foreground transition-all duration-300 hover:text-highlight dark:text-foreground hover:dark:text-highlight" />
      </Link>
    </section>
  )
}

export default BlogSocialComponent
