import React from 'react'
import { createContext, useState, useEffect } from 'react'
import clienteAxios from '../config/axios.jsx'
import useAuth from '../hooks/useAuth.jsx'

const PacientesContext = createContext()

const PacientesProvider = ({children}) => {
    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})

    const {auth} = useAuth();

    useEffect(()=>{
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token){
                    return
                }
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios('/pacientes', config)
                setPacientes(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    }, [auth]) //Esta dependencia es necesaria para que se ejecute cuando exista un cambio

    const guardarPaciente = async (paciente) => {
        //console.log(paciente)
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if(paciente.id){
            //En caso de una edicion
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                console.log(paciente.id)
                const pacienteActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                console.log(paciente)
                console.log(pacienteActualizado)
                setPacientes(pacienteActualizado)
                
            } catch (error) {
                console.log("Hubo un error")
            }

        }else{
            //En caso de un nuevo registro
            try {
                const {data} = await clienteAxios.post('/pacientes', paciente, config );             
                //Crear un nuevo objeto con lo que realmente queremos
                const {createdAt, updateAt, __v, ...pacienteAlmacenado} = data   
                setPacientes([pacienteAlmacenado, ...pacientes]);
                
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }

    }

    const setEdicion =(paciente) => {
        setPaciente(paciente)
    }   

    const eliminarPaciente = async id =>{
        const confirmar = confirm('¿Confirmas que deseas eliminar?')

        if(confirmar){
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)

                const pacientesActualizado = pacientes.filter(pacienteState=> pacienteState._id !== id)

                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
                
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export {
    PacientesProvider
}


export default PacientesContext