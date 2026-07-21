import Rotas from './routes'
import { GlobalCss } from './styles'
import { AuthProvider } from './contexts/auth'

export default function App() {
  return (
    <AuthProvider>
      <GlobalCss />
      <Rotas />
    </AuthProvider>
  )
}
