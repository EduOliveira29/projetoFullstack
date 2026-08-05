import { useDispatch } from 'react-redux'
import { useUpdateUsuarioDadosMutation } from '../../service/api'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Container, BotaoCadastro, Form, Input } from './stytes'
import { updateUsuario } from '../../Slice'

const EditarPerfil = () => {
  const dispatch = useDispatch()
  const [updateProfile, { isLoading }] = useUpdateUsuarioDadosMutation()

  const formEditarPerfil = useFormik({
    initialValues: {
      full_name: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      full_name: Yup.string().min(8, 'O nome deve apresentar pelo menos 8 caracteres'),
      username: Yup.string()
        .min(5, 'O campo deve ter no minimo 5 caracteres'),
      password: Yup.string()
        .min(10, 'O campo deve ter no minimo 10 caracteres')
        .matches(/[a-z]/, 'a nova senha precisa de pelo 1 caractere minúsculo')
        .matches(/[A-Z]/, 'a nova senha precisa de pelo 1 caractere Maiúsculo')
        .matches(/[0-9]/, 'a nova senha precisa de pelo 1 numeral')
        .matches(/[^\w]/, 'a nova senha precisa de pelo 1 caractere especial'),
    }),
    onSubmit: async (values: {full_name: string, username: string, password: string } ) => {
      try {
        const payload: Record<string, string> = {}
        if (values.full_name.trim() !== '') payload.full_name = values.full_name
        if (values.username.trim() !== '') payload.username = values.username
        if (values.password.trim() !== '') payload.password = values.password

      if (Object.keys(payload).length === 0) {
        console.log("Nenhum campo foi alterado.")
        return
      }

        const updatedData = await updateProfile(payload as Parameters<typeof updateProfile>[0]).unwrap();
        dispatch(updateUsuario(updatedData))
        formEditarPerfil.resetForm()
        } catch (erro) {
          console.error('Erro ao alterar:', erro)
      }
    },
  })

  const erroformEditarPerfil = (fieldName: string, message?: string) => {
    const estaAlterado = fieldName in formEditarPerfil.touched
    const estaInvalido = fieldName in formEditarPerfil.errors

    if (estaAlterado && estaInvalido) return message
    return ''
  }

  return (
    <Container>
      <Form onSubmit={formEditarPerfil.handleSubmit}>
        <Input
          id="full_name"
          type="text"
          name="full_name"
          value={formEditarPerfil.values.full_name}
          onChange={formEditarPerfil.handleChange}
          onBlur={formEditarPerfil.handleBlur}
          placeholder="FullName"
        />
        <small>
          {erroformEditarPerfil('full_name', formEditarPerfil.errors.full_name)}
        </small>
        <Input
          id="username"
          type="text"
          name="username"
          value={formEditarPerfil.values.username}
          onChange={formEditarPerfil.handleChange}
          onBlur={formEditarPerfil.handleBlur}
          placeholder="UserName"
        />
        <small>
          {erroformEditarPerfil('username', formEditarPerfil.errors.username)}
        </small>
        <Input
          id="password"
          type="password"
          name="password"
          value={formEditarPerfil.values.password}
          onChange={formEditarPerfil.handleChange}
          onBlur={formEditarPerfil.handleBlur}
          placeholder="Password"
          autoComplete="new-password"
        />
        <small>
          {erroformEditarPerfil('password', formEditarPerfil.errors.password)}
        </small>
        <BotaoCadastro type="submit" disabled={isLoading}>
          {isLoading ? 'Alterando...' : 'Alterar dados'}</BotaoCadastro>
      </Form>
    </Container>
  )
}

export default EditarPerfil
