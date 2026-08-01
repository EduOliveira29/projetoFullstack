import { Container, Cabecalho } from './styles'

type Props = {
    id: number
    created_on: string,
    status: number,
    total_likes: number,
    author_name: string,
    content: string
}

const Post = ({author_name, content, created_on, total_likes }: Props) =>  {

  return (
        <Container>
        <Cabecalho>
          <img src="https://placehold.co/20x20" alt="" />
          <p>Profile</p>
          <p>@{author_name}</p>
          <p>{created_on}</p>
        </Cabecalho>
        <div>
          <p>{content}</p>
        </div>
        <div>
          <button>{total_likes}</button>
          <button>Comentar</button>
        </div>
      </Container>
)
}

export default Post
