import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home/home'
import Cadastro from './components/Cadastro/cadastro'
import Login from './components/Login/login'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Cadastro" element={<Cadastro />} />
    <Route path="/Login" element={<Login />} />
  </Routes>
)

export default Rotas
