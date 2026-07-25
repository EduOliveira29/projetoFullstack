import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;

  small {
    margin: 0 8px;
    color: red;
  }
`

export const Buttons = styled.div`
  display: flex;

  button {
    background-color: black;
    width: 70%;
    height: 48px;
    color: white;
    font-size: 16px;
    border: white 2px solid;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const BotaoPostar = styled.button`
  background-color: #fff;
  color: #000;
  text-align: center;
  font-size: 24px;
  margin: 8px 0;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
`

export const AreaPost = styled.div`
  margin: 16px 0;

  img {
    margin-top: 8px;
    border-radius: 50%;
  }
`

export const TextArea = styled.textarea`
  color: white;
  background-color: #000;
  resize: none;
  width: 100%;
  height: 120px;
  font-size: 24px;
  margin: 8px auto;
  margin: 8px auto;
`

export const Conteudo = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
`
