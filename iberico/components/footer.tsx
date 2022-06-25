import Container from './container'
import MyContentsMenu from './my-contents-menu'

const Footer = () => {
  return (
    <footer className="">
      <Container>
        <div className='md:hidden'>
          <MyContentsMenu />
        </div>
        <div className="py-2 flex items-center justify-center">
          ©️ 2022 T.Kawa
        </div>
      </Container>
    </footer>
  )
}

export default Footer
