import { Container, Button, Botoes} from './styles'

const Home = () => (
    <Container>
        <p>OLA BEM VINDO A SUA REDE SOCIAL FAVORITA</p>
        <Botoes>
            <Button to="/Cadastro">Fazer Cadastro</Button>
            <Button to="/Login">Fazer Login</Button>
        </Botoes>
    </Container>
)

export default Home
