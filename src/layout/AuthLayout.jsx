//Este archivo es como el padre de los layouts para la parte de autenticacion
import React from 'react'
//lo siguiente es para inyectar una parte del layout
import {Outlet} from 'react-router-dom'
export const AuthLayout = () => {
    return (
        <>
            <main className='container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center'>
                <Outlet />
            </main>
        </>
    )
};

export default AuthLayout;
