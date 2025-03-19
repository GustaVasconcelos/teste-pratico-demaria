import { NavigateFunction } from 'react-router-dom';
import useNotification from './useNotification';

const useErrorHandling = (navigate: NavigateFunction) => {  
    const { showNotification } = useNotification();

    const handleError = (error: any, fallbackMessage = 'Ocorreu um erro') => {
        if (error.status !== 404) {
            const message = error.message || fallbackMessage;
            showNotification('error', message);
        }

        if (error.status === 404) {
            navigate('/login');
        }
    };

    return { handleError };
};

export default useErrorHandling;
