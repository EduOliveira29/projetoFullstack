import {
  Container,
  Form,
  BotaoCadastro,
  Input,
  LinkCadastro,
  LogoXtwitter,
} from './styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCadastrarUsuarioMutation } from '../../service/api'

const Cadastro = () => {
  const [cadastrar, { isLoading }] = useCadastrarUsuarioMutation()
  const formCadastro = useFormik({
    initialValues: {
      full_name: '',
      username: '',
      email: '',
      password: '',
      senhaConfirmacao: '',
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .min(8, 'O nome deve apresentar pelo menos 8 caracteres')
        .required('O campo é obrigatório'),
      email: Yup.string()
        .min(15, 'O campo deve ter no minimo 15 caracteres')
        .max(50, 'O campo deve ter no maximo 50 caracteres')
        .required('O campo é obrigatório'),
      username: Yup.string().min(5, 'o campo deve ter no minimo 5 caracteres'),
      password: Yup.string()
        .min(10, 'O campo deve ter no minimo 10 caracteres')
        .matches(/[a-z]/, 'a senha precisa de pelo 1 caractere minúsculo')
        .matches(/[A-Z]/, 'a senha precisa de pelo 1 caractere Maiúsculo')
        .matches(/[0-9]/, 'a senha precisa de pelo 1 numeral')
        .matches(/[^\w]/, 'a senha precisa de pelo 1 caractere especial')
        .required('O campo é obrigatório'),
      senhaConfirmacao: Yup.string()
        .min(10, 'O campo deve ter no minimo 10 caracteres')
        .required('O campo é obrigatório'),
    }),
    onSubmit: async (values) => {
      // 1. Validação de senhas
      if (values.password !== values.senhaConfirmacao) {
        alert('As senhas não coincidem!')
        return
      }

      try {
        // 2. Limpeza: remove o campo que não deve ir para a API
        // Cria um novo objeto apenas com os campos necessários
        const usuarioParaEnviar = {
          full_name: values.full_name,
          email: values.email,
          password: values.password,
          username: values.username,
          // ... adicione outros campos se necessário
        }

        // 3. Envia apenas o objeto limpo
        await cadastrar(usuarioParaEnviar).unwrap()
        alert('Usuário cadastrado com sucesso!')
      } catch (err) {
        alert('Erro ao cadastrar!')
        console.log('Erro completo:', err)
      }
    },
  })

  const erroformCadastro = (fieldName: string, message?: string) => {
    const estaAlterado = fieldName in formCadastro.touched
    const estaInvalido = fieldName in formCadastro.errors

    if (estaAlterado && estaInvalido) return message
    return ''
  }

  return (
    <Container>
      <LogoXtwitter />
      <Form onSubmit={formCadastro.handleSubmit}>
        <Input
          id="full_name"
          type="text"
          name="full_name"
          value={formCadastro.values.full_name}
          onChange={formCadastro.handleChange}
          onBlur={formCadastro.handleBlur}
          placeholder="FullName"
        />
        <small>
          {erroformCadastro('full_name', formCadastro.errors.full_name)}
        </small>
        <Input
          id="email"
          type="text"
          name="email"
          autoComplete="email"
          value={formCadastro.values.email}
          onChange={formCadastro.handleChange}
          onBlur={formCadastro.handleBlur}
          placeholder="Email"
        />
        <small>{erroformCadastro('email', formCadastro.errors.email)}</small>
        <Input
          id="username"
          type="username"
          name="username"
          value={formCadastro.values.username}
          onChange={formCadastro.handleChange}
          onBlur={formCadastro.handleBlur}
          placeholder="UserName"
        />
        <small>
          {erroformCadastro('username', formCadastro.errors.username)}
        </small>
        <Input
          id="password"
          type="password"
          name="password"
          value={formCadastro.values.password}
          onChange={formCadastro.handleChange}
          onBlur={formCadastro.handleBlur}
          placeholder="Password"
          autoComplete="new-password"
        />
        <small>
          {erroformCadastro('password', formCadastro.errors.password)}
        </small>
        <Input
          id="senhaConfirmacao"
          type="password"
          name="senhaConfirmacao"
          autoComplete="new-password"
          value={formCadastro.values.senhaConfirmacao}
          onChange={formCadastro.handleChange}
          onBlur={formCadastro.handleBlur}
          placeholder="Confirm Password"
        />
        <small>
          {erroformCadastro('password', formCadastro.errors.senhaConfirmacao)}
        </small>
        <BotaoCadastro type="submit" disabled={isLoading}>
          {isLoading ? 'Cadastrando...' : 'Continue'}
        </BotaoCadastro>
      </Form>
      <p>
        Already have an account?{' '}
        <LinkCadastro to={'/Login'}>Log in</LinkCadastro>{' '}
      </p>
    </Container>
  )
}
export default Cadastro
