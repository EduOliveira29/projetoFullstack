import { Container, Seta, ItensTopo, ProfileImg, ProfileInfos } from './styles'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'

const Profile = () => {
  const usuario = useSelector((state: RootState) => state.auth.usuario)


  return (
    <Container>
      <ItensTopo>
        <Seta />
        <div>
          <h2>{usuario?.user.username}</h2>
          <p>{usuario?.user.posts.length} posts</p>
        </div>
      </ItensTopo>
      <img src={usuario?.user.cover_image} alt="" />
      <ProfileImg src={usuario?.user.profile_picture} alt="" />
      <ProfileInfos>
        <p>{usuario?.user.username}</p>
        <p>{usuario?.user.full_name}</p>
        <div>
          <p>{usuario?.user.following.length} seguindo</p>
          <p>{usuario?.user.followers.length} seguidores</p>
        </div>
      </ProfileInfos>
    </Container>
  )
}

export default Profile
