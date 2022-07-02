import Link from 'next/link'

const Header = () => {
  return (
    <header className="">
      <Link href="/">
        <a className="flex items-center justify-center text-3xl py-1 w-screen font-thin bg-accent-green-1 text-accent-green-1">
          Blog Iberico
        </a>
      </Link>
    </header>
  )
}

export default Header
