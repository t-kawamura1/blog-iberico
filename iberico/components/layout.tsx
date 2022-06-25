import Footer from './footer'
import Meta from './meta'
import MyContentsMenu from './my-contents-menu'

type Props = {
  children: React.ReactNode
}

/** 全体のレイアウトを司るコンポーネント */
const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
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
