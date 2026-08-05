import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  padding: 4px 8px;
  border: 1px dashed white;
  height: 200px;
  justify-content: space-around;
`

export const Cabecalho = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;

  img {
    width: 40px;
  }
`
