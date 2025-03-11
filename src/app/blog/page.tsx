import SubNavbar from '@/components/layout/SubNavbar'
import BlogListComponent from '@/components/blog/BlogListComponent'

export default function Page() {
  return (
    <>
      <SubNavbar
        title={'깨작깨작'}
        subTitle={'공부하면서 배운 것들을 남겨두는 곳'}
      />

      <BlogListComponent />
    </>
  )
}
