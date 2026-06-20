import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 600px;
  background-color: #000;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  color: #fff;
  margin: 8px;
`

export const Label = styled.label`
  font-size: 16px;
  margin: 8px 0;
`

export const Input = styled.input`
  font-size: 16px;
  margin: 8px 0;
  text-align: center;
  height: 24px;
`

export const BotaoCadastro = styled.button`
    background-color: purple;
    color: #fff;
    line-height: 100%;
    text-align: center;
    font-size: 24px;
    margin: 8px;
    padding: 16px;
    border: none;
    cursor: pointer;
`
