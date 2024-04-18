import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

const useAuth = () => {
    return useContext(AuthContext) //use context es para acceder a los valores de un context
}

export default useAuth;