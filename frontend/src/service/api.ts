import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Usuarios = {
  "id": number,
  "username": string,
  "email": string,
  "full_name": string,
  "password": string,
  "followers_count": number,
  "following_count": number,
  "followers": [],
  "following": [],
  "posts": [
    {
      "created_on": string,
      "status": number,
      "total_likes": number,
      "author_name": string,
      "content": string
    },
  ],
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/',
  }),
  endpoints: (builder) => ({
    // Cadastro: Envia um novo objeto de usuário
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
    postUsuarioLogado: builder.mutation<Usuarios, Partial<Usuarios>>({
      query: (usuarioLogin) => ({
        url: 'users/login/',
        method: 'POST',
        body: usuarioLogin,
      }),
    }),
  }),
})

export const {
  useCadastrarUsuarioMutation,
  useGetUsuariosQuery,
  usePostUsuarioLogadoMutation,
} = api
