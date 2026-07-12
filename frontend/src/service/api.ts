import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Usuarios = {
  id: string
  full_name: string
  email: string
  password: string
  create_date: string
  avatar: string
  username: string
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
    // Login: Busca todos os usuários e filtra no front (ou tenta filtrar pela API)
    getUsuarios: builder.query<Usuarios[], void>({
      query: () => 'users/',
    }),
  }),
})

export const { useCadastrarUsuarioMutation, useGetUsuariosQuery } = api
