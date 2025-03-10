import BlogTitleComponent from '@/components/BlogTitleComponent'
import BlogIntroComponent from '@/components/BlogIntroComponent'
import BlogMenuComponent from '@/components/BlogMenuComponent'
import BlogSocialComponent from '@/components/ui/BlogSocialComponent'

export default function Home() {
  return (
    <div className={'pt-24 md:pt-40'}>
      <BlogTitleComponent />

      <BlogIntroComponent />

      <BlogSocialComponent />

      <BlogMenuComponent />
    </div>
  )
}
