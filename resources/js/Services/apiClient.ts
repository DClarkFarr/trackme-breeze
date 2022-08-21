import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";

import { merge } from "lodash";

import ApiError from "@/Errors/ApiError";

export const handleAxiosResponse = <T>(res: AxiosResponse<T>): T => {
    return res.data;
};

export const handleAxiosError = (err: AxiosError<any>): never => {
    const message = err.response ? err.response.data?.message : err.message;

    const data = err.response ? err.response.data : {};
    const status = err.response ? err.response.status : 400;

    const error = new ApiError(message, status, data);

    throw error;
};

export const handleAxiosRequest = <T>(
    req: Promise<AxiosResponse<T>>
): Promise<T> => {
    return req
        .then((res: AxiosResponse<T>) => handleAxiosResponse(res))
        .catch(handleAxiosError);
};

export class AxiosHttpClient {
    public instance: AxiosInstance;
    constructor(config: AxiosRequestConfig<any>) {
        this.instance = axios.create(
            merge(
                {
                    baseURL: import.meta.env.VITE_API_URL,
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                    ...config,
                },
                config
            )
        );
    }

    setHeaders(headers = {}, replace = false): void {
        if (replace) {
            this.instance.defaults.headers.common = headers;
        } else {
            this.instance.defaults.headers.common = {
                ...this.instance.defaults.headers.common,
                ...headers,
            };
        }
    }

    handleRequest<R>(requestConfig: AxiosRequestConfig) {
        return handleAxiosRequest<R>(this.instance.request(requestConfig));
    }

    get<R extends object, D extends object | null = null>(
        path: string,
        data?: D,
        config: AxiosRequestConfig = {}
    ): Promise<R> {
        return this.handleRequest<R>({
            method: "get",
            url: path,
            params: data,
            ...config,
        });
    }
    post<R extends object, D extends object | null = null>(
        path: string,
        data?: D,
        config: AxiosRequestConfig = {}
    ): Promise<R> {
        return this.handleRequest<R>({
            method: "post",
            url: path,
            data,
            ...config,
        });
    }
    put<R extends object, D extends object | null = null>(
        path: string,
        data?: D,
        config: AxiosRequestConfig = {}
    ): Promise<R> {
        return this.handleRequest<R>({
            method: "put",
            url: path,
            data,
            ...config,
        });
    }
    patch<R extends object, D extends object | null = null>(
        path: string,
        data?: D,
        config: AxiosRequestConfig = {}
    ): Promise<R> {
        return this.handleRequest<R>({
            method: "patch",
            url: path,
            data,
            ...config,
        });
    }
    delete<R extends object, D extends object | null = null>(
        path: string,
        data?: D,
        config: AxiosRequestConfig = {}
    ): Promise<R> {
        return this.handleRequest<R>({
            method: "delete",
            url: path,
            data,
            ...config,
        });
    }
}

const apiClient = new AxiosHttpClient({});

export default apiClient;
