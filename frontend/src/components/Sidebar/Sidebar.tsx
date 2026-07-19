import {
  Container,
  ImgSearch,
  LogoXtwitter,
  ImgProfile,
  ImgHome,
  Links,
  Items,
} from './styles'

const SideBar = () => (
  <Container>
      <LogoXtwitter />
      <Links to={'/'}>
        <Items>
          <ImgHome />
          <h3>Home</h3>
        </Items>
      </Links>
      <Links to={'/'}>
      <Items>
        <ImgSearch />
        <h3>Explorar</h3>
      </Items>
      </Links>
      <Links to={'/Profile'}>
        <Items>
          <ImgProfile />
          <h3>Perfil</h3>
        </Items>
      </Links>
  </Container>
)

export default SideBar
