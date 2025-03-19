import request from '../utils/request';
import { NavigateFunction } from 'react-router-dom';

interface RequestData {
    filters?: Record<string, any>;
    page?: number;
    perPage?: number;
}

const baseService = {
    async get(url: string, data: RequestData = {}, navigate?: NavigateFunction) {
        const params = new URLSearchParams();
        if (data) {
            for (const [key, value] of Object.entries(data)) {
                if (Array.isArray(value)) {
                    value.forEach(val => params.append(key, val)); 
                } else {
                    params.append(key, value);
                }
            }
        }
        const queryString = params.toString();
        const finalUrl = `${url}${queryString ? '?' + queryString : ''}`;
        return request("get", finalUrl, {}, navigate);
    },

    async getByColumn(url: string, navigate?: NavigateFunction) {
        return request("get", url, {}, navigate);
    },

    async post(url: string, data: Record<string, any>, navigate?: NavigateFunction) {
        return request("post", url, data, navigate);
    },

    async put(url: string, data: Record<string, any>, navigate?: NavigateFunction) {
        return request("put", url, data, navigate);
    },

    async delete(url: string, navigate?: NavigateFunction) {
        return request("delete", url, {}, navigate);
    }
};

export default baseService;
