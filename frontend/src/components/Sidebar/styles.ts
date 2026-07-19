import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { BsTwitterX } from "react-icons/bs";
import { CiHome } from 'react-icons/ci'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%
  color: white;
`

export const Items = styled.div`
  align-items: center;
  color: white;
  margin: 0 8px;
  padding: 16px;
`

export const LogoXtwitter = styled(BsTwitterX)`
  font-size: 32px;
  color: white;
`

export const ImgSearch = styled(FaSearch)`
  font-size: 32px;
`

export const ImgProfile = styled(CgProfile)`
  font-size: 32px;
`

export const ImgHome = styled(CiHome)`
  font-size: 32px;
`

export const Links = styled(Link)`
  text-decoration: none;
`
