import Container from './container'
import MyContentsMenu from './my-contents-menu'

const Footer = () => {
  return (
    <footer className="w-screen h-20 md:h-auto pt-4 md:pt-0 fixed md:static bottom-0
      bg-white md:bg-transparent shadow-footer md:shadow-none">
      <div className='md:hidden mb-1'>
        <MyContentsMenu />
      </div>
      <div className="md:py-2 flex items-center justify-center">
        ©️ 2022 T.Kawa
      </div>
      <div></div>
    </footer>
  )
}

export default Footer
