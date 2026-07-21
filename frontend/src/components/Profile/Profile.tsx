import { Container, Seta, ItensTopo, ProfileImg, ProfileInfos } from './styles'
import { useAuth } from '../../contexts/auth'

const Profile = () =>  {
  const { usuarioLogado } = useAuth();

  if (!usuarioLogado) return null
  return (
  <Container>
    <ItensTopo>
      <Seta />
      <div>
      <h2>{usuarioLogado.username}</h2>
      <p>posts</p>
      </div>
    </ItensTopo>
    <img src="https://placehold.co/200x100" alt="" />
    <ProfileImg src="https://placehold.co/50" alt="" />
    <ProfileInfos>
      <p>{usuarioLogado.full_name}</p>
      <p>{usuarioLogado.create_date}</p>
      <div>
        <p>1 seguindo</p>
        <p>0 seguidores</p>
      </div>
    </ProfileInfos>
  </Container>
)
}
export default Profile
