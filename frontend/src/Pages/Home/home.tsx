import { Container } from './styles'
import SideBar from '../../components/Sidebar/Sidebar'
import Profile from '../../components/Profile/Profile'
import ListaPosts from '../../components/ListPosts/ListPosts'

const Home = () => (
  <Container>
    <SideBar />
    <div>
      <Profile />
      <ListaPosts />
    </div>
  </Container>
)

export default Home
