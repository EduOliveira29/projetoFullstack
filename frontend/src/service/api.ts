import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Usuarios = {
  user: {
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
      "id":  number,
      "created_on": string,
      "status": number,
      "total_likes": number,
      "author_name": string,
      "content": string
    },
  ],
  "profile_picture": string,
  "cover_image": string,
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
    postUsuarioLogado: builder.mutation<Usuarios, Pick<Usuarios['user'], "email" | "password">>({
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
