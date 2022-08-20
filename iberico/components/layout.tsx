import {useEffect, useState} from 'react'
import Footer from './footer'
import MainMenu from './main-menu'
import Meta from './meta'
import MyContentsMenu from './my-contents-menu'

type Props = {
  children: React.ReactNode
}

/** 全体のレイアウトを司るコンポーネント */
const Layout = ({children}: Props) => {
  const [isDisplay, setIsDisplay] = useState(false)
  const toggleDisplay = () => {
    window.scrollY > 760
      ? setIsDisplay(true)
      : setIsDisplay(false)
  }
  useEffect(() => {
    window.addEventListener('scroll', toggleDisplay)
    return () => window.removeEventListener('scroll', toggleDisplay)
  }, [])

  return (
    <>
      <Meta />
      <div className="fixed z-30 transition ease-in-out delay-500 hidden md:block">
        <div className={isDisplay ? 'opacity-100' : 'opacity-100'}>
          <MainMenu></MainMenu>
        </div>
      </div>
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <div className="fixed z-20 md:top-1/4 md:right-3">
        <MyContentsMenu />
      </div>
      <Footer />
    </>
  )
}

export default Layout
