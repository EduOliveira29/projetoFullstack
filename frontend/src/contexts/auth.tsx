import { createContext, useContext, useState } from 'react'
import type { Usuarios } from '../service/api'

interface AuthContextData {
  usuarioLogado: Usuarios | null
  setUsuarioLogado: (user: Usuarios | null) => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuarioLogado, setUsuarioLogado] = useState<Usuarios | null>(null)

  return (
   <AuthContext.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }

  return context
}
