import { Container, Form, BotaoCadastro, Label, Input } from './styles'

const Cadastro = () => (
    <Container>
      <Form>
        <Label htmlFor="name">Nome Completo:</Label>
        <Input type="text" placeholder='digite seu nome' id='name'/>
        <Label htmlFor="e-mail">E-mail:</Label>
        <Input type="text" placeholder='digite seu e-mail' id='e-mail'/>
        <Label htmlFor="senha">Senha:</Label>
        <Input type="text" placeholder='digite sua senha' id='senha' />
        <Label htmlFor="senhaConfirmacao">Senha:</Label>
        <Input type="text" placeholder='repita sua senha' id='senhaConfirmacao' />
        <BotaoCadastro type="submit">Criar Cadastro</BotaoCadastro>
      </Form>
    </Container>
)

export default Cadastro
