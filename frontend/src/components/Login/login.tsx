import { Container, Form, BotaoLogin, Label, Input } from './styles'

const login = () => (
    <Container>
      <Form>
        <Label htmlFor="e-mail">E-mail</Label>
        <Input type="text" placeholder='digite seu e-mail' id='e-mail'/>
        <Label htmlFor="senha">Senha</Label>
        <Input type="text" placeholder='digite sua senha' id='senha' />
        <BotaoLogin type="submit">Fazer Login</BotaoLogin>
      </Form>
    </Container>
)

export default login
