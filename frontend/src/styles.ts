import { createGlobalStyle, styled } from 'styled-components'
import { BsTwitterX } from "react-icons/bs";

export const GlobalCss = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;
  }


  body {
    background-color: #000;
  }
`

export const LogoXtwitter = styled(BsTwitterX)`
  font-size: 48px;
`
