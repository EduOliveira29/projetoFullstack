import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Usuarios } from './service/api'

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
