import Link from 'next/link'

const MainMenu = () => {
  return (
    <section className="h-screen w-12 bg-accent-green-4 border-r-2 shadow-xl">
      <Link href="/">
        <a className="text-3xl w-40 py-1 font-thin tracking-wide block text-mono-1
          absolute origin-top-right -rotate-90 -translate-x-full top-1/3">
          Blog Iberico
        </a>
      </Link>
    </section>
  )
}

export default MainMenu
