import React from 'react'
import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom' //permite leer algunos parametros de una URl
import Alerta from '../components/Alerta.jsx'
import clienteAxios from '../config/axios.jsx'


const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando,setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  const params = useParams() // es como el req.params pero en React es Params
  const {id} = params

  useEffect (()=>{
    const confirmarCuenta = async () =>{
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirmar/${id}`
        const {data} = await clienteAxios(url)

        setCuentaConfirmada(true)
        setAlerta({
          msg: data.msg
        })
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }

      setCargando(false);
    }
    confirmarCuenta();
  }, [])
  
  return (
    <>
      <div>
          <h1 className='text-indigo-600 font-black text-6xl'>Confirma tu Cuenta y Comienza a Administrar {""} <span className='text-black'>tus Pacientes </span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {!cargando && 
          <Alerta
            alerta={alerta}
          />}

        {cuentaConfirmada && (<Link
              className='block text-center my-5 text-gray-500' 
              to="/registrar">Iniciar Sesion
          </Link>)}
      </div>
    </>
  )
}

export default ConfirmarCuenta