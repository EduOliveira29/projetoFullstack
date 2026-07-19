import { Routes, Route } from 'react-router-dom'

import Cadastro from './components/Cadastro/cadastro'
import Login from './Pages/Login/login'
import Home from './Pages/Home/home'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/Cadastro" element={<Cadastro />} />
    <Route path="/Home" element={<Home />} />
  </Routes>
)

export default Rotas
