import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Usuarios = {
  acess: string,
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
    baseUrl: 'http://localhost:8000/api/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    cadastrarUsuario: builder.mutation<
      Usuarios[],
      Pick<Usuarios['user'], 'full_name' | 'email' | 'password' | 'username'>
    >({
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
        credentials: 'include',
        body: usuarioLogin,
      }),
    }),
    updateUsuarioDados: builder.mutation<
      Usuarios,
      Pick<Usuarios['user'], 'full_name' | 'password' | 'username'>
    >({
      query: (alterarDadosUsuario) => ({
        url: 'users/update_profile/',
        method: 'PATCH',
        body: alterarDadosUsuario,
        credentials: 'include',
      }),
    }),
  }),
})

export const {
  useCadastrarUsuarioMutation,
  useGetUsuariosQuery,
  usePostUsuarioLogadoMutation,
  useUpdateUsuarioDadosMutation,
} = api
