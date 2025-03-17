import { NavigateFunction } from "react-router-dom";

interface ApiError {
    success: false;
    message: string;
    status?: number;
    data?: Record<string, string> | null;
}

const handleError = (error: any, navigate?: NavigateFunction): never => {
    console.log("Erro capturado:", error);

    if (error.response) {
        console.error("Erro da API:", error.response.data);

        const status = error.response.status;

        if (status === 401) {
            localStorage.clear();
            navigate?.("/login", { state: { message: "Usuário não autenticado." } });
            throw { success: false, message: "Usuário não autenticado.", status };
        } else if (status === 403) {
            localStorage.clear();
            navigate?.("/login", { state: { message: error.response.data.message || "Acesso negado." } });
            throw { success: false, message: "Acesso negado.", status };
        } else if (status === 404) {
            navigate?.("/404", { state: { message: "Recurso não encontrado." } });
            throw { success: false, message: "Recurso não encontrado.", status };
        } else if (status === 400) {
            throw {
                success: false,
                message: error.response.data.message,
                status,
                data: error.response.data.errors || null,
            } as ApiError;
        } else if (status === 422) {
            const errorObject = Object.entries(error.response.data.errors).reduce((acc, [key, value]) => {
                acc[key] = (value as string[])[0];
                return acc;
            }, {} as Record<string, string>);

            throw {
                success: false,
                message: "Erro de validação.",
                status,
                data: errorObject || null,
            } as ApiError;
        } else {
            throw {
                success: false,
                message: "Erro ao processar a solicitação.",
                status,
                data: error.response.data.errors || null,
            } as ApiError;
        }
    } else if (error.request) {
        console.error("Sem resposta do servidor:", error.request);
        throw { success: false, message: "Sem resposta do servidor." } as ApiError;
    } else {
        console.error("Erro desconhecido:", error.message);
        throw { success: false, message: "Erro desconhecido." } as ApiError;
    }
};

export default handleError;
