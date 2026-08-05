import styled from 'styled-components'
import { FaArrowLeft } from 'react-icons/fa'

export const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;

  div {
    margin: 8px 12px;
  }
`

export const ItensTopo = styled.div`
  display: flex;
  align-items: center;
`
export const ProfileImg = styled.img`
  border-radius: 50%;
  margin: 12px;
  width: 100px;
  margin: 8px 0;
`

export const ProfileInfos = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0;

  div {
    display: flex;
    justify-content: space-evenly;
    width: 50%;
  }
`

export const Seta = styled(FaArrowLeft)`
  font-size: 24px;
`

export const ButtonEditar = styled.button`
  background-color: #000;
  color: white;
  border: white solid 1px;
  width: 100px;
  height: 50px;
`

export const Editar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: none;
  align-items: center;
  justify-content: center;
  background-color:  rgba(0, 0, 0, 0.5);

  &.visivel {
    display: flex;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
  }
`

export const ModalContent = styled.div`
  max-width: 960px;
  position: relative;
  z-index: 1;
`
