import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Usuarios = {
  user: {
    id: number
    username: string
    email: string
    full_name: string
    password: string
    followers_count: number
    following_count: number
    profile_picture: string
    cover_image: string
    followers: []
    following: []
    posts: [
      {
        id: number
        created_on: string
        status: number
        total_likes: number
        author_name: string
        content: string
      },
    ]
  }
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/',
  }),
  endpoints: (builder) => ({
    cadastrarUsuario: builder.mutation<Usuarios, Partial<Usuarios>>({
      query: (novoUsuario) => ({
        url: 'users/',
        method: 'POST',
        body: novoUsuario,
      }),
    }),
    getUsuarios: builder.query<Usuarios[], void>({
      query: () => 'users/',
    }),
    postUsuarioLogado: builder.mutation<
      Usuarios,
      Pick<Usuarios['user'], 'email' | 'password'>
    >({
      query: (usuarioLogin) => ({
        url: 'users/login/',
        method: 'POST',
        body: usuarioLogin,
      }),
    }),
    updateUsuarioDados: builder.mutation<Usuarios, Record<string, unknown>>({
      query: (formikValues) => {
        const formData = new FormData()

        Object.entries(formikValues).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value)
          } else if (
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean'
          ) {
            formData.append(key, String(value))
          }
        })

        return {
          url: 'users/update/',
          method: 'PATCH',
          body: formData,
        }
      },
    }),
  }),
})

export const {
  useCadastrarUsuarioMutation,
  useGetUsuariosQuery,
  usePostUsuarioLogadoMutation,
} = api
