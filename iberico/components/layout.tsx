import Footer from './footer'
import Meta from './meta'

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
      <Footer />
    </>
  )
}

export default Layout
