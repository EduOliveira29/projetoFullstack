import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Container,
  Buttons,
  Form,
  BotaoPostar,
  TextArea,
  AreaPost,
  Conteudo,
} from './styles'

const TimeLine = () => {
  const formPostar = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: Yup.object({
      content: Yup.string()
        .min(8, 'O nome deve apresentar pelo menos 8 caracteres')
        .required('O campo é obrigatório'),
    }),
    onSubmit: async (values) => {
      console.log(values)
    },
  })

  const erroformCadastro = (fieldName: string, message?: string) => {
    const estaAlterado = fieldName in formPostar.touched
    const estaInvalido = fieldName in formPostar.errors

    if (estaAlterado && estaInvalido) return message
    return ''
  }

  return (
    <Container>
      <div>
        <Buttons>
          <button>Para Você</button>
          <button>Seguindo</button>
        </Buttons>
      </div>
      <AreaPost>
        <Form>
          <Conteudo>
            <img src="https://placehold.co/50" alt="" />
            <TextArea
              name="post"
              id="post"
              placeholder="O que está pensando?"
            ></TextArea>
            <small>
              {erroformCadastro('content', formPostar.errors.content)}
            </small>
          </Conteudo>
          <div>
            <BotaoPostar type="submit">Postar</BotaoPostar>
          </div>
        </Form>
      </AreaPost>
    </Container>
  )
}
export default TimeLine
