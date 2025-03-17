import request from '../utils/request';
import qs from 'qs';
import { NavigateFunction } from 'react-router-dom';

interface RequestData {
    filters?: Record<string, any>;
    page?: number;
    perPage?: number;
}

const baseService = {
    async get(url: string, data: RequestData = {}, navigate?: NavigateFunction) {
        const query = qs.stringify(
            {
                filters: data.filters,
                page: data.page,
                perPage: data.perPage,
            },
            { encode: false }
        );

        return request("get", `${url}${query ? '?' + query : ''}`, {}, navigate);
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
