import { Container, Lista } from './styles'
import Post from '../Post/Post'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'

const ListaPosts = () => {
  const usuario = useSelector((state: RootState) => state.auth.usuario)

  return (
    <Container>
      {usuario?.user.posts.map((post) => (
        <Lista key={post.id}>
          <Post
            id={post.id}
            author_name={post.author_name}
            content={post.content}
            total_likes={post.total_likes}
            status={post.status}
            created_on={post.created_on}
          />
        </Lista>
      ))}
    </Container>
  )
}

export default ListaPosts
