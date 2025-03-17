import { NavigateFunction } from "react-router-dom";
import api from "../service/api";
import handleError from "./errorHandler";
import { formatResponse } from "./objectUtils";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export default async function request<T>(
    method: HttpMethod,
    url: string,
    data: Record<string, any> = {},
    navigate?: NavigateFunction
): Promise<{ message: string; status: number; result: T } | never> {
    try {
        const config = method === "get" ? { params: data } : data;
        const response = await api[method](url, config);
        return formatResponse<T>(response.data.message, response.status, response.data.result);
    } catch (error) {
        return handleError(error, navigate);
    }
}
