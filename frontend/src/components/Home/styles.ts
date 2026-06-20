import styled from 'styled-components'
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 600px;
    background-color: #000;

    p {
      color: purple;
      font-size: 32px;
    }
`

export const Botoes = styled.div`
    display: flex;
    justify-content: space-beewen;
`

export const Button = styled(Link)`
    background-color: purple;
    color: #fff;
    line-height: 100%;
    text-align: center;
    font-size: 24px;
    margin: 8px;
    padding: 40px;
    border: none;
    cursor: pointer;
    text-decoration: none;
`
