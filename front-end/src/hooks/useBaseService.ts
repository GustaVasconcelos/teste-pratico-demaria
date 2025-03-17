import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import baseService from '../service/baseService';
import useErrorHandling from './useErrorHandling';
import useNotification from './useNotification';

interface FormErrors {
    [key: string]: string;
}

interface UseBaseServiceReturn {
    get: (url: string, params?: object) => Promise<any>;
    getByColumn: (url: string) => Promise<any>;
    post: (url: string, data: object) => Promise<any>;
    put: (url: string, data: object) => Promise<any>;
    del: (url: string) => Promise<any>;
    formErrors: FormErrors;
    setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}

const useBaseService = (): UseBaseServiceReturn => {
    const navigate = useNavigate();
    const { handleError } = useErrorHandling(navigate);
    const { showNotification } = useNotification();
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const clearFormErrors = useCallback(() => {
        setFormErrors({});
    }, []);

    const handleRequest = useCallback(
        async (
            requestFn: () => Promise<any>,
            successMessage?: string,
            customErrorMessage?: string
        ): Promise<any> => {
            clearFormErrors();
            try {
                const response = await requestFn();
                if (successMessage) {
                    showNotification('success', response.message || successMessage);
                }
                return response;
            } catch (error: any) {
                if (error.status === 422) {
                    setFormErrors(error.data || {});
                    showNotification('warning', 'Verifique os campos destacados.');
                    return;
                }
                console.log(error);
                handleError(error, customErrorMessage);
                throw error;
            }
        },
        [handleError, showNotification, clearFormErrors]
    );

    const get = useCallback(
        async (url: string, params: object = {}) =>
            handleRequest(() => baseService.get(url, params), undefined, 'Erro ao buscar os dados.'), 
        [handleRequest]
    );

    const getByColumn = useCallback(
        async (url: string) =>
            handleRequest(() => baseService.getByColumn(url), undefined, 'Erro ao buscar os dados.'),
        [handleRequest]
    );

    const post = useCallback(
        async (url: string, data: object) =>
            handleRequest(() => baseService.post(url, data), 'Cadastro realizado com sucesso.', 'Erro ao cadastrar.'),
        [handleRequest]
    );

    const put = useCallback(
        async (url: string, data: object) =>
            handleRequest(() => baseService.put(url, data), 'Edição realizada com sucesso.', 'Erro ao editar.'),
        [handleRequest]
    );

    const del = useCallback(
        async (url: string) =>
            handleRequest(() => baseService.delete(url), 'Exclusão realizada com sucesso.', 'Erro ao excluir.'),
        [handleRequest]
    );

    return {
        get,
        getByColumn,
        post,
        put,
        del,
        formErrors,
        setFormErrors
    };
};

export default useBaseService;
