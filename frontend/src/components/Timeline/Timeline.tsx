import { Container, Comentar, Textarea, Buttons } from './styles'

const TimeLine = () => (
  <Container>
    <div>
    <Buttons>
      <button>Para Você</button>
      <button>Seguindo</button>
    </Buttons>
    </div>
    <div>
    <Comentar>
      <img src="https://placehold.co/44x44" alt="" />
      <Textarea name="comentario" id="comentario" placeholder='o que está pensando?'></Textarea>
    </Comentar>
    </div>

  </Container>
)

export default TimeLine
