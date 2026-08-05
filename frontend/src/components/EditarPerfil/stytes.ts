import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  height: 600px;
  color: #fff;
  background-color: #333333;

  small {
    margin: 0 8px;
    color: red;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  color: #A9A9A9;
  margin: 8px;
  width: 80%;
`

export const BotaoCadastro = styled.button`
  background-color: #fff;
  color: #000;
  line-height: 100%;
  text-align: center;
  font-size: 24px;
  margin: 8px 0;
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
`

export const Input = styled.input`
  background-color: #fff;
  border: 2px solid #fff;
  line-height: 100%;
  font-size: 24px;
  margin: 8px;
  padding: 16px;
  cursor: pointer;
`
