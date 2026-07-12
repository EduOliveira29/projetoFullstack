import {
  Container,
  Form,
  BotaoLogin,
  Input,
  LogoXtwitter,
  LinkCadastro,
} from './styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useGetUsuariosQuery } from '../../service/api'

const Login = () => {
  const { data: usuarios, isLoading } = useGetUsuariosQuery()
  const formLogin = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('O campo é obrigatório'),
      password: Yup.string().required('O campo é obrigatório'),
    }),
    onSubmit: (values: { email: string; password: string }) => {
      console.log("Valores digitados:", values);
      console.log("Lista de usuários:", usuarios);
      handleLogin(values)
  }
  })
  const handleLogin = async (values: { email: string; password: string }) => {
  try {
    const resposta = await fetch('http://localhost:8000/api/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    const dados = await resposta.json();

    if (resposta.ok) {
  console.log('Sucesso:', dados);
} else {
  // Isso vai imprimir no console do navegador exatamente o que o Django recusou
  console.error('Erro de validação:', dados);
  alert('Erro: ' + JSON.stringify(dados));
}
  } catch (erro) {
    console.error('Erro de conexão:', erro);
  }
};

  return (
    <Container>
      <LogoXtwitter />
      <Form onSubmit={formLogin.handleSubmit }>
        <Input
          id="email"
          type="email"
          name="email"
          value={formLogin.values.email}
          onChange={formLogin.handleChange}
          onBlur={formLogin.handleBlur}
          placeholder="Email"
        />
        {formLogin.touched.email && formLogin.errors.email && (
          <span>{formLogin.errors.email}</span>
        )}
        <Input
          id="password"
          type="password"
          name="password"
          value={formLogin.values.password}
          onChange={formLogin.handleChange}
          onBlur={formLogin.handleBlur}
          placeholder="Password"
        />
        {formLogin.touched.password && formLogin.errors.password && (
          <span>{formLogin.errors.password}</span>
        )}
        <BotaoLogin type="submit" disabled={isLoading}>
          {isLoading ? 'Buscando...' : 'Fazer Login'}
        </BotaoLogin>
      </Form>
      <p>
        Don't have an account?
        <LinkCadastro to={'/Cadastro'}>Sign up</LinkCadastro>
      </p>
    </Container>
  )
}

export default Login
