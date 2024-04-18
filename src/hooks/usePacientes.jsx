import { useContext } from 'react';
import PacientesContext from '../context/PacientesProvider.jsx';

const usePacientes = () => {
    return useContext(PacientesContext) //use context es para acceder a los valores de un context
}

export default usePacientes;