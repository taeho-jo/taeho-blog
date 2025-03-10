import Copyright from '@/components/Copyright'

const Footer = () => {
  return (
    <footer className="mx-auto flex w-full max-w-screen-sm items-center justify-between px-4 py-10 text-sm md:px-0">
      {/* 왼쪽: 카피라이트 */}
      <div className="whitespace-nowrap text-left">
        <Copyright
          name={'조태호'}
          from={2025}
        />
      </div>

      {/* 오른쪽: 방문 인사 */}
      <div className="text-right">
        <p className="text-muted-foreground">Thanks for visiting 👋</p>
      </div>
    </footer>
  )
}

export default Footer
