import React from 'react'
import usePacientes from "../hooks/usePacientes.jsx";
import Paciente from './Paciente.jsx';

const ListadoPacientes = () => {
    const {pacientes} = usePacientes()

    return (
        <>
            {pacientes.length ? 
            (
                <>
                    <h2 className='font-black text-3xl text-center'>Listado de pacientes</h2>
                    <p className='text-xl mt-5 mb-10 text-center'>
                        Administra tus {''}
                        <span className='text-indigo-600 font-bold'>Pacientes</span>
                    </p>

                    {pacientes.map(paciente => (
                        <Paciente 
                            key={paciente._id} //Es necesario el key que en este caso sera el id
                            paciente={paciente}
                        />
                    ))}
                </>
            ) 
            : 
            (
                <>
                    <h2 className='font-black text-3xl text-center'>No hay pacientes</h2>
                    <p className='text-xl mt-5 mb-10 text-center'>
                        Comienza agregando pacientes {''}
                        <span className='text-indigo-600 font-bold'>y apareceran en este lugar</span>
                    </p>
                </>
            )}
        </>
    )
}

export default ListadoPacientes