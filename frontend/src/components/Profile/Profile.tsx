import { useState } from 'react'
import {
  Container,
  Seta,
  ItensTopo,
  ProfileImg,
  ProfileInfos,
  ButtonEditar,
  Editar,
  Modal,
  ModalContent
} from './styles'
import { useSelector } from 'react-redux'
import type { RootState } from '../../Store/store'
import EditarPerfil from '../EditarPerfil/EditarPerfil'

interface ModalState {
  estaVisivel: boolean
}

const Profile = () => {
  const usuario = useSelector((state: RootState) => state.auth.usuario)
  console.log(usuario)
  const [modal, setModal] = useState<ModalState>({
    estaVisivel: false,
  })

  const closeModal = () => {
      setModal({
        estaVisivel: false,
      })
  }

  return (
  <>
    <Container>
      <ItensTopo>
        <Seta />
        <div>
          <h2>{usuario?.user.username}</h2>
          <p>{usuario?.user.posts.length} posts</p>
        </div>
      </ItensTopo>
      <img src={usuario?.user.cover_image} alt="" />
      <Editar>
        <ProfileImg src={usuario?.user.profile_picture} alt="" />
        <ButtonEditar onClick={() => { setModal({ estaVisivel: true, })}}>Editar Perfil</ButtonEditar>
      </Editar>
      <ProfileInfos>
        <p>{usuario?.user.username}</p>
        <p>{usuario?.user.full_name}</p>
        <div>
          <p>{usuario?.user.following.length} seguindo</p>
          <p>{usuario?.user.followers.length} seguidores</p>
        </div>
      </ProfileInfos>
    </Container>
     <Modal className={modal.estaVisivel ? 'visivel' : ''}>
        <ModalContent className="container">
          <EditarPerfil />
        </ModalContent>
        <div onClick={() => { closeModal() }} className="overlay"></div>
      </Modal>
  </>
  )
}

export default Profile
