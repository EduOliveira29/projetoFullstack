import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
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

export const Comentar = styled.div`
  margin: 32px 0;
  width: 100%;
  display: grid;
  grid-template-columns: 10%  90%;
  height: 200px;

  img {
    width: 50px;
    border-radius: 50%;
  }
`

export const Textarea = styled.textarea`
  background-color: black;
  font-size: 24px;
  color: white;
`
