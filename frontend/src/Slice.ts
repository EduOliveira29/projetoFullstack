import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Usuarios {
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

interface AuthState {
  usuario: Usuarios | null
}

const initialState: AuthState = {
  usuario: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsuarioLogado: (state, action: PayloadAction<Usuarios>) => {
      state.usuario = action.payload
    },
    updateUsuario: (state, action: PayloadAction<Partial<Usuarios>>) => {
      if (state.usuario) {
        state.usuario = { ...state.usuario, ...action.payload }
      }
    },
    logout: (state) => {
      state.usuario = null
    },
  },
})

export const { setUsuarioLogado, updateUsuario, logout } = authSlice.actions
export default authSlice.reducer
