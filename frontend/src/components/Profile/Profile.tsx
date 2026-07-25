import { Container, Seta, ItensTopo, ProfileImg, ProfileInfos } from './styles'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store';

const Profile = () => {
  const usuario = useSelector((state: RootState) => state.auth.usuario)
  console.log(usuario)


  JSON.stringify(usuario, null, 2)
  if (!usuario) {
    return <div>Carregando perfil...</div>
  }

  return (
    <Container>
      <ItensTopo>
        <Seta />
        <div>
          <h2>{usuario?.username}</h2>
          <p>posts</p>
        </div>
      </ItensTopo>
      <img src="https://placehold.co/200x100" alt="" />
      <ProfileImg src="https://placehold.co/50" alt="" />
      <ProfileInfos>
        <p>{usuario?.full_name}</p>
        <p></p>
        <div>
          <p>{usuario?.following_count || 0} seguindo</p>
          <p>{usuario?.followers_count || 0} seguidores</p>
        </div>
      </ProfileInfos>
    </Container>
  )
}
export default Profile
