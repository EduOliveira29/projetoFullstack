import { Container, Seta, ItensTopo, ProfileImg, ProfileInfos } from './styles'

const Profile = () => (
  <Container>
    <ItensTopo>
      <Seta />
      <div>
      <h2>username</h2>
      <p>0 posts</p>
      </div>
    </ItensTopo>
    <img src="https://placehold.co/200x100" alt="" />
    <ProfileImg src="https://placehold.co/50" alt="" />
    <ProfileInfos>
      <p>fullName</p>
      <p>username</p>
      <div>
        <p>1 seguindo</p>
        <p>0 seguidores</p>
      </div>
    </ProfileInfos>
  </Container>
)

export default Profile
