export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        Main
        <h2 className={'text-5xl'}>가나다라마바사1</h2>
        <h2 className={'text-5xl'}>가나다라마바사2</h2>
        <h2 className={'text-5xl'}>가나다라마바사3</h2>
        <h2 className={'text-5xl'}>가나다라마바사4</h2>
        <h2 className={'text-5xl'}>가나다라마바사5</h2>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        Footer
      </footer>
    </div>
  )
}
