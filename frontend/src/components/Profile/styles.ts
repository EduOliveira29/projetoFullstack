import styled from "styled-components"
import { FaArrowLeft } from "react-icons/fa";

export const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
`

export const ItensTopo = styled.div`
  display: flex;
  align-items: center;

  div {
    margin: 0 12px;
  }
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
