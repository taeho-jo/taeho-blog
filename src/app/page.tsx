import TitleComponent from '@/components/home/TitleComponent'
import IntroComponent from '@/components/home/IntroComponent'
import SocialLinkComponent from '@/components/home/SocialLinkComponent'
import MenuComponent from '@/components/home/MenuComponent'

export default function Home() {
  return (
    <div className={''}>
      <TitleComponent />

      <IntroComponent />

      <SocialLinkComponent />

      <MenuComponent />
    </div>
  )
}
