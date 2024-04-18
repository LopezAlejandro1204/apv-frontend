//Esto permite con Routes- agrupar diferentes rutas
//Agrupar una ruta en especifico
import {BrowserRouter, Routes, Route} from 'react-router-dom'
//Layout
import AuthLayout from './layout/AuthLayout'

import RutaAdmin from './layout/RutaAdmin.jsx'
//las paginas
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'

import AdministrarPacientes from './paginas/AdministrarPacientes.jsx'

import CambiarPassword from './paginas/CambiarPassword.jsx'
import EditarPerfil from './paginas/EditarPerfil.jsx'

//Aqui esta el context
import { AuthProvider } from './context/AuthProvider.jsx'
import { PacientesProvider } from './context/PacientesProvider.jsx'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path='/' element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path='registrar' element={<Registrar/>}/>
              <Route path='olvide-password' element={<OlvidePassword/>}/>
              <Route path='olvide-password/:TOKEN' element={<NuevoPassword/>}/>
              <Route path='confirmar/:id' element={<ConfirmarCuenta/>}/>
            </Route>

            <Route path='/admin' element={<RutaAdmin/>}>
                <Route index element={<AdministrarPacientes/>}/>
                <Route path='perfil' element={<EditarPerfil/>}/>
                <Route path='cambiar-password' element={<CambiarPassword/>}/>
            </Route>
            
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
